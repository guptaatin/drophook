import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Box,
  TextField,
  Typography,
  Link,
  FormControlLabel,
  RadioGroup,
  Button,
  Checkbox,
  Alert,
  Dialog,
  Slide,
  Popover,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { withStyles } from "@mui/styles";
import Radio from "@mui/material/Radio";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./products.css";
import Dropzone from "react-dropzone";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { GetAllCountriesService } from "../../services/CountryService";
import {
  GetProductCategoryService,
  ProductsDataService,
  ProductsImageService,
  ProductsOptionsService,
  ProductsShippingService,
  UpdateProductsByIdService,
  ProductsVariantsService,
  GetProductTypeService,
  GetProductThemeService,
  AddProductThemeService,
  AddProductTypeService,
  AddProductCategoryService
} from "../../services/ProductService";
import { InsertEmoticonRounded } from "@mui/icons-material";
import image1 from "../../components/sidebar/assets/prdct-img.jpg";
import image2 from "../../components/sidebar/assets/select-crop-area.svg";
import image3 from "../../components/sidebar/assets/copy-icon.svg";
import image4 from "../../components/sidebar/assets/cross-icon.svg";
import image5 from "../../components/sidebar/assets/Group 1674.png";
import image6 from "../../components/sidebar/assets/image.png";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { backgroundImages } from "polished";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "left",
}));
const styles = {};

