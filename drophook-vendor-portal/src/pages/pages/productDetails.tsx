import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from "@mui/material/CircularProgress";
import image2 from "../../components/sidebar/assets/mg-1.jpg";
import image3 from "../../components/sidebar/assets/mg-2.jpg";
import image4 from "../../components/sidebar/assets/mg-3.jpg";
import image5 from "../../components/sidebar/assets/mg-4.jpg";
import image6 from "../../components/sidebar/assets/mg-5.jpg";
import image7 from "../../components/sidebar/assets/white.jpg";
import image8 from "../../components/sidebar/assets/yellow.jpg";
import image9 from "../../components/sidebar/assets/orange.jpg";
import image10 from "../../components/sidebar/assets/light-brown.jpg";
import image11 from "../../components/sidebar/assets/pink.jpg";
import {
  GetProductOptionsService,
  GetProductShippingService,
  GetProductsImageService,
} from "../../services/ProductService";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export const ProductDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState<any>({});
  const [dataOptions, setDataOptions] = useState<any>({});
  const [productFirst, setProductFirst] = useState(true);
  const [productSecond, setProductSecond] = useState(false);
  const [imageSrc, setImageSrc] = useState(image11);
  const [imageText, setImageText] = useState("");
  const [productImage, setProductImage] = useState<any>();
  const [light, setLight] = useState({
    photoIndex: 0,
    isOpen: false,
  });
  useEffect(() => {
    const ProductShipping = async () => {
      const result1 = await GetProductShippingService(id);
      if (result1) {
        setLoader(false);
      }
      if (result1[0]) {
        setData(result1[0]);
      }
    };
    ProductShipping();
    const ProductOptions = async () => {
      const result2 = await GetProductOptionsService(id);
      if (result2[0]) {
        setDataOptions(result2[0]);
      }
    };
    ProductOptions();
    const ProductImages = async () => {
      const result3 = await GetProductsImageService(id);
      if (result3) {
        setProductImage(result3.product_image_object);
      }
    };
    ProductImages();
  }, [id]);

  function objectMap(object: any, mapFn: any) {
    return Object.keys(object).reduce(function (result: any, key: any) {
      result[key] = mapFn(object[key]);
      return result;
    }, {});
  }
  var allImages: any = [];
  if (productImage) {
    var newObject = objectMap(productImage, function (value: any) {
      return allImages.push(
        `https://vp-services-products.azurewebsites.net/files/${value.name}`
      );
    });
  }

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/products");
  };
  const handleProductPreview = () => {
    setImageText("");
    setImageSrc(image11);
    setProductFirst(false);
    setProductSecond(true);
  };
  const handleWhite = () => {
    setImageSrc(image7);
  };
  const handleYellow = () => {
    setImageSrc(image8);
  };
  const handleOrange = () => {
    setImageSrc(image9);
  };
  const handleBrown = () => {
    setImageSrc(image10);
  };
  const handlePink = () => {
    setImageSrc(image11);
  };
  const canvas: any = document.getElementById("myCanvas");
  const ctx = canvas !== null ? canvas.getContext("2d") : "";
  const image: any = document.getElementById("image1");
  if (image !== null) {
    image.addEventListener("load", (e: any) => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "50px Arial";
      ctx.fillText(imageText, canvas.width / 2, canvas.height / 2);
    });
  }
  const handleImageText = (e: any) => {
    setImageText(e.target.value);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "50px Arial";
    ctx.fillText(e.target.value, canvas.width / 2, canvas.height / 2);
  };
  const handleBackSpace = (e: any) => {
    if (e.keyCode === 8) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  const handleProductPreviewBack = () => {
    setImageText("");
    setImageSrc(image11);
    setProductFirst(true);
    setProductSecond(false);
  };
  return (
    <div>
      <Helmet title="Product Details" />
      {productFirst && !productSecond ? (
        <>
          {!loader ? (
            <>
              {data && Object.keys(data).length !== 0 ? (
                <>
                  <Box sx={{ width: "100%" }}>
                    <Grid
                      className="above-box-wrapper product-action-wrap"
                      container
                      sx={{ marginBottom: "10px" }}
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={6} className="back-btn-wrapper">
                        <Item>
                          <Button
                            className="back-btn form-btn"
                            onClick={handleBack}
                          >
                            Back
                          </Button>
                        </Item>
                        {data &&
                          data.custom_product &&
                          data.custom_product === "true" && (
                            <Item>
                              <Link
                                className="btn"
                                onClick={handleProductPreview}
                              >
                                Product Preview
                              </Link>
                            </Item>
                          )}
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Grid
                      className="above-box-wrapper product-action-wrap"
                      container
                      sx={{ marginBottom: "10px" }}
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={6} className="product-img-wrap">
                        {productImage && allImages.length > 0 ? (
                          <>
                            {allImages.map((image: any, index: any) => (
                              <img
                                src={image}
                                onClick={() => {
                                  setLight({ photoIndex: index, isOpen: true });
                                }}
                              />
                            ))}
                          </>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Box>
                  <div>
                    {light.isOpen && (
                      <Lightbox
                        mainSrc={allImages[light.photoIndex]}
                        nextSrc={
                          allImages[(light.photoIndex + 1) % allImages.length]
                        }
                        prevSrc={
                          allImages[
                            (light.photoIndex + allImages.length - 1) %
                              allImages.length
                          ]
                        }
                        onCloseRequest={() =>
                          setLight({ ...light, isOpen: false })
                        }
                        onMovePrevRequest={() =>
                          setLight({
                            ...light,
                            photoIndex:
                              (light.photoIndex + allImages.length - 1) %
                              allImages.length,
                          })
                        }
                        onMoveNextRequest={() =>
                          setLight({
                            ...light,
                            photoIndex:
                              (light.photoIndex + 1) % allImages.length,
                          })
                        }
                      />
                    )}
                  </div>
                  <Box sx={{ width: "100%" }}>
                    <Grid
                      className="below-box-wrapper mb-30 mt-30 users-add box-shadow"
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      {data ? (
                        <>
                          <Grid className="left-item" item xs={3}>
                            <Item>Product Name</Item>
                          </Grid>
                          <Grid className="right-item" item xs={3}>
                            <Item>
                              {data.name !== undefined ? (
                                <>{data.name}</>
                              ) : (
                                "NA"
                              )}
                            </Item>
                          </Grid>
                          <Grid className="left-item" item xs={3}>
                            <Item>SKU</Item>
                          </Grid>
                          <Grid className="right-item" item xs={3}>
                            <Item>
                              {data.sku !== undefined && data.sku !== "" ? (
                                <>{data.sku}</>
                              ) : (
                                "NA"
                              )}
                            </Item>
                          </Grid>
                          <Grid className="left-item" item xs={3}>
                            <Item>Product Description</Item>
                          </Grid>
                          <Grid className="right-item" item xs={3}>
                            <Item>
                              {data.description !== undefined ? (
                                <>{data.description}</>
                              ) : (
                                "NA"
                              )}
                            </Item>
                          </Grid>
                          <Grid className="left-item" item xs={3}>
                            <Item>Map Agreement</Item>
                          </Grid>
                          <Grid className="right-item" item xs={3}>
                            <Item>
                              {data.map_agreement !== undefined ? (
                                <>{data.map_agreement}</>
                              ) : (
                                "NA"
                              )}
                            </Item>
                          </Grid>
                          <Grid className="left-item" item xs={3}>
                            <Item>Lowest Price</Item>
                          </Grid>
                          <Grid className="right-item" item xs={3}>
                            <Item>
                              {data.lowest_price !== undefined ? (
                                <>{data.lowest_price}</>
                              ) : (
                                "NA"
                              )}
                            </Item>
                          </Grid>
                          <Grid className="left-item" item xs={3}>
                            <Item>Price</Item>
                          </Grid>
                          <Grid className="right-item" item xs={3}>
                            <Item>
                              {data.price !== undefined ? (
                                <>{data.price}</>
                              ) : (
                                "NA"
                              )}
                            </Item>
                          </Grid>
                          <Grid className="left-item" item xs={3}>
                            <Item>Compare Price</Item>
                          </Grid>
                          <Grid className="right-item" item xs={3}>
                            <Item>
                              {data.compare_price !== undefined ? (
                                <>{data.compare_price}</>
                              ) : (
                                "NA"
                              )}
                            </Item>
                          </Grid>
                          <Grid className="left-item" item xs={3}>
                            <Item>Tax</Item>
                          </Grid>
                          <Grid className="right-item" item xs={3}>
                            <Item>
                              {data.tax !== undefined ? <>{data.tax}</> : "NA"}
                            </Item>
                          </Grid>
                          <Grid className="left-item" item xs={3}>
                            <Item>Category Name</Item>
                          </Grid>
                          <Grid className="right-item" item xs={3}>
                            <Item>
                              {data.category_name !== null &&
                              data.category_name !== undefined ? (
                                <>{data.category_name}</>
                              ) : (
                                "NA"
                              )}
                            </Item>
                          </Grid>
                          <Grid className="left-item" item xs={3}>
                            <Item>Stock</Item>
                          </Grid>
                          <Grid className="right-item" item xs={3}>
                            <Item>
                              {data.stock !== undefined ? (
                                <>{data.stock}</>
                              ) : (
                                "NA"
                              )}
                            </Item>
                          </Grid>
                          {data.product_shipping !== undefined ? (
                            <>
                              <Grid className="left-item" item xs={3}>
                                <Item>Weight</Item>
                              </Grid>
                              <Grid className="right-item" item xs={3}>
                                <Item>{data.product_shipping.weight}</Item>
                              </Grid>
                              <Grid className="left-item" item xs={3}>
                                <Item>Country</Item>
                              </Grid>
                              <Grid className="right-item" item xs={3}>
                                <Item>{data.product_shipping.country}</Item>
                              </Grid>
                              <Grid className="left-item" item xs={3}>
                                <Item>HS Code</Item>
                              </Grid>
                              <Grid className="right-item" item xs={3}>
                                <Item>{data.product_shipping.hs_code}</Item>
                              </Grid>
                              <Grid className="left-item" item xs={3}>
                                <Item>Country Destination</Item>
                              </Grid>
                              <Grid className="right-item" item xs={3}>
                                <Item>
                                  {data.product_shipping.country_destination}
                                </Item>
                              </Grid>
                              <Grid className="left-item" item xs={3}>
                                <Item>State</Item>
                              </Grid>
                              <Grid className="right-item" item xs={3}>
                                <Item>{data.product_shipping.state}</Item>
                              </Grid>
                              <Grid className="left-item" item xs={3}>
                                <Item>Address Type</Item>
                              </Grid>
                              <Grid className="right-item" item xs={3}>
                                <Item>
                                  {data.product_shipping.address_types}
                                </Item>
                              </Grid>
                              <Grid className="left-item" item xs={3}>
                                <Item>Handling Time</Item>
                              </Grid>
                              <Grid className="right-item" item xs={3}>
                                <Item>
                                  {data.product_shipping.handling_time}
                                </Item>
                              </Grid>
                              <Grid className="left-item" item xs={3}>
                                <Item>Base Rate</Item>
                              </Grid>
                              <Grid className="right-item" item xs={3}>
                                <Item>{data.product_shipping.base_rate}</Item>
                              </Grid>
                              <Grid className="left-item" item xs={3}>
                                <Item>Cart Minimum Price</Item>
                              </Grid>
                              <Grid className="right-item" item xs={3}>
                                <Item>{data.product_shipping.cart_min}</Item>
                              </Grid>
                              <Grid className="left-item" item xs={3}>
                                <Item>Rate Additional Item</Item>
                              </Grid>
                              <Grid className="right-item" item xs={3}>
                                <Item>
                                  {data.product_shipping.rate_additional_item}
                                </Item>
                              </Grid>
                              <Grid className="left-item" item xs={3}>
                                <Item>Estimated Delivery Days</Item>
                              </Grid>
                              <Grid className="right-item" item xs={3}>
                                <Item>
                                  {
                                    data.product_shipping
                                      .estimated_delivery_days
                                  }
                                </Item>
                              </Grid>
                              <Grid className="left-item" item xs={3}>
                                <Item>Offer Expedited Shipping</Item>
                              </Grid>
                              <Grid className="right-item" item xs={3}>
                                <Item>
                                  {
                                    data.product_shipping
                                      .offer_expedited_shipping
                                  }
                                </Item>
                              </Grid>
                              <Grid className="left-item" item xs={3}>
                                <Item>Offer Rush Shipping</Item>
                              </Grid>
                              <Grid className="right-item" item xs={3}>
                                <Item>
                                  {data.product_shipping.offer_rush_shipping}
                                </Item>
                              </Grid>
                            </>
                          ) : null}
                        </>
                      ) : null}
                      {dataOptions.product_option !== undefined ? (
                        <>
                          <Grid className="left-item" item xs={3}>
                            <Item>For What Gender</Item>
                          </Grid>
                          <Grid className="right-item" item xs={3}>
                            <Item>
                              {dataOptions.product_option
                                .what_gender_is_product_for !== "" ? (
                                <>
                                  {
                                    dataOptions.product_option
                                      .what_gender_is_product_for
                                  }
                                </>
                              ) : (
                                "NA"
                              )}
                            </Item>
                          </Grid>
                          <Grid className="left-item" item xs={3}>
                            <Item>Condition</Item>
                          </Grid>
                          <Grid className="right-item" item xs={3}>
                            <Item>
                              {dataOptions.product_option.condition !== "" ? (
                                <>{dataOptions.product_option.condition}</>
                              ) : (
                                "NA"
                              )}
                            </Item>
                          </Grid>
                          <Grid className="left-item" item xs={3}>
                            <Item>Size</Item>
                          </Grid>
                          <Grid className="right-item" item xs={3}>
                            <Item>
                              {dataOptions.product_option.product_option1}
                            </Item>
                          </Grid>
                          <Grid className="left-item" item xs={3}>
                            <Item>Color</Item>
                          </Grid>
                          <Grid className="right-item" item xs={3}>
                            <Item>
                              {dataOptions.product_option.product_option2}
                            </Item>
                          </Grid>
                          <Grid className="left-item" item xs={3}>
                            <Item>Material</Item>
                          </Grid>
                          <Grid className="right-item" item xs={3}>
                            <Item>
                              {dataOptions.product_option.product_option3}
                            </Item>
                          </Grid>
                        </>
                      ) : null}
                    </Grid>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ width: "100%" }}>
                    <Grid
                      className="above-box-wrapper product-action-wrap"
                      container
                      sx={{ marginBottom: "10px" }}
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={6} className="back-btn-wrapper">
                        <Item>
                          <Button
                            className="back-btn form-btn"
                            onClick={handleBack}
                          >
                            Back
                          </Button>
                        </Item>
                      </Grid>
                    </Grid>
                  </Box>
                  <p className="details-loader no-details">
                    No Details Found for this Product...
                  </p>
                </>
              )}
            </>
          ) : (
            <CircularProgress color="error" className="details-loader" />
          )}
        </>
      ) : (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid item xs={6} className="back-btn-wrapper">
                <Item>
                  <Button
                    className="back-btn form-btn"
                    onClick={handleProductPreviewBack}
                  >
                    Back
                  </Button>
                </Item>
              </Grid>
              <Item className="no-bg">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Item className="pd-30 ">
                      <Grid container spacing={2}>
                        <Grid item xs={6} className="dflex posrel prdct-canvas">
                          <img
                            id="image1"
                            src={imageSrc}
                            className="product-img"
                            alt="imagesrc"
                          />
                          <canvas id="myCanvas" width="410" height="433">
                            Your browser does not support the HTML5 canvas tag.
                          </canvas>
                        </Grid>
                        <Grid item xs={6}>
                          <Item className="prodtct-info-wrap text-left">
                            <InputLabel>Color</InputLabel>
                            <Item className="swatch-wrap">
                              <ul className="swatch color-swatch text-left">
                                <li
                                  className="white"
                                  onClick={handleWhite}
                                ></li>
                                <li
                                  className="yellow"
                                  onClick={handleYellow}
                                ></li>
                                <li
                                  className="orange"
                                  onClick={handleOrange}
                                ></li>
                                <li
                                  className="light-brown"
                                  onClick={handleBrown}
                                ></li>
                                <li
                                  className="pink active-swatch"
                                  onClick={handlePink}
                                ></li>
                              </ul>
                            </Item>
                            <InputLabel className="mt-10">
                              Monogram Style
                            </InputLabel>
                            <Item className="swatch-wrap text-left">
                              <ul className="swatch monogram">
                                <li className="">
                                  <img src={image2} alt="image2" />
                                </li>
                                <li className="">
                                  <img src={image3} alt="image3" />
                                </li>
                                <li className="">
                                  <img src={image4} alt="image4" />
                                </li>
                                <li className="">
                                  <img src={image5} alt="image5" />
                                </li>
                                <li className=" active-swatch">
                                  <img src={image6} alt="image6" />
                                </li>
                              </ul>
                            </Item>
                            <InputLabel className="mt-10">
                              Traditional Circle
                            </InputLabel>
                            <Item className="text-left">
                              <input
                                className="width100"
                                value={imageText}
                                onChange={handleImageText}
                                onKeyDown={handleBackSpace}
                                maxLength={data.letters_to_be_entered}
                              />
                              <p className="text-right mt-5">
                                {data.letters_to_be_entered - imageText.length}
                                &nbsp;Charecters left
                              </p>
                            </Item>
                          </Item>
                          <Item className="product-info-btn text-left">
                            <Button
                              variant="outlined"
                              className="blue-btn btn uppercase mt-15"
                            >
                              Add to Cart
                            </Button>
                          </Item>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};
