const fs = require("fs");
const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();
const db = require("../models");
const Image = db.product_images;

// azure blob storage
async function main(fileName) {
  const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error("Azure Storage Connection string not found");
  }
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);
  const blobName = __basedir + "/resources/static/assets/uploads/" + fileName
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.uploadFile(blobName);
  console.log(
     "Blob was uploaded successfully. requestId: ",
   uploadBlobResponse.requestId
  );
  }

// product image upload and saving data to database
const uploadFiles = async (req, res) => {
  console.log(req.files);
  req.files.forEach((v) => {
  try {
    if (v == undefined) {
      return res.send(`You must select a file.`);
    }
    main(v.filename)
    .then(() => console.log('Done'))
    .catch((ex) => console.log(ex.message));  

    Image.create({
      product_id : req.body.product_id,
      image_type : req.body.image_type,
      type: v.mimetype,
      name: v.filename,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + v.filename
      ),
    }).then((image) => {
      console.log('image upload');
      return res.end(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
})
};

// get all product image using product id 
const getProductImage = (req, res) => {
  const id = req.params.id;
  Image.findAll({
    attributes: ['id', 'product_id','name'],
    where: { product_id : id }
  })
    .then(data => {
      console.log(data.length)
      var product_image_object = {};
      for(var i = 0;i<data.length;i++){
        product_image_object[i] = {id:data[i].id,product_id:data[i].product_id,name:data[i].name};
      }
      console.log(product_image_object);
      res.status(200).send({product_image_object});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};


// delete all product images using product id
const deleteImage = (req, res) => {
    const id = req.params.id;
    Image.destroy({
      where: { product_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "image was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete image with id=${id}. Maybe image was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete image with id=" + id
        });
      });
  };

// update product image
  const updateImage = (req, res) => {
    const id = req.params.id;
  Image.findOne({ where: { product_id: id } })
  .then(user_update => {
     if (user_update) {
      user_update.update({
      type: req.file.mimetype,
      name: req.file.filename,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      ),
    }).then((image) => {
      return res.send(`File has been updated.`);
    });
      res.status(202).send({ message: "User updated successfully." });
    }
  })
  .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating the user."
        });
      });
  };

// get all product image files
const baseUrl = process.env.BASE_URL+"files/";
const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};

// get single product image
const getParticularImage = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  const filePath = directoryPath+fileName;
  if (filePath !== undefined) {
 fs.readFile(filePath, function(err, data) {
    // if (err) throw err; // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
      res.end(data); // Send the file data to the browser.
  });
} else {
  res.status(500).send({
    message:
      err.message || "Some error occurred while updating the user."
  });
}
}; 

module.exports = {
  uploadFiles,
  getProductImage,
  deleteImage,
  updateImage,
  getListFiles,
  getParticularImage,
};