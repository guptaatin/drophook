const fs = require("fs");
const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();
const db = require("../models");
const Image = db.images;

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

// upload profile picture
const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    main(req.file.filename)
    .then(() => console.log('Done'))
    .catch((ex) => console.log(ex.message)); 

    Image.create({
      user_id : req.body.user_id,
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      ),
    }).then((image) => {
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

// get profile image using user id 
const userProfileImage = (req, res) => {
  const id = req.params.id;
  Image.findAll({
    attributes: ['id', 'user_id','name'],
    where: { user_id : id }
  })
    .then(data => {
      //console.log(data)
      res.status(200).send({ 
            id: data[0].id,
            user_id: data[0].user_id,
            name : data[0].name
          });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};


// remove profile picture 
const deleteImage = (req, res) => {
    const id = req.params.id;
    Image.destroy({
      where: { user_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "profile image was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete profile image with id=${id}. Maybe profile image was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete profile image with id=" + id
        });
      });
  };

// update profile image 
  const updateImage = (req, res) => {
    const id = req.params.id;
  Image.findOne({ where: { user_id: id } })
  .then(user_update => {
     if (user_update) {
      user_update.update({
      type: req.file.mimetype,
      name: req.file.originalname,
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


// get all files
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

// display single profile picture
const getParticularImage = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/tmp/";
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
  userProfileImage,
  deleteImage,
  updateImage,
  getListFiles,
  getParticularImage,
};