var getIndex:any;
var getEntry:any;
function ProductsAdd(props: any) {
  const [countries, setCountries] = React.useState([]);
  const [printOnDemand, setPrintOnDemand] = React.useState(false);
  const [customProduct, setCustomProduct] = React.useState(false);
  const [customProductCount, setCustomProductCount] = React.useState<any>();
  const [firstStep, setFirstStep] = useState(true);
  const [secondStep, setSecondStep] = useState(false);
  const [thirdStep, setThirdStep] = useState(false);
  const [firstStepClass, setFirstStepClass] = useState("steps-num done");
  const [secondStepClass, setSecondStepClass] = useState("steps-num");
  const [thirdStepClass, setThirdStepClass] = useState("steps-num");
  const userId = localStorage.getItem("userid");
  const [productId, setProductId] = useState();
  const [theArray, setTheArray] = useState<any>([]);
  const [selectBox, setSelectBox] = useState<any>([]);
  const [selectedImages, setSelectedImages] = useState<any>([]);
  const [productImage, setProductImage] = useState<any>([]);
  const [dropzoneClassWrap, setDropzoneClassWrap] = useState("dropzone-wrap");
  const [dropzoneClassWbg, setDropzoneClassWbg] = useState("dropzone dropzone-wbg");
  const [dropzoneClassSize, setDropzoneClassSize] = useState("dropzone dropzone-size");
  const [dropzoneClassLifestyle, setDropzoneClassLifestyle] = useState("dropzone dropzone-lifestyle");
  const [dropzoneClassOtherImage, setDropzoneClassOtherImage] = useState("dropzone dropzone-otherimage");
  const [dropzoneClassOne, setDropzoneClassOne] = useState("dropzone");
  const [dropzoneClassTwo, setDropzoneClassTwo] = useState("dropzone");
  const [dropzoneClassThree, setDropzoneClassThree] = useState("dropzone");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [imageWbg, setImageWbg] = useState<any>()
  const [imageWbgFile, setImageWbgFile] = useState<any>()
  const [imageSize, setImageSize] = useState<any>()
  const [imageSizeFile, setImageSizeFile] = useState<any>()
  const [imageLifestyle, setImageLifestyle] = useState<any>()
  const [imageLifestyleFile, setImageLifestyleFile] = useState<any>()
  const [imageOne, setImageOne] = useState<any>()
  const [imageOneFile, setImageOneFile] = useState<any>()
  const [imageTwo, setImageTwo] = useState<any>()
  const [imageTwoFile, setImageTwoFile] = useState<any>()
  const [imageThree, setImageThree] = useState<any>()
  const [imageThreeFile, setImageThreeFile] = useState<any>()
  const [productAllImages, setProductAllImages] = useState<any>([])
  const [openClick, setOpenClick] = React.useState(false);
  const [otherImage, setOtherImage] = useState<any>();
  const [otherAllImages, setOtherAllImages] = useState<any>([]);
  const handleClickOpen = (image:any) => {
    setOtherImage(image)
    setOpenClick(true);
  };
  const handleClickClose = () => {
    setOpenClick(false);
  };
  const handleDropOtherImages = (e: any) => {
    const selectedFiles = e;
    const selectedFileArray = Array.from(selectedFiles);
    setOtherAllImages(selectedFileArray)
    const imagesArray = selectedFileArray.map((file: any) => {
      return { productName: file.name, productFile: URL.createObjectURL(file) };
    });
    setSelectedImages((previousImage: any) =>
      previousImage.concat(imagesArray)
    );
    const imagesArrayName = selectedFileArray.map((file: any) => {
      return file.name;
    });
    setProductImage((previousImage: any) =>
      previousImage.concat(imagesArrayName)
    );
  };
  const [singleVariant, setSingleVariant] = useState({
    variant_name: "",
    material: "",
    sku: "",
    barcode: "",
    size_length: "",
    size_width: "",
    size_height: "",
    weight: "",
    weight_unit: "",
    wholesale_price: "",
    suggested_wholesale: "",
    cpi: "",
    quantity: "",
    customizer_image: false
  })
  const [customPhoto, setCustomPhoto] = useState({
    bg_image: "",
    label: "",
    default_image: "",
    aspect_ratio: "",
    min_upload_width: "",
    min_upload_height: "",
    min_resolution: "",
    image_filters: "",
    preview_type: "",
    instruction: "",
    preview_btn: ""
  })
  const [singleText, setSingleText] = useState({
    bg_text: "",
    label: "",
    font: "",
    allow_customer_font: "",
    default_text: "",
    font_size: "",
    allow_customer_font_size: "",
    font_color: "",
    allow_customer_font_color: "",
    font_case: "",
    text_alingment: "",
    text_rotation: "",
    text_shape: "",
    text_effect: "",
    effect_details: "",
    character_type: ""
  })
  const [selectedBgImages, setSelectedBgImages] = useState<any>([]);
  const [selectedDefaultImages, setSelectedDefaultImages] = useState<any>([]);
  const [customPhtSelect, setCustomPhtSelect] = useState("custom-pht-select");
  const handleDropBackgroundImages = (e: any) => {
    const selectedFiles = e;
    const selectedFileArray = Array.from(selectedFiles);
    const imagesArray = selectedFileArray.map((file: any) => {
      return { bgName: file.name, bgFile: URL.createObjectURL(file) };
    });
    setSelectedBgImages((previousImage: any) =>
      previousImage.concat(imagesArray)
    );
  };
  const handleDropDefaultImages = (e: any) => {
    const selectedFiles = e;
    const selectedFileArray = Array.from(selectedFiles);
    const imagesArray = selectedFileArray.map((file: any) => {
      return { bgName: file.name, bgFile: URL.createObjectURL(file) };
    });
    setSelectedDefaultImages((previousImage: any) =>
      previousImage.concat(imagesArray)
    );
  };
  const handleDropWbg = (e:any) => {
    setImageWbgFile(e[0])
    if (!imageWbg) {
    productAllImages.push(e[0])
    } else {
      productAllImages.forEach(function(item:any, i:any) { if (item == imageWbgFile) productAllImages[i] = e[0]; });
    }
    setImageWbg(URL.createObjectURL(e[0]))
    setDropzoneClassWbg(dropzoneClassWbg + " " + "dropNewClass")
  };
  const handleRemoveWbg = () => {
    setImageWbg(!imageWbg)
    setDropzoneClassWbg("dropzone dropzone-wbg")
  }
  const handleDropSize = (e:any) => {
    setImageSizeFile(e[0])
    if (!imageSize) {
    productAllImages.push(e[0])
    } else {
      productAllImages.forEach(function(item:any, i:any) { if (item == imageSizeFile) productAllImages[i] = e[0]; });
    }
    setImageSize(URL.createObjectURL(e[0]))
    setDropzoneClassSize(dropzoneClassSize + " " + "dropNewClass")
  };
  const handleRemoveSize = () => {
    setImageSize(!imageSize)
    setDropzoneClassSize("dropzone dropzone-size")
  }
  const handleDropLifestyle = (e:any) => {
    setImageLifestyleFile(e[0])
    if (!imageLifestyle) {
    productAllImages.push(e[0])
    } else {
      productAllImages.forEach(function(item:any, i:any) { if (item == imageLifestyleFile) productAllImages[i] = e[0]; });
    }
    setImageLifestyle(URL.createObjectURL(e[0]))
    setDropzoneClassLifestyle(dropzoneClassLifestyle + " " + "dropNewClass")
  };
  const handleRemoveLifestyle = () => {
    setImageLifestyle(!imageLifestyle)
    setDropzoneClassLifestyle("dropzone dropzone-lifestyle")
  }
  const handleDropOne = (e:any) => {
    setImageOneFile(e[0])
    if (!imageOne) {
    productAllImages.push(e[0])
    } else {
      productAllImages.forEach(function(item:any, i:any) { if (item == imageOneFile) productAllImages[i] = e[0]; });
    }
    setImageOne(URL.createObjectURL(e[0]))
    setDropzoneClassOne(dropzoneClassOne + " " + "dropNewClass")
  };
  const handleDropTwo = (e:any) => {
    setImageTwoFile(e[0])
    if (!imageTwo) {
    productAllImages.push(e[0])
    } else {
      productAllImages.forEach(function(item:any, i:any) { if (item == imageTwoFile) productAllImages[i] = e[0]; });
    }
    setImageTwo(URL.createObjectURL(e[0]))
    setDropzoneClassTwo(dropzoneClassTwo + " " + "dropNewClass")
  };
  const handleDropThree = (e:any) => {
    setImageThreeFile(e[0])
    if (!imageThree) {
    productAllImages.push(e[0])
    } else {
      productAllImages.forEach(function(item:any, i:any) { if (item == imageThreeFile) productAllImages[i] = e[0]; });
    }
    setImageThree(URL.createObjectURL(e[0]))
    setDropzoneClassThree(dropzoneClassThree + " " + "dropNewClass")
  };
  const handleSingleSaveCustomizer = () => {
    setSingleVariant({...singleVariant, customizer_image: true})
  }
  const handleDuplicateVariant = (e:any, i:any) => {
    setTheArray([...theArray, theArray.length + 1]);
    setSelectBox([...selectBox, selectBox[i]]);
  }
  const handleSaveVariant = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["duplicate_variant"] = true;
    setSelectBox(newArr);
    selectBox[index]["duplicate_variant"] = true;
  }
  console.log("all values--->", selectBox)
  const handleAddVariant = () => {
    let emptyData: any = {};
    emptyData["name"] = "";
    emptyData["material"] = "";
    emptyData["sku"] = "";
    emptyData["barcode"] = "";
    emptyData["size_length"] = "";
    emptyData["size_width"] = "";
    emptyData["size_height"] = "";
    emptyData["weight"] = "";
    emptyData["weight_unit"] = "";
    emptyData["wholesale_price"] = "";
    emptyData["suggested_wholesale"] = "";
    emptyData["cpi"] = "";
    emptyData["quantity"] = "";
    emptyData["image"] = "";
    emptyData["bg_image"] = "";
    emptyData["bg_selected_images"] = [];
    emptyData["label"] = "";
    emptyData["label_preview"] = "";
    emptyData["default_image"] = "";
    emptyData["bg_default_images"] = [];
    emptyData["aspect_ratio"] = "";
    emptyData["min_upload_width"] = "";
    emptyData["min_upload_height"] = "";
    emptyData["min_resolution"] = "";
    emptyData["image_filters"] = "";
    emptyData["preview_type"] = "";
    emptyData["instruction"] = "";
    emptyData["suggested_wholesale"] = "";
    emptyData["preview_btn_txt"] = "";
    emptyData["preview_image"] = "";
    emptyData["duplicate_variant"] = false;
    emptyData["customize_image"] = false;
    emptyData["image_src"] = image2;
    emptyData["image_bg_src"] = image5;
    emptyData["image_src_done"] = "";
    emptyData["image_bg_src_done"] = "";
    emptyData["label_preview_done"] = "";
    setTheArray([...theArray, theArray.length + 1]);
    setSelectBox([...selectBox, emptyData]);
  };
  const handlerVariantName = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["name"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["name"] = event.target.value;
  };
  const handlerVariantMaterial = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["material"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["material"] = event.target.value;
  };
  const handlerVariantSku = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["sku"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["sku"] = event.target.value;
  };
  const handlerVariantBarcode = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["barcode"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["barcode"] = event.target.value;
  };
  const handlerVariantSizeLength = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["size_length"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["size_length"] = event.target.value;
  };
  const handlerVariantSizeWidth = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["size_width"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["size_width"] = event.target.value;
  };
  const handlerVariantSizeHeight = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["size_height"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["size_height"] = event.target.value;
  };
  const handlerVariantWeight = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["weight"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["weight"] = event.target.value;
  };
  const handlerVariantWeightUnit = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["weight_unit"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["weight_unit"] = event.target.value;
  };
  const handlerVariantWholesalePrice = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["wholesale_price"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["wholesale_price"] = event.target.value;
  };
  const handlerVariantSuggestedPrice = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["suggested_wholesale"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["suggested_wholesale"] = event.target.value;
  };
  const handlerVariantCpi = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["cpi"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["cpi"] = event.target.value;
  };
  const handlerVariantQuantity = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["quantity"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["quantity"] = event.target.value;
  };
  const handlerLabel = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["label"] = event.target.value;
    selectBox[index]["label_preview"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["label"] = event.target.value;
    selectBox[index]["label_preview"] = event.target.value;
  };
  const handlerAspectRatio = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["aspect_ratio"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["aspect_ratio"] = event.target.value;
  };
  const handlerMinUploadWidth = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["min_upload_width"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["min_upload_width"] = event.target.value;
  };
  const handlerMinUploadHeight = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["min_upload_height"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["min_upload_height"] = event.target.value;
  };
  const handlerInstruction = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["instruction"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["instruction"] = event.target.value;
  };
  const handlerPreviewBtnTxt = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["preview_btn_txt"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["preview_btn_txt"] = event.target.value;
  };
  const handlerBgImage = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["bg_image"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["bg_image"] = event.target.value;
  };
  const handlerDefaultImage = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["default_image"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["default_image"] = event.target.value;
  };
  const handlerMinResolution = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["min_resolution"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["min_resolution"] = event.target.value;
  };
  const handlerImageFilters = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["image_filters"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["image_filters"] = event.target.value;
  };
  const handlerPreviewType = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["preview_type"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["preview_type"] = event.target.value;
  };

  const [indexState, setIndexState] = useState(0)
  const [entryState, setEntryState] = useState(1)
  const handleMultipleDropBackgroundImages = (index: any, e: any, event: any) => {
    const selectedFiles = event;
    const selectedFileArray = Array.from(selectedFiles);
    const imagesArray = selectedFileArray.map((file: any) => {
      return { bgName: file.name, bgFile: URL.createObjectURL(file) };
    });
    let newArr = [...selectBox];
    selectBox[index]["bg_selected_images"] = imagesArray;
    setSelectBox(newArr);
    selectBox[index]["bg_selected_images"] = imagesArray;
  };
  const handleMultipleDropDefaultImages = (index: any, e: any, event: any) => {
    const selectedFiles = event;
    const selectedFileArray = Array.from(selectedFiles);
    const imagesArray = selectedFileArray.map((file: any) => {
      return { bgName: file.name, bgFile: URL.createObjectURL(file) };
    });
    let newArr = [...selectBox];
    selectBox[index]["bg_default_images"] = imagesArray;
    setSelectBox(newArr);
    selectBox[index]["bg_default_images"] = imagesArray;
  };
  const [expanded, setExpanded] = React.useState<any | false>(0);
  const handleAccordionExpand =
    (panel: any) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const handleClickAccordion = (e:any, i:any) => {
    setIndexState(i);
    setEntryState(e);
  }
  const handleSaveCustomizer = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["customize_image"] = true;
    selectBox[index]["image_src_done"] = selectBox[index][`image_src`];
    selectBox[index]["image_bg_src_done"] = selectBox[index][`image_bg_src`];
    selectBox[index]["label_preview_done"] = selectBox[index][`label_preview`];
    setSelectBox(newArr);
    selectBox[index]["customize_image"] = true;
    selectBox[index]["image_src_done"] = selectBox[index][`image_src`];
    selectBox[index]["image_bg_src_done"] = selectBox[index][`image_bg_src`];
    selectBox[index]["label_preview_done"] = selectBox[index][`label_preview`];
  }
  useEffect(()=>{
    if (getIndex !== undefined && getEntry !== undefined) {
      setIndexState(getIndex);
      setEntryState(getEntry);
    }
  },[theArray])
  console.log("the array----->", indexState, entryState)

  const handlerTableSize = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["size"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["size"] = event.target.value;
  };
  const handlerTableColor = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["color"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["color"] = event.target.value;
  };
  const handlerTableMaterial = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["material"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["material"] = event.target.value;
  };
  const handlerTablePrice = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["price"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["price"] = event.target.value;
  };
  const handlerTableWholesalePrice = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["wholesale_price"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["wholesale_price"] = event.target.value;
  };
  const handlerTableSuggestedPrice = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["suggested_wholesale"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["suggested_wholesale"] = event.target.value;
  };
  const handlerTableQuantity = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["quantity"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["quantity"] = event.target.value;
  };
  const handlerTableSku = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["sku"] = event.target.value;
    setSelectBox(newArr);
    selectBox[index]["sku"] = event.target.value;
  };
  const handlerTableImage = (index: any, e: any, event: any) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    let newArr = [...selectBox];
    reader.onloadend = function (e) {
      selectBox[index]["image"] = file.name;
      setSelectBox(newArr);
      selectBox[index]["image"] = file.name;
      // setSelectBox();
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handlerTableImageRemove = (index: any, e: any, event: any) => {
    let newArr = [...selectBox];
    selectBox[index]["image"] = "";
    setSelectBox(newArr);
    selectBox[index]["image"] = "";
  };
  const handleUploadClickFirst = (event: any) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function (e) {
      setProductImageFirst({
        name: file.name,
        selectedFile: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveClickFirst = (event: any) => {
    setProductImageFirst({
      name: "",
      selectedFile: null,
    });
  };
  const addEntryClick = () => {
    let emptyData: any = {};
    emptyData["size"] = "small";
    emptyData["color"] = "red";
    emptyData["material"] = "steel";
    emptyData["price"] = "";
    emptyData["wholesale_price"] = "";
    emptyData["suggested_wholesale"] = "";
    emptyData["quantity"] = "";
    emptyData["sku"] = "";
    emptyData["image"] = "";
    setTheArray([...theArray, theArray.length + 1]);
    setSelectBox([...selectBox, emptyData]);
  };
  const [productImageFirst, setProductImageFirst] = useState<any>({
    name: "",
    selectedFile: null,
  });
  const [openCountry, setOpenCountry] = React.useState(false);
  const [states, setStates] = useState([]);
  const [openState, setOpenState] = React.useState(false);
  const [firstStepData, setFirstStepData] = useState<any>({
    name: "",
    sku: "",
    description: "",
    identifier: "",
    map_agreement: "",
    map_agreement_yes: "",
    multiple_variants: "",
    theme_name: "",
    category_name: "",
    type_name: "",
    internal_tags: "",
    video: "",
    video_url: "",
    lowest_price: "",
    price: "",
    compare_price: "",
    tax: "",
    stock: "",
    units: "",
  });
  const [secondStepData, setSecondStepData] = useState({
    units: "",
    weight: "",
    hs_code: "",
    base_rate: "",
    cart_min: "",
    rate_additional_item: "",
    estimated_delivery_days: "",
    offer_expedited_shipping: false,
    offer_rush_shipping: false,
    countryOrigin: "",
    editDestination: "",
    states: "",
    addressType: "residential",
    handlingTime: "weeks",
    standard_shipping: false,
  });
  const [thirdStepData, setThirdStepData] = useState({
    checkedVariant: false,
    size: "",
    color: "",
    material: "",
    gender: "",
    condition: "",
    price: "",
    wholesale_price: "",
    suggested_price: "",
    quantity: "",
    sku: "",
    image: "",
  });
  const [dropComplete, setDropComplete] = useState(false);
  const [dropCompleteType, setDropCompleteType] = useState(false);
  const [dropCompleteTheme, setDropCompleteTheme] = useState(false);
  const wrapperRef = useRef<any>(null);
  const wrapperRefType = useRef<any>(null);
  const wrapperRefTheme = useRef<any>(null);
  const navigate = useNavigate();
  function handleClickOutside(event: any) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setDropComplete(false);
    }
  }
  function handleClickOutsideType(event: any) {
    if (wrapperRefType.current && !wrapperRefType.current.contains(event.target)) {
      setDropCompleteType(false);
    }
  }
  function handleClickOutsideTheme(event: any) {
    if (wrapperRefTheme.current && !wrapperRefTheme.current.contains(event.target)) {
      setDropCompleteTheme(false);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    document.addEventListener("click", handleClickOutsideType, false);
    document.addEventListener("click", handleClickOutsideTheme, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
      document.removeEventListener("click", handleClickOutsideType, false);
      document.removeEventListener("click", handleClickOutsideTheme, false);
    };
  }, []);
  const [productCategory, setProductCategory] = useState([]);
  const [productType, setProductType] = useState([]);
  const [productTheme, setProductTheme] = useState([]);
  useEffect(() => {
    const getCountries = async () => {
      const result = await GetAllCountriesService();
      setCountries(result);
    };
    getCountries();
    const getProductCategory = async () => {
      const result = await GetProductCategoryService();
      setProductCategory(result);
    };
    getProductCategory();
    const getProductType = async () => {
      const result = await GetProductTypeService();
      setProductType(result);
    };
    getProductType();
    const getProductTheme = async () => {
      const result = await GetProductThemeService();
      setProductTheme(result);
    };
    getProductTheme();
  }, []);
  const handleCloseCountry = () => {
    setOpenCountry(false);
  };
  const handleOpenCountry = () => {
    setOpenCountry(true);
  };
  const handleAllStates = (e: any) => {
    setSecondStepData({
      ...secondStepData,
      editDestination: e.target.value,
    });
    const json = { country: e.target.value };
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(json),
    })
      .then((res) => res.json())
      .then((result) => {
        setStates(result.data.states);
      });
  };
  const handleCloseState = () => {
    setOpenState(false);
  };
  const handleOpenState = () => {
    setOpenState(true);
  };
  const handleWeightUnits = (event: any) => {
    setSecondStepData({
      ...secondStepData,
      units: event.target.value,
    });
  };
  const handleCountryOrigin = (event: any) => {
    setSecondStepData({
      ...secondStepData,
      countryOrigin: event.target.value,
    });
  };
  const handleAddressType = (event: any) => {
    setSecondStepData({
      ...secondStepData,
      addressType: event.target.value,
    });
  };
  const handleHandlingTime = (event: any) => {
    setSecondStepData({
      ...secondStepData,
      handlingTime: event.target.value,
    });
  };
  function handleStandardShippingRadio() {
    setSecondStepData({
      ...secondStepData,
      standard_shipping: !secondStepData.standard_shipping,
    });
  }
  function handleOfferExpeditedRadio() {
    setSecondStepData({
      ...secondStepData,
      offer_expedited_shipping: !secondStepData.offer_expedited_shipping,
    });
  }
  function handleOfferRushRadio() {
    setSecondStepData({
      ...secondStepData,
      offer_rush_shipping: !secondStepData.offer_rush_shipping,
    });
  }
  const handleColor = (event: any) => {
    setThirdStepData({
      ...thirdStepData,
      color: event.target.value,
    });
  };
  const handleMaterial = (event: any) => {
    setThirdStepData({
      ...thirdStepData,
      material: event.target.value,
    });
  };
  const handleGender = (event: any) => {
    setThirdStepData({
      ...thirdStepData,
      gender: event.target.value,
    });
  };
  const handleProductCondition = (event: any) => {
    setThirdStepData({
      ...thirdStepData,
      condition: event.target.value,
    });
  };
  const handleMultipleVariants = (event: any) => {
    setThirdStepData({
      ...thirdStepData,
      checkedVariant: event.target.checked,
    });
  };
  const handleUnits = (event: any) => {
    setFirstStepData({
      ...firstStepData,
      units: event.target.value,
    });
  };
  function handleClickRadio(event: any) {
    setPrintOnDemand(!printOnDemand);
  }
  function handleCustomProduct(event: any) {
    setCustomProduct(!customProduct);
  }
  const handleChangeRadio = (event: any) => {
    setFirstStepData({
      ...firstStepData,
      map_agreement: event.target.value,
    });
  };
  const handleChangeRadioMultiple = (event: any) => {
    setFirstStepData({
      ...firstStepData,
      multiple_variants: event.target.value,
    });
  };
  const [firstStepComplete, setFirstStepComplete] = useState(false);
  const [secondStepComplete, setSecondStepComplete] = useState(false);
  const handleStepFirst = () => {
    setFirstStep(true);
    setSecondStep(false);
    setThirdStep(false);
    setSecondStepClass("steps-num");
  };
  const handleStepSecond = () => {
    // if (firstStepComplete) {
    setFirstStep(false);
    setSecondStep(true);
    setThirdStep(false);
    setSecondStepClass(secondStepClass + " " + "done");
    if (firstStepData.multiple_variants === "yes") {
      handleAddVariant();
    }
    // }
  };
  const handleStepThird = () => {
    if (firstStepComplete && secondStepComplete) {
      setFirstStep(false);
      setSecondStep(false);
      setThirdStep(true);
    }
  };
  const [errorTextName, setErrorTextName] = useState<any>("");
  const [errorTextDesc, setErrorTextDesc] = useState<any>("");
  const [errorTextSku, setErrorTextSku] = useState<any>("");
  const [errorTextMap, setErrorTextMap] = useState<any>("");
  const [errorTextMapAgree, setErrorTextMapAgree] = useState<any>("");
  const [errorTextMultipleAgree, setErrorTextMultipleAgree] = useState<any>("");
  const [errorTextProductTheme, setErrorTextProductTheme] = useState<any>("");
  const [errorTextInternalTags, setErrorTextInternalTags] = useState<any>("");
  const [errorTextProductCategory, setErrorTextProductCategory] = useState<any>("");
  const [errorTextProductType, setErrorTextProductType] = useState<any>("");
  const [errorTextWbg, setErrorTextWbg] = useState<any>("");
  const [errorTextSize, setErrorTextSize] = useState<any>("");
  const [errorTextLifestyle, setErrorTextLifestyle] = useState<any>("");
  // const [errorTextTax, setErrorTextTax] = useState<any>("");
  const [errorTextStock, setErrorTextStock] = useState<any>("");
  const [errorTextUnits, setErrorTextUnits] = useState<any>("");
  const [errorTextCategory, setErrorTextCategory] = useState<any>("");
  const [errorTextType, setErrorTextType] = useState<any>("");
  const [errorTextTheme, setErrorTextTheme] = useState<any>("");
  const [errorTextImage, setErrorTextImage] = useState<any>("");
  const [customCombo, setCustomCombo] = useState("custom-combo");
  const [firstStepLoader, setFirstStepLoader] = useState(false);
  const [savingPrdctClass, setSavingPrdctClass] = useState<any>();
  const handleFirstForm = async (e: any) => {
    if (firstStepComplete) {
      setFirstStep(false);
      setSecondStep(true);
      setThirdStep(false);
    } else {
    e.preventDefault();
    if (!firstStepData.category_name) {
      setCustomCombo(customCombo + " custom-combo-error");
    } else {
      setCustomCombo("custom-combo");
    }
    if (!imageWbg || !imageSize || !imageLifestyle) {
      setDropzoneClassWrap(dropzoneClassWrap + " custom-image-error");
    } else {
      setDropzoneClassWrap("dropzone-wrap");
    }
    !firstStepData.name
      ? setErrorTextName("Please add Product Name in characters")
      : setErrorTextName("");
    !firstStepData.description
      ? setErrorTextDesc("Please add a Product Description")
      : setErrorTextDesc("");
    !firstStepData.sku
    ? setErrorTextSku("Please fill Product SKU")
      : setErrorTextSku("");
      !firstStepData.map_agreement
        ? setErrorTextMap("Please fill the Map Agreement")
        : setErrorTextMap("");
    firstStepData.map_agreement === "yes" && !firstStepData.map_agreement_yes
      ? setErrorTextMapAgree("Please fill Product Price Disclosure")
      : setErrorTextMapAgree("");
      !firstStepData.multiple_variants
        ? setErrorTextMultipleAgree("Please fill if the Product has multiple variants or not")
        : setErrorTextMultipleAgree("");
    !firstStepData.theme_name
      ? setErrorTextProductTheme("Please select Product Theme")
      : setErrorTextProductTheme("");
    !firstStepData.internal_tags
      ? setErrorTextInternalTags("Please add Product Internal Tags")
      : setErrorTextInternalTags("");
    !firstStepData.category_name
      ? setErrorTextProductCategory("Please select Product Category")
      : setErrorTextProductCategory("");
    !firstStepData.type_name
      ? setErrorTextProductType("Please select Product Type")
      : setErrorTextProductType("");
      !imageWbg
        ? setErrorTextWbg("Please add Product WBG Image")
        : setErrorTextWbg("");
        !imageSize
          ? setErrorTextSize("Please add Product Size Image")
          : setErrorTextSize("");
          !imageLifestyle
            ? setErrorTextLifestyle("Please add Product Lifestyle Image")
            : setErrorTextLifestyle("");
    if (
      firstStepData.name &&
      firstStepData.description &&
      firstStepData.sku &&
      firstStepData.map_agreement &&
      firstStepData.multiple_variants &&
      firstStepData.theme_name &&
      firstStepData.internal_tags &&
      firstStepData.category_name &&
      firstStepData.type_name &&
      imageWbg && imageSize && imageLifestyle
    ) {
      setFirstStepLoader(true);
      setSavingPrdctClass("saving-prdct-info");
      const json = {
        vendor_id: userId,
        name: firstStepData.name,
        sku: firstStepData.sku,
        description: firstStepData.description,
        map_pricing: firstStepData.map_agreement,
        price: firstStepData.map_agreement_yes,
        multiple_variant: firstStepData.multiple_variants,
        product_identifier: firstStepData.identifier,
        category_name: firstStepData.category_name,
        product_theme: firstStepData.theme_name,
        product_internal_tags : firstStepData.internal_tags,
        product_type : firstStepData.type_name,
        video_type : firstStepData.video,
        video_url : firstStepData.video_url
      };
      const result1 = await ProductsDataService(json);
      if (result1) {
        setProductId(result1.id);
        const formData = new FormData();
        formData.append("product_id", result1.id);
        productAllImages.push(...otherAllImages)
        productAllImages.forEach(async (v: any) => {
          formData.append("file", v);
        });
        const result2 = await ProductsImageService(formData);
        if (result2) {
          if (firstStepData.multiple_variants === "yes") {
            handleAddVariant();
            setFirstStepClass(firstStepClass);
            setFirstStepComplete(true);
            setFirstStep(false);
            setSecondStep(true);
            setThirdStep(false);
            setFirstStepLoader(false);
          } else {
            setFirstStepClass(firstStepClass);
            setFirstStepComplete(true);
            setFirstStep(false);
            setSecondStep(true);
            setThirdStep(false);
            setFirstStepLoader(false);
          }
        }
      }
    } else if (firstStepData.map_agreement === "yes" && !firstStepData.map_agreement_yes) {
      return false;
    }
  }
  };
  const handleSecondFormBack = () => {
    setFirstStep(true);
    setSecondStep(false);
    setThirdStep(false);
  };
  const [errorTextWeight, setErrorTextWeight] = useState<any>("");
  const [errorTextWeightUnit, setErrorTextWeightUnit] = useState<any>("");
  const [errorTextCountryOrigin, setErrorTextCountryOrigin] = useState<any>("");
  const [errorTextHScode, setErrorTextHScode] = useState<any>("");
  const [errorTextDestination, setErrorTextDestination] = useState<any>("");
  const [errorTextState, setErrorTextState] = useState<any>("");
  const [errorTextBaseRate, setErrorTextBaseRate] = useState<any>("");
  const [errorTextCartMin, setErrorTextCartMin] = useState<any>("");
  const [errorTextRAI, setErrorTextRAI] = useState<any>("");
  const [errorTextEDD, setErrorTextEDD] = useState<any>("");
  const handleSecondForm = async (e: any) => {
    e.preventDefault();
    var reg1 = /^[0-9]\d*(\.\d{1,3})?$/;
    !secondStepData.weight || !reg1.test(secondStepData.weight)
      ? setErrorTextWeight("Please add Product weight in numbers")
      : setErrorTextWeight("");
    !secondStepData.units
      ? setErrorTextWeightUnit("Please add a Product units")
      : setErrorTextWeightUnit("");
    !secondStepData.countryOrigin
      ? setErrorTextCountryOrigin("Please add Origin of Country")
      : setErrorTextCountryOrigin("");
    !secondStepData.hs_code
      ? setErrorTextHScode("Please fill Product HS Code")
      : setErrorTextHScode("");
    !secondStepData.editDestination
      ? setErrorTextDestination("Please add Product Country Destination")
      : setErrorTextDestination("");
    !secondStepData.states
      ? setErrorTextState("Please add Product State Destination")
      : setErrorTextState("");
    !secondStepData.base_rate || !reg1.test(secondStepData.base_rate)
      ? setErrorTextBaseRate("Please fill the Base Rate in numbers")
      : setErrorTextBaseRate("");
    !secondStepData.cart_min || !reg1.test(secondStepData.cart_min)
      ? setErrorTextCartMin(
          "Please fill the Cart Minimum for free shipping in numbers"
        )
      : setErrorTextCartMin("");
    !secondStepData.rate_additional_item ||
    !reg1.test(secondStepData.rate_additional_item)
      ? setErrorTextRAI("Please add Rate Additional Item in numbers")
      : setErrorTextRAI("");
    !secondStepData.estimated_delivery_days ||
    !reg1.test(secondStepData.estimated_delivery_days)
      ? setErrorTextEDD("Please add Estimated Delivery Days in numbers")
      : setErrorTextEDD("");
    if (
      secondStepData.weight &&
      reg1.test(secondStepData.weight) &&
      secondStepData.units &&
      secondStepData.countryOrigin &&
      secondStepData.hs_code &&
      secondStepData.editDestination &&
      secondStepData.states &&
      secondStepData.base_rate &&
      reg1.test(secondStepData.base_rate) &&
      secondStepData.cart_min &&
      reg1.test(secondStepData.cart_min) &&
      secondStepData.rate_additional_item &&
      reg1.test(secondStepData.rate_additional_item) &&
      secondStepData.estimated_delivery_days &&
      reg1.test(secondStepData.estimated_delivery_days)
    ) {
      const json = {
        product_id: productId,
        weight: secondStepData.weight,
        country: secondStepData.countryOrigin,
        hs_code: secondStepData.hs_code,
        country_destination: secondStepData.editDestination,
        state: secondStepData.states,
        address_types: secondStepData.addressType,
        handling_time: secondStepData.handlingTime,
        base_rate: secondStepData.base_rate,
        cart_min: secondStepData.cart_min,
        rate_additional_item: secondStepData.rate_additional_item,
        estimated_delivery_days: secondStepData.estimated_delivery_days,
        offer_expedited_shipping: secondStepData.offer_expedited_shipping,
        offer_rush_shipping: secondStepData.offer_rush_shipping,
      };
      const result = await ProductsShippingService(json);
      if (result) {
        if (result.id) {
          setSecondStepClass(secondStepClass + " done");
          setSecondStepComplete(true);
          setFirstStep(false);
          setSecondStep(false);
          setThirdStep(true);
        }
      }
    }
  };
  const [errorTextCustom, setErrorTextCustom] = useState<any>("");
  // const [errorTextSize, setErrorTextSize] = useState<any>("");
  const [errorTextColor, setErrorTextColor] = useState<any>("");
  const [errorTextMaterial, setErrorTextMaterial] = useState<any>("");
  const handleThirdForm = async (e: any) => {
    e.preventDefault();
    var reg = /^[1-9]\d*(\.\d+)?$/;
    var reg1 = /^[a-zA-Z ]*$/;
    !thirdStepData.size || !reg1.test(thirdStepData.size)
      ? setErrorTextSize("Please add Product Size in characters")
      : setErrorTextSize("");
    !thirdStepData.color
      ? setErrorTextColor("Please add a Product Color")
      : setErrorTextColor("");
    !thirdStepData.material
      ? setErrorTextMaterial("Please add a Product Material")
      : setErrorTextMaterial("");
    customProduct === true &&
    !customProductCount &&
    !reg.test(customProductCount)
      ? setErrorTextCustom(
          "Please fill Characters Count of Custom Product in numbers"
        )
      : setErrorTextCustom("");
    if (
      thirdStepData.size &&
      reg1.test(thirdStepData.size) &&
      thirdStepData.color &&
      thirdStepData.material
    ) {
      if (
        customProduct === true &&
        customProductCount !== undefined &&
        reg.test(customProductCount)
      ) {
        const jsonCustom = {
          letters_to_be_entered: customProductCount,
          custom_product: customProduct,
        };
        await UpdateProductsByIdService(productId, jsonCustom);
        const jsonNew = {
          product_id: productId,
          what_gender_is_product_for: thirdStepData.gender,
          condition: thirdStepData.condition,
          product_option1: thirdStepData.size,
          product_option2: thirdStepData.color,
          product_option3: thirdStepData.material,
        };
        await ProductsOptionsService(jsonNew);
        let arrSize: any = [];
        let arrColor: any = [];
        let arrMaterial: any = [];
        let arrPrice: any = [];
        let arrWholesale: any = [];
        let arrSuggested: any = [];
        let arrQuantity: any = [];
        let arrSku: any = [];
        let arrImage: any = [];
        selectBox.forEach((item: any) => {
          arrSize.push(item.size);
          arrColor.push(item.Color);
          arrMaterial.push(item.material);
          arrPrice.push(item.price);
          arrWholesale.push(item.wholesale_price);
          arrSuggested.push(item.suggested_wholesale);
          arrQuantity.push(item.quantity);
          arrSku.push(item.sku);
          arrImage.push(item.image);
        });
        if (thirdStepData.checkedVariant) {
          arrSize.push(thirdStepData.size);
          arrColor.push(thirdStepData.color);
          arrMaterial.push(thirdStepData.material);
          arrPrice.push(thirdStepData.price);
          arrWholesale.push(thirdStepData.wholesale_price);
          arrSuggested.push(thirdStepData.suggested_price);
          arrQuantity.push(thirdStepData.quantity);
          arrSku.push(thirdStepData.sku);
          arrImage.push(productImageFirst.name);
        }
        const json = {
          product_id: productId,
          size: arrSize.toString(),
          color: arrColor.toString(),
          material: arrMaterial.toString(),
          price: arrPrice.toString(),
          wholesale_price: arrWholesale.toString(),
          suggested_wholesale: arrSuggested.toString(),
          quantity: arrQuantity.toString(),
          sku: arrSku.toString(),
          image: arrImage.toString(),
        };
        const result = await ProductsVariantsService(json);
        if (result) {
          setThirdStepClass(secondStepClass + " done");
          setFirstStep(false);
          setSecondStep(false);
          setThirdStep(false);
          navigate("/products");
        }
      } else {
        const jsonNew = {
          product_id: productId,
          what_gender_is_product_for: thirdStepData.gender,
          condition: thirdStepData.condition,
          product_option1: thirdStepData.size,
          product_option2: thirdStepData.color,
          product_option3: thirdStepData.material,
        };
        await ProductsOptionsService(jsonNew);
        let arrSize: any = [];
        let arrColor: any = [];
        let arrMaterial: any = [];
        let arrPrice: any = [];
        let arrWholesale: any = [];
        let arrSuggested: any = [];
        let arrQuantity: any = [];
        let arrSku: any = [];
        let arrImage: any = [];
        selectBox.forEach((item: any) => {
          arrSize.push(item.size);
          arrColor.push(item.Color);
          arrMaterial.push(item.material);
          arrPrice.push(item.price);
          arrWholesale.push(item.wholesale_price);
          arrSuggested.push(item.suggested_wholesale);
          arrQuantity.push(item.quantity);
          arrSku.push(item.sku);
          arrImage.push(item.image);
        });
        if (thirdStepData.checkedVariant) {
          arrSize.push(thirdStepData.size);
          arrColor.push(thirdStepData.color);
          arrMaterial.push(thirdStepData.material);
          arrPrice.push(thirdStepData.price);
          arrWholesale.push(thirdStepData.wholesale_price);
          arrSuggested.push(thirdStepData.suggested_price);
          arrQuantity.push(thirdStepData.quantity);
          arrSku.push(thirdStepData.sku);
          arrImage.push(productImageFirst.name);
        }
        const json = {
          product_id: productId,
          size: arrSize.toString(),
          color: arrColor.toString(),
          material: arrMaterial.toString(),
          price: arrPrice.toString(),
          wholesale_price: arrWholesale.toString(),
          suggested_wholesale: arrSuggested.toString(),
          quantity: arrQuantity.toString(),
          sku: arrSku.toString(),
          image: arrImage.toString(),
        };
        const result = await ProductsVariantsService(json);
        if (result) {
          setThirdStepClass(secondStepClass + " done");
          setFirstStep(false);
          setSecondStep(false);
          setThirdStep(false);
          navigate("/products");
        }
      }
    }
  };
  const [customCategory, setCustomCategory] = useState<any>();
  const [addCategory, setAddCategory] = useState(false);
  const [searchCategory, setSearchCategory] = useState(true);
  const [searchCustomCategory, setSearchCustomCategory] = useState<any>();
  
  const [customType, setCustomType] = useState<any>();
  const [addType, setAddType] = useState(false);
  const [searchType, setSearchType] = useState(true);
  const [searchCustomType, setSearchCustomType] = useState<any>();
  
  const [customTheme, setCustomTheme] = useState<any>();
  const [addTheme, setAddTheme] = useState(false);
  const [searchTheme, setSearchTheme] = useState(true);
  const [searchCustomTheme, setSearchCustomTheme] = useState<any>();
  const getFilteredItems = (query: any, items: any) => {
    if (!query) {
      return items;
    }
    return items.filter((name: any) => name.name.includes(query.toUpperCase()));
  };
  const filteredItemsCategory = getFilteredItems(searchCustomCategory, productCategory);
  const handleProductCategory = (event: any) => {
    setSearchCategory(false);
    setSearchCustomCategory("");
    setFirstStepData({
      ...firstStepData,
      category_name: event.target.textContent,
    });
    setCustomCategory("");
    setAddCategory(false);
    setDropComplete(false);
  };
  const handleAddCategory = async () => {
    setCustomCategory("");
    const json = { name: customCategory };
    const result = await AddProductCategoryService(json);
      if (result) {
        const result = await GetProductCategoryService();
        if (result) {
          setProductCategory(result);
          setAddCategory(false);
          setCustomCategory("");
        }
      }
  };
  const handleAddCustom = (e: any) => {
    setSearchCategory(false);
    setSearchCustomCategory("");
    setDropComplete(false);
    setAddCategory(true);
  };
  const filteredItemsType = getFilteredItems(searchCustomType, productType);
  const handleProductType = (event: any) => {
    setSearchType(false);
    setSearchCustomType("");
    setFirstStepData({
      ...firstStepData,
      type_name: event.target.textContent,
    });
    setCustomType("");
    setAddType(false);
    setDropCompleteType(false);
  };
  const handleAddType = async () => {
    setCustomType("");
    const json = { name: customType };
    const result = await AddProductTypeService(json);
      if (result) {
      const result = await GetProductTypeService();
      if (result) {
        setProductType(result);
        setAddType(false);
        setCustomType("");
      }
    }
  };
  const handleAddCustomType = (e: any) => {
    setSearchType(false);
    setSearchCustomType("");
    setDropCompleteType(false);
    setAddType(true);
  };
  const filteredItemsTheme = getFilteredItems(searchCustomTheme, productTheme);
  const handleProductTheme = (event: any) => {
    setSearchTheme(false);
    setSearchCustomTheme("");
    setFirstStepData({
      ...firstStepData,
      theme_name: event.target.textContent,
    });
    setCustomTheme("");
    setAddTheme(false);
    setDropCompleteTheme(false);
  };
  const handleAddTheme = async () => {
    setCustomTheme("");
    const json = { name: customTheme };
    const result = await AddProductThemeService(json);
      if (result) {
        const result = await GetProductThemeService();
        if (result) {
          setProductTheme(result);
          setAddTheme(false);
          setCustomTheme("");
        }
      }
  };
  const handleAddCustomTheme = (e: any) => {
    setSearchTheme(false);
    setSearchCustomTheme("");
    setDropComplete(false);
    setAddTheme(true);
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);

  const [imageSrc, setImageSrc] = useState(image2);
  const [imageBgSrc, setImageBgSrc] = useState(image5);
  const [imageText, setImageText] = useState("");
  const canvas: any = document.getElementById("myCanvas");
  const ctx = canvas !== null ? canvas.getContext("2d") : "";
  const image: any = document.getElementById("image2");
  // ctx.fillText(selectBox[indexState][`label`], canvas.width / 2, canvas.height / 2);
  const imageFive: any = document.getElementById("image5");
  // if (image !== null) {
  //   image.addEventListener("load", (e: any) => {
  //     ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     ctx.fillStyle = "white";
  //     ctx.textAlign = "center";
  //     ctx.font = "50px Arial";
  //     // ctx.fillText(imageText, canvas.width / 2, canvas.height / 2);
  //   });
  // }
  // if (imageFive !== null) {
  //   imageFive.addEventListener("load", (e: any) => {
  //     ctx.drawImage(imageFive, 0, 0, canvas.width/2, canvas.height/2);
  //     ctx.clearRect(0, 0, canvas.width/2, canvas.height/2);
  //     ctx.fillStyle = "white";
  //     ctx.textAlign = "center";
  //     ctx.font = "50px Arial";
  //     // ctx.fillText(imageText, canvas.width / 2, canvas.height / 2);
  //   });
  // }
  // var background = new Image();
  // background.src = imageBgSrc
  // background.onload = function(){
  //   ctx.drawImage(background,0,0);   
  // }
  const handleImageText = (e: any) => {
    // setImageText(e.target.value);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "50px Arial";
    ctx.fillText(e.target.value, canvas.width / 2, canvas.height / 2);
  };
  return (
    <div className="products-steps-wrap">
      <Helmet title="Add Products" />
      <div className="steps-bullets">
        <span className="steps">
          <span className={firstStepClass} onClick={handleStepFirst}>
            01
          </span>
          <span className={secondStepClass} onClick={handleStepSecond}>
            02
          </span>
          {/* <span className={thirdStepClass} onClick={handleStepThird}>
            03
          </span> */}
        </span>
          {secondStep && firstStepData.multiple_variants === "yes" ?
            <Button
              variant="outlined"
              className="add-variant-btn"
              onClick={handleAddVariant}
            >
              Add Variant
            </Button>
            : null}
      </div>
      {firstStep && !secondStep && !thirdStep ? (
        <>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Item className="no-bg">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Item className="pd-30 box-shadow">
                      <Typography
                        variant="h1"
                        component="h2"
                        className="box-head"
                      >
                        Add a Product
                      </Typography>
                      <Item>
                        <TextField
                          error={errorTextName !== "" ? true : false}
                          fullWidth
                          className="top-label"
                          id="product-name"
                          label="Product Name"
                          variant="outlined"
                          margin="normal"
                          size="small"
                          InputLabelProps={{ shrink: true }}
                          placeholder="What should we call it?"
                          InputProps={{
                            classes: { input: props.classes["input"] },
                          }}
                          value={firstStepData.name}
                          onChange={(e) =>
                            setFirstStepData({
                              ...firstStepData,
                              name: e.target.value,
                            })
                          }
                        />
                      </Item>
                      {errorTextName !== "" ? (
                        <Alert severity="error">{errorTextName}</Alert>
                      ) : null}
                      <Item>
                        <TextField
                          error={errorTextDesc !== "" ? true : false}
                          fullWidth
                          multiline
                          minRows="4"
                          className="top-label"
                          id="outlined-basic"
                          label="Description"
                          size="small"
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                          placeholder="Tell me everything! (500 word max)"
                          value={firstStepData.description}
                          onChange={(e) =>
                            setFirstStepData({
                              ...firstStepData,
                              description: e.target.value,
                            })
                          }
                        />
                      </Item>
                      {errorTextDesc !== "" ? (
                        <Alert severity="error">{errorTextDesc}</Alert>
                      ) : null}
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Item>
                            <TextField
                              error={errorTextSku !== "" ? true : false}
                              fullWidth
                              className="top-label"
                              id="product-name"
                              label="SKU"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              InputLabelProps={{ shrink: true }}
                              placeholder="Enter SKU"
                              value={firstStepData.sku}
                              onChange={(e) =>
                                setFirstStepData({
                                  ...firstStepData,
                                  sku: e.target.value,
                                })
                              }
                            />
                          </Item>
                        {errorTextSku !== "" ? (
                        <Alert severity="error">{errorTextSku}</Alert>
                      ) : null}
                        </Grid>
                        <Grid item xs={6}>
                          <Item>
                            <TextField
                              fullWidth
                              className="top-label"
                              id="product-name"
                              label="Product Identifier (optional)"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              InputLabelProps={{ shrink: true }}
                              placeholder="Enter MPN, UPC, GTIN etc"
                              InputProps={{
                                classes: { input: props.classes["input"] },
                              }}
                              value={firstStepData.identifier}
                              onChange={(e) =>
                                setFirstStepData({
                                  ...firstStepData,
                                  identifier: e.target.value,
                                })
                              }
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={12}>
                          <Item className="pb-0">
                            <Typography
                              variant="h1"
                              component="h2"
                              className="media-head mb-0 ml-0"
                            >
                              Required Map Pricing
                            </Typography>
                          </Item>
                        </Grid>
                        <Grid item xs={3}>
                          <Item>
                            <FormControl className="cstm-radio mb-15">
                              <RadioGroup
                                className="flexd-row"
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={firstStepData.map_agreement}
                                onChange={handleChangeRadio}
                              >
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="No"
                                />
                              </RadioGroup>
                            </FormControl>
                            {errorTextMap !== "" ? (
                              <Alert severity="error">{errorTextMap}</Alert>
                            ) : null}
                          </Item>
                        </Grid>
                        <Grid item xs={9}>
                          {firstStepData.map_agreement === "yes" ? (
                            <Item>
                              <TextField
                                error={errorTextSku !== "" ? true : false}
                                fullWidth
                                className="top-label"
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                placeholder="If Yes, add the Pricing Disclosure Information"
                                InputProps={{
                                  classes: { input: props.classes["input"] },
                                }}
                                value={firstStepData.map_agreement_yes}
                                onChange={(e) =>
                                  setFirstStepData({
                                    ...firstStepData,
                                    map_agreement_yes: e.target.value,
                                  })
                                }
                              />
                            </Item>
                          ) : null}
                          {errorTextMapAgree !== "" ? (
                            <Alert severity="error">{errorTextMapAgree}</Alert>
                          ) : null}
                        </Grid>
                        <Grid item xs={12}>
                          <Item className="pb-0">
                            <Typography
                              variant="h1"
                              component="h2"
                              className="media-head mb-0 ml-0"
                            >
                              Product has Multiple Variants?
                            </Typography>
                          </Item>
                        </Grid>
                        <Grid item xs={3}>
                          <Item>
                            <FormControl className="cstm-radio mb-15">
                              <RadioGroup
                                className="flexd-row"
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={firstStepData.multiple_variants}
                                onChange={handleChangeRadioMultiple}
                              >
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="No"
                                />
                              </RadioGroup>
                            </FormControl>
                            {errorTextMultipleAgree !== "" ? (
                              <Alert severity="error">{errorTextMultipleAgree}</Alert>
                            ) : null}
                          </Item>
                        </Grid>
                      </Grid>
                    </Item>
                    <Item className="pd-30 box-shadow mt-15">
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Item className="select-item-prod">
                            <InputLabel className="selct-lbl-fix">
                              Product Theme
                            </InputLabel>
                            <Item
                            id="custom-cat"
                            className={customCombo}
                            ref={wrapperRefTheme}
                            >
                            <>
                             <input
                          value={searchTheme
                              ? searchCustomTheme
                              : firstStepData.theme_name
                          }
                          placeholder="Select One"
                          onChange={(event: any) => {
                            if (searchTheme) {
                              setSearchCustomTheme(event.target.value);
                            } else {
                              setFirstStepData({
                                ...firstStepData,
                                theme_name: event.target.textContent,
                              });
                              setDropCompleteTheme(false);
                            }
                          }}
                          onClick={() => {setDropCompleteTheme(!dropCompleteTheme); setSearchTheme(true)}}
                        />
                        {/* {customTheme !== undefined &&
                        customTheme !== "" ? (
                          <div onClick={handleAddTheme}>
                            <AddCircleOutlinedIcon className="icon-cursor add-custom-circle" />
                          </div>
                        ) : null} */}
                        {dropCompleteTheme ? (
                          <ArrowDropUpIcon
                            onClick={() => setDropCompleteTheme(!dropCompleteTheme)}
                            className="icon-cursor"
                          />
                        ) : (
                          <ArrowDropDownIcon
                            onClick={(e: any) => {
                              e.stopPropagation();
                              setDropCompleteTheme(!dropCompleteTheme);
                            }}
                            className="icon-cursor"
                          />
                        )}
                        {dropCompleteTheme ? (
                          <ul>
                            {filteredItemsTheme.map((name: any) => (
                              <li onClick={handleProductTheme}>
                                {name.name}
                              </li>
                            ))}
                            {/* <li
                              className="add-custom"
                              onClick={handleAddCustomTheme}
                            >
                              <AddIcon /> Add Custom
                            </li> */}
                          </ul>
                        ) : 
                        null}
                        </>
                          </Item>
                          {errorTextProductTheme !== "" ? (
                            <Alert severity="error">{errorTextProductTheme}</Alert>
                          ) : null}
                          </Item>
                          <Item>
                            <TextField
                              fullWidth
                              error={errorTextInternalTags !== "" ? true : false}
                              className="top-label"
                              id="outlined-basic"
                              label="Product Internal Tags"
                              variant="outlined"
                              size="small"
                              InputLabelProps={{ shrink: true }}
                              placeholder="Promo (example)"
                              InputProps={{
                                classes: { input: props.classes["input"] },
                              }}
                              value={firstStepData.internal_tags}
                              onChange={(event: any) => {
                                  setFirstStepData({
                                    ...firstStepData,
                                    internal_tags: event.target.value,
                                  });
                                }
                              }
                            />
                          </Item>
                          {errorTextInternalTags !== "" ? (
                              <Alert severity="error">{errorTextInternalTags}</Alert>
                            ) : null}
                          <Item className="select-item-prod">
                            <InputLabel className="selct-lbl-fix">
                              Product Category
                            </InputLabel>
                            <Item
                            id="custom-cat"
                            className={customCombo}
                            ref={wrapperRef}
                          >
                            <>
                             <input
                          value={searchCategory
                              ? searchCustomCategory
                              : firstStepData.category_name
                          }
                          placeholder="Select One"
                          onChange={(event: any) => {
                            if (searchCategory) {
                              setSearchCustomCategory(event.target.value);
                            } else {
                              setFirstStepData({
                                ...firstStepData,
                                category_name: event.target.textContent,
                              });
                              setDropComplete(false);
                            }
                          }}
                          onClick={() => {setDropComplete(!dropComplete); setSearchCategory(true)}}
                        />
                        {/* {customCategory !== undefined &&
                        customCategory !== "" ? (
                          <div onClick={handleAddCategory}>
                            <AddCircleOutlinedIcon className="icon-cursor add-custom-circle" />
                          </div>
                        ) : null} */}
                        {dropComplete ? (
                          <ArrowDropUpIcon
                            onClick={() => setDropComplete(!dropComplete)}
                            className="icon-cursor"
                          />
                        ) : (
                          <ArrowDropDownIcon
                            onClick={(e: any) => {
                              e.stopPropagation();
                              setDropComplete(!dropComplete);
                            }}
                            className="icon-cursor"
                          />
                        )}
                        {dropComplete ? (
                          <ul>
                            {filteredItemsCategory.map((name: any) => (
                              <li onClick={handleProductCategory}>
                                {name.name}
                              </li>
                            ))}
                            {/* <li
                              className="add-custom"
                              onClick={handleAddCustom}
                            >
                              <AddIcon /> Add Custom
                            </li> */}
                          </ul>
                        ) :
                        null}
                        </>
                          </Item>
                          <Item className="text-left mt-5">
                            <Link href="#">Request New Categories</Link>
                          </Item>
                          {errorTextCategory !== "" ? (
                            <Alert severity="error">{errorTextCategory}</Alert>
                          ) : null}
                          </Item>
                          {errorTextProductCategory !== "" ? (
                              <Alert severity="error">{errorTextProductCategory}</Alert>
                            ) : null}
                          <Item className="select-item-prod">
                            <InputLabel className="selct-lbl-fix">
                              Product Type
                            </InputLabel>
                          <Item
                            id="custom-cat"
                            className={customCombo}
                            ref={wrapperRefType}
                          >
                            <>
                             <input
                          value={searchType
                              ? searchCustomType
                              : firstStepData.type_name
                          }
                          placeholder="Select One"
                          onChange={(event: any) => {
                            if (searchType) {
                              setSearchCustomType(event.target.value);
                            } else {
                              setFirstStepData({
                                ...firstStepData,
                                type_name: event.target.textContent,
                              });
                              setDropCompleteType(false);
                            }
                          }}
                          onClick={() => { setDropCompleteType(!dropCompleteType); setSearchType(true)}}
                        />
                        {/* {customType !== undefined &&
                        customType !== "" ? (
                          <div onClick={handleAddType}>
                            <AddCircleOutlinedIcon className="icon-cursor add-custom-circle" />
                          </div>
                        ) : null} */}
                        {dropCompleteType ? (
                          <ArrowDropUpIcon
                            onClick={() => setDropCompleteType(!dropCompleteType)}
                            className="icon-cursor"
                          />
                        ) : (
                          <ArrowDropDownIcon
                            onClick={(e: any) => {
                              e.stopPropagation();
                              setDropCompleteType(!dropCompleteType);
                            }}
                            className="icon-cursor"
                          />
                        )}
                        {dropCompleteType ? (
                          <ul>
                            {filteredItemsType.map((name: any) => (
                              <li onClick={handleProductType}>
                                {name.name}
                              </li>
                            ))}
                            {/* <li
                              className="add-custom"
                              onClick={handleAddCustomType}
                            >
                              <AddIcon /> Add Custom
                            </li> */}
                          </ul>
                        ) : 
                        null}
                        </>
                          </Item>
                          </Item>
                          {errorTextProductType !== "" ? (
                            <Alert severity="error">{errorTextProductType}</Alert>
                          ) : null}
                        </Grid>
                        <Grid item xs={6}>
                          <Item>
                            <InputLabel className="selct-lbl-fix mb-5">
                              Product Images (Required)
                            </InputLabel>
                          </Item>
                          <Item className={dropzoneClassWrap}>
                            <div className="dropzone-wrapper">
                            <Dropzone
                              onDrop={e => handleDropWbg(e)}
                              accept="image/*"
                              minSize={1024}
                              maxSize={3072000}
                              multiple={false}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div
                                  {...getRootProps({
                                    className: dropzoneClassWbg,
                                  })}
                                >
                                  {!imageWbg ?
                                  <input {...getInputProps()} />
                                  :
                                  <img
                                    src={imageWbg}
                                    alt="wbg-img"
                                  />
                                  }
                                </div>
                              )}
                            </Dropzone>
                            {imageWbg ?
                            <span onClick={handleRemoveWbg}>&times;</span>
                            : null}
                            </div>
                            <div className="dropzone-wrapper">
                            <Dropzone
                              onDrop={(e) => handleDropSize(e)}
                              accept="image/*"
                              minSize={1024}
                              maxSize={3072000}
                              multiple={false}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div
                                {...getRootProps({
                                  className: dropzoneClassSize,
                                })}
                              >
                                {!imageSize ?
                                <input {...getInputProps()} />
                                :
                                <img
                                  src={imageSize}
                                  alt="size-img"
                                />
                                }
                              </div>
                              )}
                            </Dropzone>
                            {imageSize ?
                            <span onClick={handleRemoveSize}>&times;</span>
                            : null}
                            </div>
                            <div className="dropzone-wrapper">
                            <Dropzone
                              onDrop={(e) => handleDropLifestyle(e)}
                              accept="image/*"
                              minSize={1024}
                              maxSize={3072000}
                              multiple={false}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div
                                  {...getRootProps({
                                    className: dropzoneClassLifestyle,
                                  })}
                                >
                                  {!imageLifestyle ?
                                  <input {...getInputProps()} />
                                  :
                                  <img
                                    src={imageLifestyle}
                                    alt="lifestyle-img"
                                  />
                                  }
                                </div>
                              )}
                            </Dropzone>
                            {imageLifestyle ?
                            <span onClick={handleRemoveLifestyle}>&times;</span>
                            : null}
                            </div>
                          </Item>
                          <Item className="text-right mt-10">
                            <Link href="#">Product Image Guidelines</Link>
                          </Item>
                          {errorTextWbg !== "" ? (
                              <Alert severity="error">{errorTextWbg}</Alert>
                            ) : null}
                            {errorTextSize !== "" ? (
                                <Alert severity="error">{errorTextSize}</Alert>
                              ) : null}
                              {errorTextLifestyle !== "" ? (
                                  <Alert severity="error">{errorTextLifestyle}</Alert>
                                ) : null}
                          <Item className="mt-5">
                            <InputLabel className="selct-lbl-fix dflex mb-5">
                              Other Images &nbsp;
                            <HelpOutlineIcon className="help-icon"/>
                            </InputLabel>
                          </Item>
                            <div className="other-img">
                              <Item>
                              <Dropzone
                                onDrop={(e) => handleDropOtherImages(e)}
                                accept="image/*"
                                minSize={1024}
                                maxSize={3072000}
                              >
                              {({ getRootProps, getInputProps }) => (
                                <div
                                  {...getRootProps({
                                    className: dropzoneClassOtherImage,
                                  })}
                                >
                                  <input {...getInputProps()} />
                                </div>
                              )}
                              </Dropzone>
                              </Item>
                              <Item>
                                <div className="all-images">
                                  {selectedImages &&
                                    selectedImages.slice(0,8).map((image: any) => {
                                      return (
                                        <>
                                          <div key={image.productFile}>
                                            <div className="other-image">
                                            <img
                                              src={image.productFile}
                                              className="images"
                                              alt="product-file"
                                              onClick={() => handleClickOpen(image.productFile)}
                                            />
                                            <span
                                              onClick={() => {
                                                setSelectedImages(
                                                  selectedImages.filter(
                                                    (e: any) =>
                                                      e.productFile !== image.productFile
                                                  )
                                                );
                                                setProductImage(
                                                  productImage.filter(
                                                    (e: any) => e !== image.productName
                                                  )
                                                );
                                              }}
                                            >
                                              &times;
                                            </span>
                                            </div>
                                          </div>
                                          <Dialog
                                          fullScreen
                                          className="dialog-full"
                                          open={openClick}
                                          onClose={handleClickClose}
                                          TransitionComponent={Transition}
                                        >
                                          <AppBar className="dialog-header" sx={{ position: "relative" }}>
                                            {/* <Toolbar> */}
                                            <IconButton
                                              edge="end"
                                              color="inherit"
                                              onClick={handleClickClose}
                                              aria-label="close"
                                            >
                                              <CloseIcon />
                                            </IconButton>
                                            {/* </Toolbar> */}
                                          </AppBar>
                                          <div className="profile-dialog">
                                            <img src={otherImage} alt="profile-img" />
                                          </div>
                                          </Dialog>
                                        </>
                                      );
                                    })}
                                </div>
                              </Item>
                            </div>
                          <Item>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <InputLabel className="selct-lbl-fix mb-0">
                                  Product Video (optional)
                                </InputLabel>
                              </Grid>
                              <Grid item xs={4}>
                                <FormControl
                                  className="slct-input-fix hide-legend"
                                  fullWidth
                                  size="small"
                                >
                                  <Select
                                    className="height-fix-28 slct-input-pos"
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    placeholder="Youtube"
                                    name="video"
                                    value={firstStepData.video}
                                    onChange={(event: any) => {
                                        setFirstStepData({
                                          ...firstStepData,
                                          video: event.target.value,
                                        });
                                      }
                                    }
                                  >
                                    <MenuItem value="Youtube">Youtube</MenuItem>
                                    <MenuItem value="MP4">MP4</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={8}>
                                <TextField
                                  fullWidth
                                  className="top-label"
                                  id="outlined-basic"
                                  variant="outlined"
                                  size="small"
                                  InputLabelProps={{ shrink: true }}
                                  placeholder="Enter URL"
                                  InputProps={{
                                    classes: { input: props.classes["input"] },
                                  }}
                                  value={firstStepData.video_url}
                                    onChange={(event: any) => {
                                        setFirstStepData({
                                          ...firstStepData,
                                          video_url: event.target.value,
                                        });
                                      }
                                    }
                                />
                              </Grid>
                            </Grid>
                          </Item>
                          <Item className="text-right mt-5">
                            <Link href="#">Video Guidelines</Link>
                          </Item>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Item className="text-right no-bg">
                          <Button
                            variant="outlined"
                            className="red-btn btn"
                            onClick={handleFirstForm}
                          >
                            Next
                          </Button>
                        </Item>
                      </Grid>
                    </Item>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Box>
        <div className={savingPrdctClass}>
          {firstStepLoader ? (
            <p>
              <CircularProgress sx={{ color: "#fff" }} size={16} />
              Saving Information
            </p>
          ) : null}
        </div>
        </>
      ) : !firstStep && secondStep && !thirdStep ? (
        <>
        {firstStepData.multiple_variants === "no" ?
          <>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Item className="no-bg">
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Item className="pd-30 box-shadow">
                          <Typography
                            variant="h1"
                            component="h2"
                            className="box-head"
                          >
                            Variant Info
                          </Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={2}>
                              <Item className="variant-img-prdct">
                                {/* <input type="file" className="variant-img-new" /> */}
                                {singleVariant.customizer_image === false ?
                                  <img src={imageWbg} />
                                  :
                                  <div className="other-img-main dflex posrel prdct-canvas prdct-accor">
                                    <img
                                        id="image2"
                                        src={imageSrc}
                                        className="product-img-add"
                                        alt="imagesrc"
                                      />
                                      <img
                                        id="image5"
                                        src={imageBgSrc}
                                        className="product-img"
                                        alt="imagesrc"
                                      />
                                      <h2>{customPhoto.label}</h2>
                                  </div>
                                }
                                <Link className="blue-link" href="#customize-single-id">Change Image</Link>
                              </Item>
                            </Grid>
                            <Grid item xs={10}>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                      <Item>
                                        <TextField
                                          fullWidth
                                          className="top-label"
                                          id="outlined-basic"
                                          label="Variant Name"
                                          variant="outlined"
                                          size="small"
                                          InputLabelProps={{ shrink: true }}
                                          placeholder="Enter variant name"
                                          InputProps={{
                                            classes: {
                                              input: props.classes["input"],
                                            },
                                          }}
                                          value={singleVariant.variant_name}
                                          onChange={(e) => {
                                            setSingleVariant({...singleVariant, variant_name: e.target.value})
                                          }}
                                        />
                                      </Item>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <Item>
                                        <TextField
                                          fullWidth
                                          className="top-label"
                                          id="outlined-basic"
                                          label="Size/Color/Style/Material"
                                          variant="outlined"
                                          size="small"
                                          InputLabelProps={{ shrink: true }}
                                          placeholder="Enter here"
                                          InputProps={{
                                            classes: {
                                              input: props.classes["input"],
                                            },
                                          }}
                                          value={singleVariant.material}
                                          onChange={(e) => {
                                            setSingleVariant({...singleVariant, material: e.target.value})
                                          }}
                                        />
                                      </Item>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <Item>
                                        <TextField
                                          fullWidth
                                          className="top-label"
                                          id="outlined-basic"
                                          label="SKU"
                                          variant="outlined"
                                          size="small"
                                          InputLabelProps={{ shrink: true }}
                                          placeholder="Enter SKU here"
                                          InputProps={{
                                            classes: {
                                              input: props.classes["input"],
                                            },
                                          }}
                                          value={singleVariant.sku}
                                          onChange={(e) => {
                                            setSingleVariant({...singleVariant, sku: e.target.value})
                                          }}
                                        />
                                      </Item>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <Item>
                                        <TextField
                                          fullWidth
                                          className="top-label"
                                          id="outlined-basic"
                                          label="Barcode"
                                          variant="outlined"
                                          size="small"
                                          InputLabelProps={{ shrink: true }}
                                          placeholder="Enter UPC, GTIN etc (if applicable)"
                                          InputProps={{
                                            classes: {
                                              input: props.classes["input"],
                                            },
                                          }}
                                          value={singleVariant.barcode}
                                          onChange={(e) => {
                                            setSingleVariant({...singleVariant, barcode: e.target.value})
                                          }}
                                        />
                                      </Item>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <Item>
                                        <Typography
                                          variant="h1"
                                          component="h2"
                                          className="media-head mb-0"
                                        >
                                          Variant Size
                                        </Typography>
                                      </Item>
                                      <div className="dflex cstm-flex">
                                        <Item>
                                          <TextField
                                            fullWidth
                                            className="top-label text-center"
                                            id="outlined-basic"
                                            variant="outlined"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}
                                            placeholder="L"
                                            InputProps={{
                                              classes: {
                                                input: props.classes["input"],
                                              },
                                            }}
                                            value={singleVariant.size_length}
                                            onChange={(e) => {
                                              setSingleVariant({...singleVariant, size_length: e.target.value})
                                            }}
                                          />
                                        </Item>
                                        <span>&times;</span>
                                        <Item>
                                          <TextField
                                            fullWidth
                                            className="top-label text-center"
                                            id="outlined-basic"
                                            variant="outlined"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}
                                            placeholder="B"
                                            InputProps={{
                                              classes: {
                                                input: props.classes["input"],
                                              },
                                            }}
                                            value={singleVariant.size_width}
                                            onChange={(e) => {
                                              setSingleVariant({...singleVariant, size_width: e.target.value})
                                            }}
                                          />
                                        </Item>
                                        <span>&times;</span>
                                        <Item>
                                          <TextField
                                            fullWidth
                                            className="top-label text-center"
                                            id="outlined-basic"
                                            variant="outlined"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}
                                            placeholder="H"
                                            InputProps={{
                                              classes: {
                                                input: props.classes["input"],
                                              },
                                            }}
                                            value={singleVariant.size_height}
                                            onChange={(e) => {
                                              setSingleVariant({...singleVariant, size_height: e.target.value})
                                            }}
                                          />
                                        </Item>
                                      </div>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <Item>
                                        <TextField
                                          fullWidth
                                          className="top-label"
                                          id="outlined-basic"
                                          label="Variant Weight"
                                          variant="outlined"
                                          size="small"
                                          InputLabelProps={{ shrink: true }}
                                          placeholder="Enter variant weight"
                                          InputProps={{
                                            classes: {
                                              input: props.classes["input"],
                                            },
                                          }}
                                          value={singleVariant.weight}
                                          onChange={(e) => {
                                            setSingleVariant({...singleVariant, weight: e.target.value})
                                          }}
                                        />
                                      </Item>
                                    </Grid>
                                    <Grid item xs={1} className="dflex flex-end">
                                      <Item>
                                        <FormControl
                                          className="slct-input-fix hide-legend"
                                          fullWidth
                                          size="small"
                                        >
                                          <Select
                                            className="height-fix-28 slct-input-pos small-slct-cstm"
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={open}
                                            onClose={handleClose}
                                            onOpen={handleOpen}
                                            placeholder="oz"
                                            name="accessLevel"
                                            value={singleVariant.weight_unit}
                                            onChange={(e) => {
                                              setSingleVariant({...singleVariant, weight_unit: e.target.value})
                                            }}
                                          >
                                            <MenuItem value={10}>oz</MenuItem>
                                            <MenuItem value={20}>b</MenuItem>
                                            <MenuItem value={30}>c</MenuItem>
                                          </Select>
                                        </FormControl>
                                      </Item>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <Item>
                                        <TextField
                                          fullWidth
                                          className="top-label"
                                          id="outlined-basic"
                                          label="Price Wholesale"
                                          variant="outlined"
                                          size="small"
                                          InputLabelProps={{ shrink: true }}
                                          placeholder="Enter wholesale price"
                                          InputProps={{
                                            classes: {
                                              input: props.classes["input"],
                                            },
                                          }}
                                          value={singleVariant.wholesale_price}
                                          onChange={(e) => {
                                            setSingleVariant({...singleVariant, wholesale_price: e.target.value})
                                          }}
                                        />
                                      </Item>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <Item>
                                        <TextField
                                          fullWidth
                                          className="top-label"
                                          id="outlined-basic"
                                          label="Suggested Retail Price"
                                          variant="outlined"
                                          size="small"
                                          InputLabelProps={{ shrink: true }}
                                          placeholder="Enter suggested retail price"
                                          InputProps={{
                                            classes: {
                                              input: props.classes["input"],
                                            },
                                          }}
                                          value={singleVariant.suggested_wholesale}
                                          onChange={(e) => {
                                            setSingleVariant({...singleVariant, suggested_wholesale: e.target.value})
                                          }}
                                        />
                                      </Item>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <Item>
                                        <TextField
                                          fullWidth
                                          className="top-label"
                                          id="outlined-basic"
                                          label="Cost Per Item"
                                          variant="outlined"
                                          size="small"
                                          InputLabelProps={{ shrink: true }}
                                          placeholder="$0.00"
                                          InputProps={{
                                            classes: {
                                              input: props.classes["input"],
                                            },
                                          }}
                                          value={singleVariant.cpi}
                                          onChange={(e) => {
                                            setSingleVariant({...singleVariant, cpi: e.target.value})
                                          }}
                                        />
                                      </Item>
                                      <span className="cstm-note">
                                        * Customers won't see this
                                      </span>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <Item>
                                        <TextField
                                          fullWidth
                                          className="top-label"
                                          id="outlined-basic"
                                          label="Total Variant Quantity"
                                          variant="outlined"
                                          size="small"
                                          InputLabelProps={{ shrink: true }}
                                          placeholder="Enter variant quantity"
                                          InputProps={{
                                            classes: {
                                              input: props.classes["input"],
                                            },
                                          }}
                                          value={singleVariant.quantity}
                                          onChange={(e) => {
                                            setSingleVariant({...singleVariant, quantity: e.target.value})
                                          }}
                                        />
                                      </Item>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Item className="text-right no-bg">
                                      <Button
                                        variant="outlined"
                                        className="save-btn"
                                        // onClick={handleFirstForm}
                                      >
                                        Save
                                      </Button>
                                    </Item>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Item>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
              </Grid>
            </Box>
            {firstStepData.theme_name !== "Non-Custom (Stock Item)" ?
              <Box className="mt-30" id="customize-single-id">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Item className="no-bg">
                      <Item className="btn-customizer-var box-shadow">
                        <Grid container spacing={5} className="inside-btn">
                          <Grid item xs={2}></Grid>
                          {firstStepData.theme_name !== "Single Text Block" ?
                            <>
                              <Grid item xs={5} className="bg-fafafa other-image-mid">
                                <Typography
                                  variant="h1"
                                  component="h2"
                                  className="box-head underline"
                                >
                                  Custom Photo
                                </Typography>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Background
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Popover
                                    id="mouse-over-popover"
                                    sx={{
                                      pointerEvents: 'none',
                                    }}
                                    open={openPop}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'left',
                                    }}
                                    onClose={handlePopoverClose}
                                    disableRestoreFocus
                                  >
                                    <Typography sx={{ p: 1 }}>I use Popover.</Typography>
                                  </Popover>
                                  <div className="background-icons-select">
                                  <div className="dropzone-with-select">
                                  <Dropzone
                                    onDrop={(e) => handleDropBackgroundImages(e)}
                                    accept="image/*"
                                    minSize={1024}
                                    maxSize={3072000}
                                  >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: dropzoneClassOtherImage,
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                    </div>
                                  )}
                                  </Dropzone>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={customPhoto.bg_image}
                                    onChange={(e: any) => {
                                      setCustomPhoto({
                                        ...customPhoto,
                                        bg_image: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                      // setImageSrc(e.target.value)
                                    }}
                                    placeholder="Rustic-Frame-8x12-LS-Clipped…"
                                  >
                                    {selectedBgImages.map((name:any) => {
                                      return(
                                        <MenuItem value={name.bgName} onClick={() => setImageBgSrc(name.bgFile)}><ListItemText primary={name.bgName} /></MenuItem>
                                      )
                                    })}
                                  </Select>
                                  </div>
                                  <div className="background-icons">
                                    <img src={image3} />
                                    <img src={image4} />
                                  </div>
                                  </div>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Label
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="i.e. ‘Choose Your Photo’"
                                    value={customPhoto.label}
                                    onChange={(e: any) => {
                                      setCustomPhoto({
                                        ...customPhoto,
                                        label: e.target.value,
                                      })
                                      ctx.clearRect(0, 0, canvas.width, canvas.height);
                                      ctx.fillStyle = "black";
                                      ctx.textAlign = "center";
                                      ctx.font = "50px Arial";
                                      ctx.fillText(e.target.value, canvas.width / 2, canvas.height / 2);
                                    }}
                                  />
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Default Image
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <div className="dropzone-with-select">
                                  <Dropzone
                                    onDrop={(e) => handleDropDefaultImages(e)}
                                    accept="image/*"
                                    minSize={1024}
                                    maxSize={3072000}
                                  >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: dropzoneClassOtherImage,
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                    </div>
                                  )}
                                  </Dropzone>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    placeholder="Blank"
                                    value={customPhoto.default_image}
                                    onChange={(e: any) => {
                                      setCustomPhoto({
                                        ...customPhoto,
                                        default_image: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    {selectedDefaultImages.map((name:any) => {
                                      return(
                                        <MenuItem value={name.bgName} onClick={() => setImageSrc(name.bgFile)}><ListItemText primary={name.bgName} /></MenuItem>
                                      )
                                    })}
                                  </Select>
                                  </div>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Aspect Ratio
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <FormControl className="cstm-radio mb-15">
                                    <RadioGroup
                                      className="flexd-row"
                                      aria-labelledby="demo-controlled-radio-buttons-group"
                                      name="controlled-radio-buttons-group"
                                      value={customPhoto.aspect_ratio}
                                      onChange={(e: any) => {
                                        setCustomPhoto({
                                          ...customPhoto,
                                          aspect_ratio: e.target.value,
                                        })
                                      }}
                                    >
                                      <FormControlLabel
                                        value="yes"
                                        control={<Radio />}
                                        label="Yes"
                                      />
                                      <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        label="No"
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Min Upload Width (px)
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="i.e. 1080px"
                                    value={customPhoto.min_upload_width}
                                    onChange={(e: any) => {
                                      setCustomPhoto({
                                        ...customPhoto,
                                        min_upload_width: e.target.value,
                                      })
                                    }}
                                  />
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Min Upload Height (px)
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="i.e. 1080px"
                                    value={customPhoto.min_upload_height}
                                    onChange={(e: any) => {
                                      setCustomPhoto({
                                        ...customPhoto,
                                        min_upload_height: e.target.value,
                                      })
                                    }}
                                  />
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Min Resolution (ppi)
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={customPhoto.min_resolution}
                                    onChange={(e: any) => {
                                      setCustomPhoto({
                                        ...customPhoto,
                                        min_resolution: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Image Filters
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={customPhoto.image_filters}
                                    onChange={(e: any) => {
                                      setCustomPhoto({
                                        ...customPhoto,
                                        image_filters: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                    placeholder="Choose one or more"
                                  >
                                    <MenuItem value="full_color">Full Color (default)</MenuItem>
                                    <MenuItem value="vignette">Vignette</MenuItem>
                                    <MenuItem value="sapia">Sapia</MenuItem>
                                    <MenuItem value="juno">Juno</MenuItem>
                                    <MenuItem value="lark">Lark</MenuItem>
                                    <MenuItem value="mayfair">Mayfair</MenuItem>
                                    <MenuItem value="seirra">Seirra</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Preview Type
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={customPhoto.preview_type}
                                    onChange={(e: any) => {
                                      setCustomPhoto({
                                        ...customPhoto,
                                        preview_type: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    <MenuItem value="dynamic">Dynamic</MenuItem>
                                    <MenuItem value="static">Static</MenuItem>
                                    <MenuItem value="versatile">Versatile</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Instruction
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    multiline
                                    minRows="4"
                                    className="top-label custom-pht-select"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="Description (500 words or less)"
                                    value={customPhoto.instruction}
                                    onChange={(e: any) => {
                                      setCustomPhoto({
                                        ...customPhoto,
                                        instruction: e.target.value,
                                      })
                                    }}
                                  />
                                  *This will be displayed for the consumer
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Preview Button Text
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="i.e. ‘Live Preview'"
                                    value={customPhoto.preview_btn}
                                    onChange={(e: any) => {
                                      setCustomPhoto({
                                        ...customPhoto,
                                        preview_btn: e.target.value,
                                      })
                                    }}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={5} className="third-preview">
                                <div className="other-img-main dflex posrel prdct-canvas">       
                                  {/* <img src={image2} /> */}
                                  <img
                                    id="image2"
                                    src={imageSrc}
                                    className="product-img-add"
                                    alt="imagesrc"
                                  />
                                  <img
                                    id="image5"
                                    src={imageBgSrc}
                                    className="product-img"
                                    alt="imagesrc"
                                  />
                                  <h2>{customPhoto.label}</h2>
                                <Item className="text-center no-bg save-template">
                                  <Button
                                    variant="outlined"
                                    className="add-variant-btn"
                                    // onChange={handleOnChange}
                                    // onClick={handleAddVariant}
                                  >
                                    Save as Template
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    className="save-btn"
                                    onClick={() => handleSingleSaveCustomizer()}
                                  >
                                    Save
                                  </Button>
                                </Item>
                              </div>
                              </Grid>
                            </>
                            :
                            <>
                              <Grid item xs={5} className="bg-fafafa other-image-mid">
                                <Typography
                                  variant="h1"
                                  component="h2"
                                  className="box-head underline"
                                >
                                  Single Text
                                </Typography>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Background
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Popover
                                    id="mouse-over-popover"
                                    sx={{
                                      pointerEvents: 'none',
                                    }}
                                    open={openPop}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'left',
                                    }}
                                    onClose={handlePopoverClose}
                                    disableRestoreFocus
                                  >
                                    <Typography sx={{ p: 1 }}>I use Popover.</Typography>
                                  </Popover>
                                  <div className="background-icons-select">
                                  <div className="dropzone-with-select">
                                  <Dropzone
                                    onDrop={(e) => handleDropBackgroundImages(e)}
                                    accept="image/*"
                                    minSize={1024}
                                    maxSize={3072000}
                                  >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: dropzoneClassOtherImage,
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                    </div>
                                  )}
                                  </Dropzone>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="i.e. ‘Choose Your Photo’"
                                    value={singleText.bg_text}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        bg_text: e.target.value,
                                      })
                                      ctx.clearRect(0, 0, canvas.width, canvas.height);
                                      ctx.fillStyle = "black";
                                      ctx.textAlign = "center";
                                      ctx.font = "50px Arial";
                                      ctx.fillText(e.target.value, canvas.width / 2, canvas.height / 2);
                                    }}
                                  />
                                  </div>
                                  <div className="background-icons">
                                    <img src={image3} />
                                    <img src={image4} />
                                  </div>
                                  </div>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Label
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="i.e. ‘Choose Your Photo’"
                                    value={singleText.label}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        label: e.target.value,
                                      })
                                      ctx.clearRect(0, 0, canvas.width, canvas.height);
                                      ctx.fillStyle = "black";
                                      ctx.textAlign = "center";
                                      ctx.font = "50px Arial";
                                      ctx.fillText(e.target.value, canvas.width / 2, canvas.height / 2);
                                    }}
                                  />
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Upload/Select a Font(s)
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <div className="dropzone-with-select">
                                  <Dropzone
                                    onDrop={(e) => handleDropDefaultImages(e)}
                                    accept="image/*"
                                    minSize={1024}
                                    maxSize={3072000}
                                  >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: dropzoneClassOtherImage,
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                    </div>
                                  )}
                                  </Dropzone>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    placeholder="Blank"
                                    value={singleText.font}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        font: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    {selectedDefaultImages.map((name:any) => {
                                      return(
                                        <MenuItem value={name.bgName} onClick={() => setImageSrc(name.bgFile)}><ListItemText primary={name.bgName} /></MenuItem>
                                      )
                                    })}
                                  </Select>
                                  </div>
                                  <FormControlLabel className="single-txt-radio" value="female" control={<Radio />} label="Allow customer to change font?" />
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Default Text
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="i.e. Your Name"
                                    value={singleText.default_text}
                                    onChange={(e: any) =>
                                      setSingleText({
                                        ...singleText,
                                        default_text: e.target.value,
                                      })
                                    }
                                  />
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Font Size
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="75 pt"
                                    value={singleText.font_size}
                                    onChange={(e: any) =>
                                      setSingleText({
                                        ...singleText,
                                        font_size: e.target.value,
                                      })
                                    }
                                  />
                                  <FormControlLabel className="single-txt-radio" value="female" control={<Radio />} label="Allow customer to change font size?" />
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Font Color
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="i.e. Your Name"
                                    value={singleText.font_color}
                                    onChange={(e: any) =>
                                      setSingleText({
                                        ...singleText,
                                        font_color: e.target.value,
                                      })
                                    }
                                  />
                                  <FormControlLabel className="single-txt-radio" value="female" control={<Radio />} label="Allow customer to change font size?" />
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Font Case
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={singleText.font_case}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        font_case: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                    placeholder="Choose one or more"
                                  >
                                    <MenuItem value="uppercase">Uppercase</MenuItem>
                                    <MenuItem value="lowercase">Lowercase</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Text Alingment
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={singleText.text_alingment}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        text_alingment: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    <MenuItem value="center">Center</MenuItem>
                                    <MenuItem value="left">Left</MenuItem>
                                    <MenuItem value="right">Right</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Text Rotation
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={singleText.text_rotation}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        text_rotation: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    <MenuItem value="0">0</MenuItem>
                                    <MenuItem value="90">90</MenuItem>
                                    <MenuItem value="180">180</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Text Shape
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={singleText.text_shape}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        text_shape: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    <MenuItem value="standard">Standard</MenuItem>
                                    <MenuItem value="custom">Custom</MenuItem>
                                    <MenuItem value="right">Right</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Text Effect
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={singleText.text_effect}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        text_effect: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    <MenuItem value="none">None</MenuItem>
                                    <MenuItem value="90">90</MenuItem>
                                    <MenuItem value="180">180</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Effect Details
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={singleText.effect_details}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        effect_details: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    <MenuItem value="none">None</MenuItem>
                                    <MenuItem value="custom">Custom</MenuItem>
                                    <MenuItem value="right">Right</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Character Type
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={singleText.character_type}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        character_type: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    <MenuItem value="alphanumeric">Alphanumeric</MenuItem>
                                    <MenuItem value="90">90</MenuItem>
                                    <MenuItem value="180">180</MenuItem>
                                  </Select>
                                </Item>
                              </Grid>
                              <Grid item xs={5}>
                                <div className="other-img-main dflex posrel prdct-canvas">       
                                  <img
                                    id="image2"
                                    src={image6}
                                    className="product-img-add"
                                    alt="imagesrc"
                                  />
                                  <canvas id="myCanvas" width="410" height="433">
                                    Your browser does not support the HTML5 canvas tag.
                                  </canvas>
                                <Item className="text-center no-bg save-template">
                                  <Button
                                    variant="outlined"
                                    className="add-variant-btn"
                                    // onClick={handleAddVariant}
                                  >
                                    Save as Template
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    className="save-btn"
                                    // onClick={handleFirstForm}
                                  >
                                    Save
                                  </Button>
                                </Item>
                              </div>
                              </Grid>
                            </>
                          }
                        </Grid>
                      </Item>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            : null}
          </>
          :
          <>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Item className="no-bg nobx">
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Item className="box-shadow no-bg-pd">
                          {theArray.map((entry: any, index: any) => {
                            getIndex = index;
                            getEntry = entry;
                            return(
                            <Accordion expanded={expanded === index} onChange={handleAccordionExpand(index)} onClick={() => handleClickAccordion(entry, index)}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                {index === 0 ?
                                  <>
                                    {!selectBox[index][`customize_image`] ?
                                      <img src={imageWbg} />
                                    : 
                                      <div className="other-img-main dflex posrel prdct-canvas prdct-accor"> 
                                        <img
                                          id="image2"
                                          src={selectBox[index][`image_src_done`]}
                                          className="product-img-add"
                                          alt="imagesrc"
                                        />
                                        <img
                                          id="image5"
                                          src={selectBox[index][`image_bg_src_done`]}
                                          className="product-img"
                                          alt="imagebgsrc"
                                        />
                                      </div>
                                    }
                                  </>
                                :null}
                                {index !== 0 ?
                                  <>
                                    {!selectBox[index][`customize_image`] ?
                                      <img src={image1} />
                                    : 
                                      <div className="other-img-main dflex posrel prdct-canvas prdct-accor"> 
                                        <img
                                          id="image2"
                                          src={selectBox[index][`image_src_done`]}
                                          className="product-img-add"
                                          alt="imagesrc"
                                        />
                                        <img
                                          id="image5"
                                          src={selectBox[index][`image_bg_src_done`]}
                                          className="product-img"
                                          alt="imagebgsrc"
                                        />
                                      </div>
                                    }
                                  </>
                                :null}
                                <Typography className="variant-num">Variant {entry}</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Grid container spacing={3}>
                                  <Grid item xs={2}>
                                    <Item className="variant-img-prdct">
                                      {/* <input value={selectBox[index][`image`]} type="file" className="variant-img-new" /> */}
                                      {index === 0 ?
                                        <>
                                          {!selectBox[index][`customize_image`] ?
                                            <img src={imageWbg} />
                                          : 
                                            <div className="other-img-main dflex posrel prdct-canvas prdct-accor"> 
                                              <img
                                                id="image2"
                                                src={selectBox[index][`image_src_done`]}
                                                className="product-img-add"
                                                alt="imagesrc"
                                              />
                                              <img
                                                id="image5"
                                                src={selectBox[index][`image_bg_src_done`]}
                                                className="product-img"
                                                alt="imagebgsrc"
                                              />
                                              <h2>{selectBox[index][`label_preview_done`]}</h2>
                                            </div>
                                          }
                                        </>
                                      :null}
                                      {index !== 0 ?
                                        <>
                                          {!selectBox[index][`customize_image`] ?
                                            <img src={image1} />
                                          : 
                                            <div className="other-img-main dflex posrel prdct-canvas prdct-accor"> 
                                              <img
                                                id="image2"
                                                src={selectBox[index][`image_src_done`]}
                                                className="product-img-add"
                                                alt="imagesrc"
                                              />
                                              <img
                                                id="image5"
                                                src={selectBox[index][`image_bg_src_done`]}
                                                className="product-img"
                                                alt="imagebgsrc"
                                              />
                                              <h2>{selectBox[index][`label_preview_done`]}</h2>
                                            </div>
                                          }
                                        </>
                                      :null}
                                      <Link className="blue-link" href="#customize-id">Change Image</Link>
                                    </Item>
                                  </Grid>
                                  <Grid item xs={10}>
                                    <Grid container spacing={2}>
                                      <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                          <Grid item xs={4}>
                                            <Item>
                                              <TextField
                                                fullWidth
                                                className="top-label"
                                                id="outlined-basic"
                                                label="Variant Name"
                                                variant="outlined"
                                                size="small"
                                                value={selectBox[index][`name`]}
                                                onChange={(event) =>
                                                  handlerVariantName(selectBox[index], entry, event)
                                                }
                                                InputLabelProps={{ shrink: true }}
                                                placeholder="Enter variant name"
                                                InputProps={{
                                                  classes: {
                                                    input: props.classes["input"],
                                                  },
                                                }}
                                              />
                                            </Item>
                                          </Grid>
                                          <Grid item xs={4}>
                                            <Item>
                                              <TextField
                                                fullWidth
                                                className="top-label"
                                                id="outlined-basic"
                                                label="Size/Color/Style/Material"
                                                variant="outlined"
                                                size="small"
                                                value={selectBox[index][`material`]}
                                                onChange={(event) =>
                                                  handlerVariantMaterial(index, entry, event)
                                                }
                                                InputLabelProps={{ shrink: true }}
                                                placeholder="Enter here"
                                                InputProps={{
                                                  classes: {
                                                    input: props.classes["input"],
                                                  },
                                                }}
                                              />
                                            </Item>
                                          </Grid>
                                          <Grid item xs={4}>
                                            <Item>
                                              <TextField
                                                fullWidth
                                                className="top-label"
                                                id="outlined-basic"
                                                label="SKU"
                                                variant="outlined"
                                                size="small"
                                                value={selectBox[index][`sku`]}
                                                onChange={(event) =>
                                                  handlerVariantSku(index, entry, event)
                                                }
                                                InputLabelProps={{ shrink: true }}
                                                placeholder="Enter SKU here"
                                                InputProps={{
                                                  classes: {
                                                    input: props.classes["input"],
                                                  },
                                                }}
                                              />
                                            </Item>
                                          </Grid>
                                          <Grid item xs={4}>
                                            <Item>
                                              <TextField
                                                fullWidth
                                                className="top-label"
                                                id="outlined-basic"
                                                label="Barcode"
                                                variant="outlined"
                                                size="small"
                                                value={selectBox[index][`barcode`]}
                                                onChange={(event) =>
                                                  handlerVariantBarcode(index, entry, event)
                                                }
                                                InputLabelProps={{ shrink: true }}
                                                placeholder="Enter UPC, GTIN etc (if applicable)"
                                                InputProps={{
                                                  classes: {
                                                    input: props.classes["input"],
                                                  },
                                                }}
                                              />
                                            </Item>
                                          </Grid>
                                          <Grid item xs={4}>
                                            <Item>
                                              <Typography
                                                variant="h1"
                                                component="h2"
                                                className="media-head mb-0"
                                              >
                                                Variant Size
                                              </Typography>
                                            </Item>
                                            <div className="dflex cstm-flex">
                                              <Item>
                                                <TextField
                                                  fullWidth
                                                  className="top-label text-center"
                                                  id="outlined-basic"
                                                  variant="outlined"
                                                  size="small"
                                                  value={selectBox[index][`size_length`]}
                                                  onChange={(event) =>
                                                    handlerVariantSizeLength(index, entry, event)
                                                  }
                                                  InputLabelProps={{ shrink: true }}
                                                  placeholder="L"
                                                  InputProps={{
                                                    classes: {
                                                      input: props.classes["input"],
                                                    },
                                                  }}
                                                />
                                              </Item>
                                              <span>&times;</span>
                                              <Item>
                                                <TextField
                                                  fullWidth
                                                  className="top-label text-center"
                                                  id="outlined-basic"
                                                  variant="outlined"
                                                  size="small"
                                                  value={selectBox[index][`size_width`]}
                                                  onChange={(event) =>
                                                    handlerVariantSizeWidth(index, entry, event)
                                                  }
                                                  InputLabelProps={{ shrink: true }}
                                                  placeholder="B"
                                                  InputProps={{
                                                    classes: {
                                                      input: props.classes["input"],
                                                    },
                                                  }}
                                                />
                                              </Item>
                                              <span>&times;</span>
                                              <Item>
                                                <TextField
                                                  fullWidth
                                                  className="top-label text-center"
                                                  id="outlined-basic"
                                                  variant="outlined"
                                                  size="small"
                                                  value={selectBox[index][`size_height`]}
                                                  onChange={(event) =>
                                                    handlerVariantSizeHeight(index, entry, event)
                                                  }
                                                  InputLabelProps={{ shrink: true }}
                                                  placeholder="H"
                                                  InputProps={{
                                                    classes: {
                                                      input: props.classes["input"],
                                                    },
                                                  }}
                                                />
                                              </Item>
                                            </div>
                                          </Grid>
                                          <Grid item xs={3}>
                                            <Item>
                                              <TextField
                                                fullWidth
                                                className="top-label"
                                                id="outlined-basic"
                                                label="Variant Weight"
                                                variant="outlined"
                                                size="small"
                                                value={selectBox[index][`weight`]}
                                                onChange={(event) =>
                                                  handlerVariantWeight(index, entry, event)
                                                }
                                                InputLabelProps={{ shrink: true }}
                                                placeholder="Enter variant weight"
                                                InputProps={{
                                                  classes: {
                                                    input: props.classes["input"],
                                                  },
                                                }}
                                              />
                                            </Item>
                                          </Grid>
                                          <Grid item xs={1} className="dflex flex-end">
                                            <Item>
                                              <FormControl
                                                className="slct-input-fix hide-legend"
                                                fullWidth
                                                size="small"
                                              >
                                                <Select
                                                  className="height-fix-28 slct-input-pos small-slct-cstm"
                                                  labelId="demo-controlled-open-select-label"
                                                  id="demo-controlled-open-select"
                                                  value={selectBox[index][`weight_unit`]}
                                                  onChange={(event) =>
                                                    handlerVariantWeightUnit(index, entry, event)
                                                  }
                                                  placeholder="oz"
                                                >
                                                  <MenuItem value={10}>oz</MenuItem>
                                                  <MenuItem value={20}>b</MenuItem>
                                                  <MenuItem value={30}>c</MenuItem>
                                                </Select>
                                              </FormControl>
                                            </Item>
                                          </Grid>
                                          <Grid item xs={3}>
                                            <Item>
                                              <TextField
                                                fullWidth
                                                className="top-label"
                                                id="outlined-basic"
                                                label="Price Wholesale"
                                                variant="outlined"
                                                size="small"
                                                value={selectBox[index][`wholesale_price`]}
                                                onChange={(event) =>
                                                  handlerVariantWholesalePrice(index, entry, event)
                                                }
                                                InputLabelProps={{ shrink: true }}
                                                placeholder="Enter wholesale price"
                                                InputProps={{
                                                  classes: {
                                                    input: props.classes["input"],
                                                  },
                                                }}
                                              />
                                            </Item>
                                          </Grid>
                                          <Grid item xs={3}>
                                            <Item>
                                              <TextField
                                                fullWidth
                                                className="top-label"
                                                id="outlined-basic"
                                                label="Suggested Retail Price"
                                                variant="outlined"
                                                size="small"
                                                value={selectBox[index][`suggested_price`]}
                                                onChange={(event) =>
                                                  handlerVariantSuggestedPrice(index, entry, event)
                                                }
                                                InputLabelProps={{ shrink: true }}
                                                placeholder="Enter suggested retail price"
                                                InputProps={{
                                                  classes: {
                                                    input: props.classes["input"],
                                                  },
                                                }}
                                              />
                                            </Item>
                                          </Grid>
                                          <Grid item xs={3}>
                                            <Item>
                                              <TextField
                                                fullWidth
                                                className="top-label"
                                                id="outlined-basic"
                                                label="Cost Per Item"
                                                variant="outlined"
                                                size="small"
                                                value={selectBox[index][`cpi`]}
                                                onChange={(event) =>
                                                  handlerVariantCpi(index, entry, event)
                                                }
                                                InputLabelProps={{ shrink: true }}
                                                placeholder="$0.00"
                                                InputProps={{
                                                  classes: {
                                                    input: props.classes["input"],
                                                  },
                                                }}
                                              />
                                            </Item>
                                            <span className="cstm-note">
                                              * Customers won't see this
                                            </span>
                                          </Grid>
                                          <Grid item xs={3}>
                                            <Item>
                                              <TextField
                                                fullWidth
                                                className="top-label"
                                                id="outlined-basic"
                                                label="Total Variant Quantity"
                                                variant="outlined"
                                                size="small"
                                                value={selectBox[index][`quantity`]}
                                                onChange={(event) =>
                                                  handlerVariantQuantity(index, entry, event)
                                                }
                                                InputLabelProps={{ shrink: true }}
                                                placeholder="Enter variant quantity"
                                                InputProps={{
                                                  classes: {
                                                    input: props.classes["input"],
                                                  },
                                                }}
                                              />
                                            </Item>
                                          </Grid>
                                        </Grid>
                                        <Grid item xs={12} className="two-btn-variant">
                                          {selectBox[index][`duplicate_variant`] === true ?
                                            <Button variant="outlined" className="add-variant-btn" onClick={() => handleDuplicateVariant(entry, index)}>Duplicate</Button>
                                          : null}
                                          <Button variant="outlined" className="save-btn" onClick={(event) => handleSaveVariant(index, entry, event)}>Save</Button>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </AccordionDetails>
                            </Accordion>
                            )
                          })}
                        </Item>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
              </Grid>
            </Box>
            {firstStepData.theme_name !== "Non-Custom (Stock Item)" ?
            <>
              <Box className="mt-30" id="customize-id">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Item className="no-bg">
                      <Item className="btn-customizer-var box-shadow">
                        <Grid container spacing={5}>
                          <Grid item xs={2}></Grid>
                          {firstStepData.theme_name !== "Single Text Block" ?
                            <>
                              <Grid item xs={5} className="bg-fafafa other-image-mid">
                                <Typography
                                  variant="h1"
                                  component="h2"
                                  className="box-head underline"
                                >
                                  Custom Photo
                                </Typography>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Background
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Popover
                                    id="mouse-over-popover"
                                    sx={{
                                      pointerEvents: 'none',
                                    }}
                                    open={openPop}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'left',
                                    }}
                                    onClose={handlePopoverClose}
                                    disableRestoreFocus
                                  >
                                    <Typography sx={{ p: 1 }}>I use Popover.{indexState} {entryState}</Typography>
                                  </Popover>
                                  <div className="background-icons-select">
                                  <div className="dropzone-with-select">
                                  <Dropzone
                                    onDrop={(e) => handleMultipleDropBackgroundImages(indexState, entryState, e)}
                                    accept="image/*"
                                    minSize={1024}
                                    maxSize={3072000}
                                  >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: dropzoneClassOtherImage,
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                    </div>
                                  )}
                                  </Dropzone>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectBox[indexState][`bg_image`]}
                                    onChange={(e: any) => {
                                      handlerBgImage(indexState, entryState, e)
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                    placeholder="Rustic-Frame-8x12-LS-Clipped…"
                                  >
                                    {selectBox[indexState][`bg_selected_images`].map((name:any) => {
                                      return(
                                        <MenuItem value={name.bgName} onClick={() => {
                                          let newArr = [...selectBox];
                                          selectBox[indexState]["image_bg_src"] = name.bgFile;
                                          setSelectBox(newArr);
                                          selectBox[indexState]["image_bg_src"] = name.bgFile;
                                        }}><ListItemText primary={name.bgName} /></MenuItem>
                                      )
                                    })}
                                  </Select>
                                  </div>
                                  <div className="background-icons">
                                    <img src={image3} />
                                    <img src={image4} />
                                  </div>
                                  </div>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Label
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="i.e. ‘Choose Your Photo’"
                                    value={selectBox[indexState][`label`]}
                                    onChange={(e: any) => {
                                      handlerLabel(indexState, entryState, e)
                                      // ctx.clearRect(0, 0, canvas.width, canvas.height);
                                      // ctx.fillStyle = "black";
                                      // ctx.textAlign = "center";
                                      // ctx.font = "50px Arial";
                                      // ctx.fillText(e.target.value, canvas.width / 2, canvas.height / 2);
                                    }}
                                  />
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Default Image
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <div className="dropzone-with-select">
                                  <Dropzone
                                    onDrop={(e) => handleMultipleDropDefaultImages(indexState, entryState, e)}
                                    accept="image/*"
                                    minSize={1024}
                                    maxSize={3072000}
                                  >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: dropzoneClassOtherImage,
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                    </div>
                                  )}
                                  </Dropzone>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    placeholder="Blank"
                                    value={selectBox[indexState][`default_image`]}
                                    onChange={(e: any) => {
                                      handlerDefaultImage(indexState, entryState, e)
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    {selectBox[indexState][`bg_default_images`].map((name:any) => {
                                      return(
                                        <MenuItem value={name.bgName} onClick={() => {
                                          let newArr = [...selectBox];
                                          selectBox[indexState]["image_src"] = name.bgFile;
                                          setSelectBox(newArr);
                                          selectBox[indexState]["image_src"] = name.bgFile;
                                        }}><ListItemText primary={name.bgName} /></MenuItem>
                                      )
                                    })}
                                  </Select>
                                  </div>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Aspect Ratio
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <FormControl className="cstm-radio mb-15">
                                    <RadioGroup
                                      className="flexd-row"
                                      aria-labelledby="demo-controlled-radio-buttons-group"
                                      name="controlled-radio-buttons-group"
                                      value={selectBox[indexState][`aspect_ratio`]}
                                      onChange={(e: any) => handlerAspectRatio(indexState, entryState, e)}
                                    >
                                      <FormControlLabel
                                        value="yes"
                                        control={<Radio />}
                                        label="Yes"
                                      />
                                      <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        label="No"
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Min Upload Width (px)
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="i.e. 1080px"
                                    value={selectBox[indexState][`min_upload_width`]}
                                    onChange={(e: any) => handlerMinUploadWidth(indexState, entryState, e)}
                                  />
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Min Upload Height (px)
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="i.e. 1080px"
                                    value={selectBox[indexState][`min_upload_height`]}
                                    onChange={(e: any) => handlerMinUploadHeight(indexState, entryState, e)}
                                  />
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Min Resolution (ppi)
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectBox[indexState][`min_resolution`]}
                                    onChange={(e: any) => {
                                      handlerMinResolution(indexState, entryState, e)
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Image Filters
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectBox[indexState][`image_filters`]}
                                    onChange={(e: any) => {
                                      handlerImageFilters(indexState, entryState, e)
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                    placeholder="Choose one or more"
                                  >
                                    <MenuItem value="full_color">Full Color (default)</MenuItem>
                                    <MenuItem value="vignette">Vignette</MenuItem>
                                    <MenuItem value="sapia">Sapia</MenuItem>
                                    <MenuItem value="juno">Juno</MenuItem>
                                    <MenuItem value="lark">Lark</MenuItem>
                                    <MenuItem value="mayfair">Mayfair</MenuItem>
                                    <MenuItem value="seirra">Seirra</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Preview Type
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectBox[indexState][`preview_type`]}
                                    onChange={(e: any) => {
                                      handlerPreviewType(indexState, entryState, e)
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    <MenuItem value="dynamic">Dynamic</MenuItem>
                                    <MenuItem value="static">Static</MenuItem>
                                    <MenuItem value="versatile">Versatile</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Instruction
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    multiline
                                    minRows="4"
                                    className="top-label custom-pht-select"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="Description (500 words or less)"
                                    value={selectBox[indexState][`instruction`]}
                                    onChange={(e: any) => handlerInstruction(indexState, entryState, e)}
                                  />
                                  *This will be displayed for the consumer
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Preview Button Text
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="i.e. ‘Live Preview'"
                                    value={selectBox[indexState][`preview_btn_txt`]}
                                    onChange={(e: any) => handlerPreviewBtnTxt(indexState, entryState, e)}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={5}>
                                <div className="other-img-main dflex posrel prdct-canvas">
                                  <img
                                    id="image2"
                                    src={selectBox[indexState][`image_src`]}
                                    className="product-img-add"
                                    alt="imagesrc"
                                  />
                                  <img
                                    id="image5"
                                    src={selectBox[indexState][`image_bg_src`]}
                                    className="product-img"
                                    alt="imagebgsrc"
                                  />
                                  <h2>{selectBox[indexState][`label_preview`]}</h2>
                                <Item className="text-center no-bg save-template">
                                  <Button
                                    variant="outlined"
                                    className="add-variant-btn"
                                  >
                                    Save as Template
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    className="save-btn"
                                    onClick={(e) => handleSaveCustomizer(indexState, entryState, e)}
                                  >
                                    Save
                                  </Button>
                                </Item>
                              </div>
                              </Grid>
                            </>
                            :
                            <>
                              <Grid item xs={5} className="bg-fafafa other-image-mid">
                                <Typography
                                  variant="h1"
                                  component="h2"
                                  className="box-head underline"
                                >
                                  Single Text
                                </Typography>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Background
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Popover
                                    id="mouse-over-popover"
                                    sx={{
                                      pointerEvents: 'none',
                                    }}
                                    open={openPop}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'left',
                                    }}
                                    onClose={handlePopoverClose}
                                    disableRestoreFocus
                                  >
                                    <Typography sx={{ p: 1 }}>I use Popover.</Typography>
                                  </Popover>
                                  <div className="background-icons-select">
                                  <div className="dropzone-with-select">
                                  <Dropzone
                                    onDrop={(e) => handleDropBackgroundImages(e)}
                                    accept="image/*"
                                    minSize={1024}
                                    maxSize={3072000}
                                  >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: dropzoneClassOtherImage,
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                    </div>
                                  )}
                                  </Dropzone>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="i.e. ‘Choose Your Photo’"
                                    value={singleText.bg_text}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        bg_text: e.target.value,
                                      })
                                      ctx.clearRect(0, 0, canvas.width, canvas.height);
                                      ctx.fillStyle = "black";
                                      ctx.textAlign = "center";
                                      ctx.font = "50px Arial";
                                      ctx.fillText(e.target.value, canvas.width / 2, canvas.height / 2);
                                    }}
                                  />
                                  </div>
                                  <div className="background-icons">
                                    <img src={image3} />
                                    <img src={image4} />
                                  </div>
                                  </div>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Label
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="i.e. ‘Choose Your Photo’"
                                    value={singleText.label}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        label: e.target.value,
                                      })
                                      ctx.clearRect(0, 0, canvas.width, canvas.height);
                                      ctx.fillStyle = "black";
                                      ctx.textAlign = "center";
                                      ctx.font = "50px Arial";
                                      ctx.fillText(e.target.value, canvas.width / 2, canvas.height / 2);
                                    }}
                                  />
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Upload/Select a Font(s)
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <div className="dropzone-with-select">
                                  <Dropzone
                                    onDrop={(e) => handleDropDefaultImages(e)}
                                    accept="image/*"
                                    minSize={1024}
                                    maxSize={3072000}
                                  >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: dropzoneClassOtherImage,
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                    </div>
                                  )}
                                  </Dropzone>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    placeholder="Blank"
                                    value={singleText.font}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        font: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    {selectedDefaultImages.map((name:any) => {
                                      return(
                                        <MenuItem value={name.bgName} onClick={() => setImageSrc(name.bgFile)}><ListItemText primary={name.bgName} /></MenuItem>
                                      )
                                    })}
                                  </Select>
                                  </div>
                                  <FormControlLabel className="single-txt-radio" value="female" control={<Radio />} label="Allow customer to change font?" />
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Default Text
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="i.e. Your Name"
                                    value={singleText.default_text}
                                    onChange={(e: any) =>
                                      setSingleText({
                                        ...singleText,
                                        default_text: e.target.value,
                                      })
                                    }
                                  />
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Font Size
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="75 pt"
                                    value={singleText.font_size}
                                    onChange={(e: any) =>
                                      setSingleText({
                                        ...singleText,
                                        font_size: e.target.value,
                                      })
                                    }
                                  />
                                  <FormControlLabel className="single-txt-radio" value="female" control={<Radio />} label="Allow customer to change font size?" />
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Font Color
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <TextField
                                    fullWidth
                                    className="top-label other-img-input"
                                    id="outlined-basic"
                                    size="medium"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    placeholder="i.e. Your Name"
                                    value={singleText.font_color}
                                    onChange={(e: any) =>
                                      setSingleText({
                                        ...singleText,
                                        font_color: e.target.value,
                                      })
                                    }
                                  />
                                  <FormControlLabel className="single-txt-radio" value="female" control={<Radio />} label="Allow customer to change font size?" />
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Font Case
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={singleText.font_case}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        font_case: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                    placeholder="Choose one or more"
                                  >
                                    <MenuItem value="uppercase">Uppercase</MenuItem>
                                    <MenuItem value="lowercase">Lowercase</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Text Alingment
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={singleText.text_alingment}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        text_alingment: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    <MenuItem value="center">Center</MenuItem>
                                    <MenuItem value="left">Left</MenuItem>
                                    <MenuItem value="right">Right</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Text Rotation
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={singleText.text_rotation}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        text_rotation: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    <MenuItem value="0">0</MenuItem>
                                    <MenuItem value="90">90</MenuItem>
                                    <MenuItem value="180">180</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Text Shape
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={singleText.text_shape}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        text_shape: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    <MenuItem value="standard">Standard</MenuItem>
                                    <MenuItem value="custom">Custom</MenuItem>
                                    <MenuItem value="right">Right</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Text Effect
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={singleText.text_effect}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        text_effect: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    <MenuItem value="none">None</MenuItem>
                                    <MenuItem value="90">90</MenuItem>
                                    <MenuItem value="180">180</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Effect Details
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={singleText.effect_details}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        effect_details: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    <MenuItem value="none">None</MenuItem>
                                    <MenuItem value="custom">Custom</MenuItem>
                                    <MenuItem value="right">Right</MenuItem>
                                  </Select>
                                </Item>
                                <Item>
                                  <div className="popup-wrap dflex">
                                  <Typography
                                    variant="h1"
                                    component="h2"
                                    className="box-head"
                                  >
                                    Character Type
                                  </Typography>
                                  <Typography
                                    aria-owns={openPop ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <HelpOutlineIcon className="help-icon" />
                                  </Typography>
                                  </div>
                                  <Select
                                    fullWidth
                                    className={customPhtSelect}
                                    size="medium"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={singleText.character_type}
                                    onChange={(e: any) => {
                                      setSingleText({
                                        ...singleText,
                                        character_type: e.target.value,
                                      })
                                      setCustomPhtSelect(customPhtSelect + " cstm-select_wrap")
                                    }}
                                  >
                                    <MenuItem value="alphanumeric">Alphanumeric</MenuItem>
                                    <MenuItem value="90">90</MenuItem>
                                    <MenuItem value="180">180</MenuItem>
                                  </Select>
                                </Item>
                              </Grid>
                              <Grid item xs={5}>
                                <div className="other-img-main dflex posrel prdct-canvas">       
                                  <img
                                    id="image2"
                                    src={image6}
                                    className="product-img-add"
                                    alt="imagesrc"
                                  />
                                  <br/><br/><br/>
                                <Item className="text-center no-bg save-template">
                                  <Button
                                    variant="outlined"
                                    className="add-variant-btn"
                                  >
                                    Save as Template
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    className="save-btn"
                                    onClick={(e) => handleSaveCustomizer(indexState, entryState, e)}
                                  >
                                    Save
                                  </Button>
                                </Item>
                              </div>
                              </Grid>
                            </>
                          }
                        </Grid>
                      </Item>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </>
            : null}
          </>
        }
        </>
      ) : (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item className="no-bg">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Item className="pd-30 box-shadow">
                      <Typography
                        variant="h1"
                        component="h2"
                        className="box-head"
                      >
                        Variants
                      </Typography>
                      <Item className="text-left">
                        <FormControl className="cstm-radio mt-10">
                          <FormControlLabel
                            value="male"
                            control={
                              <Checkbox
                                checked={customProduct}
                                onChange={handleCustomProduct}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            }
                            label="This Product is Customizable"
                          />
                        </FormControl>
                      </Item>
                      {customProduct === true ? (
                        <Item>
                          <TextField
                            error={errorTextCustom !== "" ? true : false}
                            fullWidth
                            className="top-label mt-10"
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            placeholder="If Yes, add the custom product characters count"
                            InputProps={{
                              classes: { input: props.classes["input"] },
                            }}
                            value={customProductCount}
                            onChange={(e: any) =>
                              setCustomProductCount(e.target.value)
                            }
                          />
                        </Item>
                      ) : null}
                      {errorTextCustom !== "" ? (
                        <Alert severity="error">{errorTextCustom}</Alert>
                      ) : null}
                      <Item>
                        <TextField
                          fullWidth
                          error={errorTextSize !== "" ? true : false}
                          className="top-label"
                          id="outlined-basic"
                          label="Size"
                          variant="outlined"
                          margin="normal"
                          size="small"
                          InputLabelProps={{ shrink: true }}
                          placeholder="WxHxL"
                          InputProps={{
                            classes: { input: props.classes["input"] },
                          }}
                          value={thirdStepData.size}
                          onChange={(e) =>
                            setThirdStepData({
                              ...thirdStepData,
                              size: e.target.value,
                            })
                          }
                        />
                      </Item>

                      {errorTextSize !== "" ? (
                        <Alert severity="error">{errorTextSize}</Alert>
                      ) : null}
                      <Item className="mt-5 pb-0">
                        <label>Color</label>
                      </Item>
                      <Item>
                        <FormControl
                          error={errorTextColor !== "" ? true : false}
                          fullWidth
                          className="fixing input-hide"
                          size="small"
                        >
                          <InputLabel id="demo-simple-select-label">
                            Select a Color
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="select-fix"
                            defaultValue="Red"
                            value={thirdStepData.color}
                            onChange={handleColor}
                          >
                            <MenuItem value="Blue">Blue</MenuItem>
                            <MenuItem value="Green">Green</MenuItem>
                            <MenuItem value="Red">Red</MenuItem>
                          </Select>
                        </FormControl>
                      </Item>
                      {errorTextColor !== "" ? (
                        <Alert severity="error">{errorTextColor}</Alert>
                      ) : null}
                      <Item className="mt-5 pb-0">
                        <label>Material</label>
                      </Item>
                      <Item>
                        <FormControl
                          error={errorTextMaterial !== "" ? true : false}
                          fullWidth
                          className="fixing input-hide"
                          size="small"
                        >
                          <InputLabel id="demo-simple-select-label">
                            Select a Material
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="select-fix"
                            defaultValue="Solid"
                            value={thirdStepData.material}
                            onChange={handleMaterial}
                          >
                            <MenuItem value="Gas">Gas</MenuItem>
                            <MenuItem value="Liquid">Liquid</MenuItem>
                            <MenuItem value="Solid">Solid</MenuItem>
                          </Select>
                        </FormControl>
                      </Item>
                      {errorTextMaterial !== "" ? (
                        <Alert severity="error">{errorTextMaterial}</Alert>
                      ) : null}
                    </Item>
                  </Grid>
                </Grid>
              </Item>
            </Grid>

            <Grid item xs={6} className="fullheight-wrap ">
              <Item className="no-bg">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Item className="pd-30 box-shadow fullheight">
                      <Typography
                        variant="body1"
                        component="span"
                        className="red-text"
                      >
                        Optional
                      </Typography>
                      <Typography
                        variant="h1"
                        component="h2"
                        className="box-head  mt-10 mb-10"
                      >
                        Make Your Products More Visible
                      </Typography>
                      <Item className="mt-5 pb-0">
                        <label>What gender is the product for?</label>
                      </Item>
                      <Item className="mb-10">
                        <FormControl
                          fullWidth
                          className="fixing input-hide"
                          size="small"
                        >
                          <InputLabel id="demo-simple-select-label">
                            Select a Gender
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="select-fix"
                            defaultValue="Male"
                            value={thirdStepData.gender}
                            onChange={handleGender}
                          >
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                          </Select>
                        </FormControl>
                      </Item>
                      <Item className="mt-5 pb-0">
                        <label>What condition is this product?</label>
                      </Item>
                      <Item>
                        <FormControl
                          fullWidth
                          className="fixing input-hide"
                          size="small"
                        >
                          <InputLabel id="demo-simple-select-label">
                            Select a Condition
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="select-fix"
                            defaultValue="Good"
                            value={thirdStepData.condition}
                            onChange={handleProductCondition}
                          >
                            <MenuItem value="Bad">Bad</MenuItem>
                            <MenuItem value="Good">Good</MenuItem>
                            <MenuItem value="Nice">Nice</MenuItem>
                          </Select>
                        </FormControl>
                      </Item>
                    </Item>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Item className="no-bg">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Item className="pd-30 box-shadow">
                      <Typography
                        variant="h1"
                        component="h2"
                        className="box-head  mb-15"
                      >
                        Shipping speeds and rates
                      </Typography>
                      <Item className="text-left">
                        <FormControl className="cstm-radio">
                          <FormControlLabel
                            value="male"
                            control={
                              <Checkbox
                                checked={thirdStepData.checkedVariant}
                                onChange={handleMultipleVariants}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            }
                            label="This product has multiple variants, like size or color"
                          />
                        </FormControl>
                      </Item>
                      {thirdStepData.checkedVariant ? (
                        <>
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="simple table"
                              className="cstm-data-tbl"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell align="center">Size</TableCell>
                                  <TableCell align="center">Color</TableCell>
                                  <TableCell align="center">Material</TableCell>
                                  <TableCell align="center">Price</TableCell>
                                  <TableCell align="center">
                                    Wholesale
                                    <br />
                                    Price
                                  </TableCell>
                                  <TableCell align="center">
                                    Suggested
                                    <br />
                                    Wholesale
                                  </TableCell>
                                  <TableCell align="center">Quantity</TableCell>
                                  <TableCell align="center">SKU</TableCell>
                                  <TableCell
                                    align="center"
                                    className="image-head"
                                  >
                                    Image
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              {thirdStepData.checkedVariant ? (
                                <TableBody>
                                  <TableRow
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell
                                      align="center"
                                      component="th"
                                      scope="row"
                                    >
                                      <Button
                                        variant="outlined"
                                        className="table-first"
                                      >
                                        {thirdStepData.size}
                                      </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                      <Button
                                        variant="outlined"
                                        className="table-first"
                                      >
                                        {thirdStepData.color}
                                      </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                      <Button
                                        variant="outlined"
                                        className="table-first"
                                      >
                                        {thirdStepData.material}
                                      </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                      <TextField
                                        className="table-second"
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={thirdStepData.price}
                                        onChange={(e) =>
                                          setThirdStepData({
                                            ...thirdStepData,
                                            price: e.target.value,
                                          })
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                          classes: {
                                            input: props.classes["input"],
                                          },
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell align="center">
                                      <TextField
                                        className="table-second"
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={thirdStepData.wholesale_price}
                                        onChange={(e) =>
                                          setThirdStepData({
                                            ...thirdStepData,
                                            wholesale_price: e.target.value,
                                          })
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                          classes: {
                                            input: props.classes["input"],
                                          },
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell align="center">
                                      <TextField
                                        className="table-second"
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={thirdStepData.suggested_price}
                                        onChange={(e) =>
                                          setThirdStepData({
                                            ...thirdStepData,
                                            suggested_price: e.target.value,
                                          })
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                          classes: {
                                            input: props.classes["input"],
                                          },
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      className="table-third"
                                    >
                                      <TextField
                                        className="table-second"
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={thirdStepData.quantity}
                                        onChange={(e) =>
                                          setThirdStepData({
                                            ...thirdStepData,
                                            quantity: e.target.value,
                                          })
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                          classes: {
                                            input: props.classes["input"],
                                          },
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell align="center">
                                      <TextField
                                        className="table-second"
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={thirdStepData.sku}
                                        onChange={(e) =>
                                          setThirdStepData({
                                            ...thirdStepData,
                                            sku: e.target.value,
                                          })
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                          classes: {
                                            input: props.classes["input"],
                                          },
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell align="center">
                                      {productImageFirst.name === "" ? (
                                        <TextField
                                          fullWidth
                                          className="table-fourth add-image"
                                          type="file"
                                          size="small"
                                          id="demo-helper-text-aligned-no-helper"
                                          label="Add Image"
                                          onChange={handleUploadClickFirst}
                                        />
                                      ) : (
                                        <Button
                                          sx={{ color: "#ff2740" }}
                                          onClick={handleRemoveClickFirst}
                                        >
                                          Remove
                                        </Button>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              ) : null}
                              {theArray.map((entry: any, index: any) => (
                                <TableBody>
                                  <TableRow
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell
                                      align="center"
                                      component="th"
                                      scope="row"
                                    >
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectBox[index][`size`]}
                                        className="table-first table-select input-hide"
                                        onChange={(event) =>
                                          handlerTableSize(index, entry, event)
                                        }
                                      >
                                        <MenuItem value="large">Large</MenuItem>
                                        <MenuItem value="medium">
                                          Medium
                                        </MenuItem>
                                        <MenuItem value="small">Small</MenuItem>
                                      </Select>
                                    </TableCell>
                                    <TableCell align="center">
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectBox[index][`color`]}
                                        className="table-first table-select input-hide"
                                        onChange={(event) =>
                                          handlerTableColor(index, entry, event)
                                        }
                                      >
                                        <MenuItem value="blue">Blue</MenuItem>
                                        <MenuItem value="green">Green</MenuItem>
                                        <MenuItem value="red">Red</MenuItem>
                                      </Select>
                                    </TableCell>
                                    <TableCell align="center">
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectBox[index][`material`]}
                                        className="table-first table-select input-hide"
                                        onChange={(event) =>
                                          handlerTableMaterial(
                                            index,
                                            entry,
                                            event
                                          )
                                        }
                                      >
                                        <MenuItem value="plastic">
                                          Plastic
                                        </MenuItem>
                                        <MenuItem value="rubber">
                                          Rubber
                                        </MenuItem>
                                        <MenuItem value="steel">Steel</MenuItem>
                                      </Select>
                                    </TableCell>
                                    <TableCell align="center">
                                      <TextField
                                        className="table-second"
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={selectBox[index][`price`]}
                                        onChange={(event) =>
                                          handlerTablePrice(index, entry, event)
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                          classes: {
                                            input: props.classes["input"],
                                          },
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell align="center">
                                      <TextField
                                        className="table-second"
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={
                                          selectBox[index][`wholesale_price`]
                                        }
                                        onChange={(event) =>
                                          handlerTableWholesalePrice(
                                            index,
                                            entry,
                                            event
                                          )
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                          classes: {
                                            input: props.classes["input"],
                                          },
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell align="center">
                                      <TextField
                                        className="table-second"
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={
                                          selectBox[index][`suggested_price`]
                                        }
                                        onChange={(event) =>
                                          handlerTableSuggestedPrice(
                                            index,
                                            entry,
                                            event
                                          )
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                          classes: {
                                            input: props.classes["input"],
                                          },
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      className="table-third"
                                    >
                                      <TextField
                                        className="table-second"
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={selectBox[index][`quantity`]}
                                        onChange={(event) =>
                                          handlerTableQuantity(
                                            index,
                                            entry,
                                            event
                                          )
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                          classes: {
                                            input: props.classes["input"],
                                          },
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell align="center">
                                      <TextField
                                        className="table-second"
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={selectBox[index][`sku`]}
                                        onChange={(event) =>
                                          handlerTableSku(index, entry, event)
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                          classes: {
                                            input: props.classes["input"],
                                          },
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell align="center">
                                      {selectBox[index][`image`] === "" ? (
                                        <TextField
                                          fullWidth
                                          className="table-fourth add-image"
                                          type="file"
                                          size="small"
                                          id="demo-helper-text-aligned-no-helper"
                                          label="Add Image"
                                          onChange={(event) =>
                                            handlerTableImage(
                                              index,
                                              entry,
                                              event
                                            )
                                          }
                                        />
                                      ) : (
                                        <Button
                                          sx={{ color: "#ff2740" }}
                                          onClick={(event) =>
                                            handlerTableImageRemove(
                                              index,
                                              entry,
                                              event
                                            )
                                          }
                                        >
                                          Remove
                                        </Button>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              ))}
                            </Table>
                          </TableContainer>
                          <Grid item xs={12}>
                            <Item className="text-left no-bg pl-10">
                              <Link className="btn" onClick={addEntryClick}>
                                + Add a variant(s)
                              </Link>
                            </Item>
                          </Grid>
                        </>
                      ) : null}
                    </Item>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item className="text-right no-bg">
              <Button
                variant="outlined"
                className="red-btn btn"
                onClick={handleThirdForm}
              >
                Save
              </Button>
            </Item>
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default withStyles(styles)(ProductsAdd);
