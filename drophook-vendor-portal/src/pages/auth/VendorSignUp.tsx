import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import arrowup from "../../components/sidebar/assets/arrow-top.svg";
import arrowdown from "../../components/sidebar/assets/arrow-down.svg";
import "./signup.css";
import img1 from "../../components/sidebar/assets/fb-icon.svg";
import img2 from "../../components/sidebar/assets/insta-icon.svg";
import img3 from "../../components/sidebar/assets/linkedin-icon.svg";
import img4 from "../../components/sidebar/assets/twitter-icon.svg";
import img5 from "../../components/sidebar/assets/youtube-icon.svg";
import img6 from "../../components/sidebar/assets/pinterest-icon.svg";
import { VendorRequestByEmailService } from "../../services/VendorRequestService";
import { VendorsService } from "../../services/VendorService";
import { UpdateSingleUserByIdService } from "../../services/UserService";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Hispanic American",
  "Asia-Pacific American",
  "African AmericanNative American",
  "Women Owned Business Small Business (SB)",
  "HubZone Small Business (HZSB)",
  "Small Disadvantaged Business (SOB)",
  "Veteran Owned Small Business (VOSB) ",
  "Service Disabled Veteran Owned Small",
  "Business (S0VOSB)",
];

function VendorSignUp() {
  const signUpUserEmail = localStorage.getItem("userSignInEmail");
  const [twelvethPage, setTwelvethPage] = useState(true);
  const [thirteenthPage, setThirteenthPage] = useState(false);
  const [fourteenthPage, setFourteenthPage] = useState(false);
  const [fifteenthPage, setFifteenthPage] = useState(false);
  const [countryName, setCountryName] = useState();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const { vendorid } = useParams<{ vendorid?: string }>();
  const [errorText, setErrorText] = React.useState<string>();
  const [businessProfile, setBusinessProfile] = React.useState<string[]>([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openCountry, setOpenCountry] = React.useState(false);
  const [vendorSignUpId, setVendorSignUpId] = useState();

  var currentdate = new Date(Date.now());
  const options: any = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  var datetime = currentdate.toLocaleDateString("us-PT", options);

  const [companyData, setCompanyData] = useState({
    companyName: "",
    company_address: "",
    city_name: "",
    company_state: "",
    company_zip: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    pinterest: "",
    youtube: "",
  });
  const handleAllCountries = () => {
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setCountries(result.data);
      });
  };

  const handleAllStates = (e: any) => {
    setCountryName(e.target.value);
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

  useEffect(() => {
    const VendorData = async () => {
      const json = await VendorRequestByEmailService(signUpUserEmail);
      if (json) {
        const val = json[0].company_name;
        setCompanyData((prevState) => {
          return { ...prevState, companyName: val };
        });
        setVendorSignUpId(json[0].id);
      }
    };
    VendorData();
    handleAllCountries();
  }, [signUpUserEmail]);

  const handleAddBlack = (e: any) => {
    if (businessProfile.includes("Black-owned")) {
      var arr: any = businessProfile.filter(function (item: any) {
        return item !== e.target.value;
      });
      setBusinessProfile(arr);
    } else {
      setBusinessProfile([...businessProfile, e.target.value]);
    }
  };

  const handleAddVeteran = (e: any) => {
    if (businessProfile.includes("Veteran-owned")) {
      var arr: any = businessProfile.filter(function (item: any) {
        return item !== e.target.value;
      });
      setBusinessProfile(arr);
    } else {
      setBusinessProfile([...businessProfile, e.target.value]);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseCountry = () => {
    setOpenCountry(false);
  };

  const handleOpenCountry = () => {
    setOpenCountry(true);
  };
  const handleBusinessProfile = (
    event: SelectChangeEvent<typeof businessProfile>
  ) => {
    const {
      target: { value },
    } = event;
    setBusinessProfile(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const finalSubmit = async () => {
    const json = {
      vendor_id: vendorSignUpId,
      company_name: companyData.companyName,
      company_address: companyData.company_address,
      city_name: companyData.city_name,
      company_state: companyData.company_state,
      company_zip: companyData.company_zip,
      business_profile: businessProfile.toString(),
      facebook: companyData.facebook,
      instagram: companyData.instagram,
      twitter: companyData.twitter,
      linkedin: companyData.linkedin,
      pinterest: companyData.pinterest,
      youtube: companyData.youtube,
    };
    const result1 = await VendorsService(json);
    if (result1) {
      const jsonNew = {
        logged_in: datetime,
      };
      const result2 = await UpdateSingleUserByIdService(vendorid, jsonNew);
      if (result2) {
        navigate("/pages/profile");
      }
    }
  };

  const handleTwelvethPage = (e: any) => {
    e.preventDefault();
    setErrorText("");
    var reg1 = /^[a-zA-Z0-9_ ]*$/;
    if (!(companyData.companyName && reg1.test(companyData.companyName))) {
      setErrorText("Please Fill Correct Company Name");
    } else if (
      !(companyData.company_address && reg1.test(companyData.company_address))
    ) {
      setErrorText("Please Fill Correct Company Address");
    } else if (!(companyData.city_name && reg1.test(companyData.city_name))) {
      setErrorText("Please Fill Correct City Name");
    } else if (!companyData.company_state) {
      setErrorText("Please Fill Correct Company State");
    } else if (
      !(companyData.company_zip && reg1.test(companyData.company_zip))
    ) {
      setErrorText("Please Fill Correct Company Zip Code");
    } else {
      setTwelvethPage(false);
      setThirteenthPage(true);
      setFourteenthPage(false);
      setFifteenthPage(false);
    }
  };
  const handleTwelvethNext = () => {
    setErrorText("");
    setTwelvethPage(false);
    setThirteenthPage(true);
    setFourteenthPage(false);
    setFifteenthPage(false);
  };
  const handleThirteenthPage = (e: any) => {
    e.preventDefault();
    setErrorText("");
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(true);
    setFifteenthPage(false);
  };
  const handleThirteenthPre = () => {
    setErrorText("");
    setTwelvethPage(true);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
  };
  const handleThirteenthNext = () => {
    setErrorText("");
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(true);
    setFifteenthPage(false);
  };
  const handleFourteenthPage = (e: any) => {
    e.preventDefault();
    setErrorText("");
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(true);
  };
  const handleFourteenthPre = () => {
    setErrorText("");
    setTwelvethPage(false);
    setThirteenthPage(true);
    setFourteenthPage(false);
    setFifteenthPage(false);
  };
  const handleFourteenthNext = () => {
    setErrorText("");
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(true);
  };
  const handleFiveteenthPage = (e: any) => {
    e.preventDefault();
    setErrorText("");
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    finalSubmit();
  };
  const handleFiveteenthPre = () => {
    setErrorText("");
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(true);
    setFifteenthPage(false);
  };

  return (
    <React.Fragment>
      <Helmet title="Sign Up" />
      <div className="signup-first">
        {twelvethPage &&
        !thirteenthPage &&
        !fourteenthPage &&
        !fifteenthPage ? (
          <ul className="company-details">
            {/* <Box
              component="form"
              noValidate
              className="company-details"
              autoComplete="off"
            > */}
            <form onSubmit={handleTwelvethPage}>
              <li>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h3"
                      component="div"
                      gutterBottom
                      className="cd-head"
                    >
                      Company Details
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="width100"
                      id="outlined-basic"
                      label="Company Name"
                      variant="outlined"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      value={companyData.companyName}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          companyName: e.target.value,
                        })
                      }
                      placeholder="Company Name LLC"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="width100"
                      id="outlined-basic"
                      label="Company Address"
                      variant="outlined"
                      size="small"
                      placeholder="123 Address Way"
                      InputLabelProps={{ shrink: true }}
                      value={companyData.company_address}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          company_address: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      className=""
                      id="outlined-basic"
                      label="City Name"
                      variant="outlined"
                      placeholder="City Name"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      value={companyData.city_name}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          city_name: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className="" fullWidth>
                      <InputLabel id="demo-controlled-open-select-label">
                        Country
                      </InputLabel>
                      <Select
                        fullWidth
                        placeholder="Country"
                        size="small"
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openCountry}
                        onClose={handleCloseCountry}
                        onOpen={handleOpenCountry}
                        label="Country"
                        value={countryName}
                        onChange={handleAllStates}
                      >
                        {countries.map((name: any) => (
                          <MenuItem key={name.name} value={name.name}>
                            <ListItemText primary={name.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className="" fullWidth>
                      <InputLabel id="demo-controlled-open-select-label">
                        State
                      </InputLabel>
                      <Select
                        placeholder="State"
                        size="small"
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        label="State"
                        value={companyData.company_state}
                        onChange={(e) => {
                          setCompanyData({
                            ...companyData,
                            company_state: e.target.value,
                          });
                        }}
                      >
                        {states.map((name: any) => (
                          <MenuItem key={name.name} value={name.name}>
                            <ListItemText primary={name.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      className=""
                      size="small"
                      id="outlined-number"
                      label="Zip Code"
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      placeholder="000000"
                      value={companyData.company_zip}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          company_zip: e.target.value,
                        })
                      }
                    />
                  </Grid>
                </Grid>
              </li>
              <li>
                <Button className="form-btn" type="submit">
                  Next
                </Button>
              </li>
            </form>
            <p className="validation-text">{errorText}</p>
            <ul className="bottom-nav">
              {companyData.companyName === "" ||
              companyData.company_address === "" ||
              companyData.city_name === "" ||
              companyData.company_state === "" ||
              companyData.company_zip === "" ? (
                <li
                  className="next-arrow disabled"
                  onClick={handleTwelvethNext}
                >
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              ) : (
                <li className="next-arrow" onClick={handleTwelvethNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              )}
            </ul>
          </ul>
        ) : !twelvethPage &&
          thirteenthPage &&
          !fourteenthPage &&
          !fifteenthPage ? (
          <ul className="business-profile">
            <form onSubmit={handleThirteenthPage}>
              <FormHelperText className="small-red-text">
                Optional
              </FormHelperText>
              <Typography className="gray-bold-text">
                Business Profile
              </Typography>
              <Typography className="paratext">
                Does your Company quality as any of the following targeted
                diverse business? Minority Owned Business (at least 51%)
              </Typography>
              <FormControl className="width100 margin-tb">
                <InputLabel id="demo-multiple-checkbox-label">
                  Choose one or more
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={businessProfile}
                  onChange={handleBusinessProfile}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={businessProfile.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack spacing={2} direction="row">
                <Button
                  value="Black-owned"
                  className="grey-btn"
                  onClick={handleAddBlack}
                >
                  Black-owned
                </Button>
                <Button
                  value="Veteran-owned"
                  onClick={handleAddVeteran}
                  className="grey-btn"
                >
                  Veteran-owned
                </Button>
              </Stack>
              <Button className="form-btn" type="submit">
                Next
              </Button>
            </form>
            <ul className="bottom-nav">
              <li className="pre-arrow" onClick={handleThirteenthPre}>
                <img src={arrowup} alt="arrowup" />
              </li>
              <li className="next-arrow" onClick={handleThirteenthNext}>
                <img src={arrowdown} alt="arrowdown" />
              </li>
            </ul>
          </ul>
        ) : !twelvethPage &&
          !thirteenthPage &&
          fourteenthPage &&
          !fifteenthPage ? (
          <ul className="social-icon">
            {/* <Box
              component="form"
              noValidate
              className="social-icon"
              autoComplete="off"
            > */}
            <form onSubmit={handleFourteenthPage}>
              <FormHelperText className="small-red-text">
                Optional
              </FormHelperText>
              <Typography className="gray-bold-text">
                Connect with merchants on social!
              </Typography>
              <Grid
                className="social-form"
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Paper component="form" className="fb-form social-row">
                    <div className="social-icon-wrap">
                      <img src={img1} alt="img1" className="social-icons" />
                    </div>
                    <InputBase
                      placeholder="Enter your URL"
                      value={companyData.facebook}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          facebook: e.target.value,
                        })
                      }
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper component="form" className="insta-form social-row">
                    <div className="social-icon-wrap">
                      <img src={img2} alt="img2" className="social-icons" />
                    </div>
                    <InputBase
                      placeholder="Enter your URL"
                      value={companyData.instagram}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          instagram: e.target.value,
                        })
                      }
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper component="form" className="linkedin-form social-row">
                    <div className="social-icon-wrap">
                      <img src={img3} alt="img3" className="social-icons" />
                    </div>
                    <InputBase
                      placeholder="Enter your URL"
                      value={companyData.linkedin}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          linkedin: e.target.value,
                        })
                      }
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper component="form" className="twitter-form social-row">
                    <div className="social-icon-wrap">
                      <img src={img4} alt="img4" className="social-icons" />
                    </div>
                    <InputBase
                      placeholder="Enter your URL"
                      value={companyData.twitter}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          twitter: e.target.value,
                        })
                      }
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper component="form" className="youtube-form social-row">
                    <div className="social-icon-wrap">
                      <img src={img5} alt="img5" className="social-icons" />
                    </div>
                    <InputBase
                      placeholder="Enter your URL"
                      value={companyData.youtube}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          youtube: e.target.value,
                        })
                      }
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper component="form" className="pinterest-form social-row">
                    <div className="social-icon-wrap">
                      <img src={img6} alt="img6" className="social-icons" />
                    </div>
                    <InputBase
                      placeholder="Enter your URL"
                      value={companyData.pinterest}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          pinterest: e.target.value,
                        })
                      }
                    />
                  </Paper>
                </Grid>
              </Grid>
              <Button className="form-btn" type="submit">
                Next
              </Button>
            </form>
            <ul className="bottom-nav">
              <li className="pre-arrow" onClick={handleFourteenthPre}>
                <img src={arrowup} alt="arrowup" />
              </li>
              <li className="next-arrow" onClick={handleFourteenthNext}>
                <img src={arrowdown} alt="arrowdown" />
              </li>
            </ul>
          </ul>
        ) : (
          <>
            <ul className="pos-center">
              <form onSubmit={handleFiveteenthPage}>
                <li>
                  <h1>Congratulations! Let’s set up your profile.</h1>
                </li>
                <li>
                  <Button className="form-btn" type="submit">
                    Next
                  </Button>
                </li>
              </form>
            </ul>
            <ul className="bottom-nav">
              <li className="pre-arrow" onClick={handleFiveteenthPre}>
                <img src={arrowup} alt="arrowup" />
              </li>
            </ul>
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default VendorSignUp;
