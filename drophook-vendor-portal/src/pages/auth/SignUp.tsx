import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import arrowup from "../../components/sidebar/assets/arrow-top.svg";
import arrowdown from "../../components/sidebar/assets/arrow-down.svg";
import "./signup.css";
import { VendorRequestCreateService } from "../../services/VendorRequestService";

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

function SignUp() {
  const [firstPage, setFirstPage] = useState(true);
  const [secondPage, setSecondPage] = useState(false);
  const [thirdPage, setThirdPage] = useState(false);
  const [fourthPage, setFourthPage] = useState(false);
  const [fivethPage, setFivethPage] = useState(false);
  const [sixthPage, setSixthPage] = useState(false);
  const [seventhPage, setSeventhPage] = useState(false);
  const [eigthPage, setEigthPage] = useState(false);
  const [ninethPage, setNinethPage] = useState(false);
  const [tenthPage, setTenthPage] = useState(false);
  const [eleventhPage, setEleventhPage] = useState(false);
  const [twelvethPage, setTwelvethPage] = useState(false);
  const [thirteenthPage, setThirteenthPage] = useState(false);
  const [fourteenthPage, setFourteenthPage] = useState(false);
  const [fifteenthPage, setFifteenthPage] = useState(false);
  const [sixteenthPage, setSixteenthPage] = useState(false);
  const [countryName, setCountryName] = React.useState<string[]>([]);
  const [countries, setCountries] = useState([]);
  const [errorText, setErrorText] = React.useState<string>();

  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent<typeof countryName>) => {
    const {
      target: { value },
    } = event;
    setCountryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  useEffect(() => {
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
  }, []);
  const [companyData, setCompanyData] = useState({
    companyName: "",
    email: "",
    num_products: "",
    avg_process_time: "",
    avg_us_time: "",
    avg_int_time: "",
    niche: "",
    web_url: "",
    us_products: "",
    first_name: "",
    last_name: "",
  });
  const finalSubmit = async () => {
    const json = {
      company_name: companyData.companyName,
      first_name: companyData.first_name,
      last_name: companyData.last_name,
      email: companyData.email,
      current_products: companyData.num_products,
      ship_for_us: companyData.us_products,
      avg_processing_time: companyData.avg_process_time,
      avg_shipping_time_us: companyData.avg_us_time,
      avg_shipping_time_in: companyData.avg_int_time,
      countries_offer: countryName.toString(),
      niche: companyData.niche,
      company_website: companyData.web_url,
    };
    const result = await VendorRequestCreateService(json);
    if (result) {
      setTimeout(redirectFunction, 5000);
    }
  };
  const handleFirstPage = (e: any) => {
    e.preventDefault();
    setErrorText("");
    var reg1 = /^[a-zA-Z0-9_ ]*$/;
    if (companyData.companyName && reg1.test(companyData.companyName)) {
      localStorage.setItem("companyName", companyData.companyName);
      setFirstPage(false);
      setSecondPage(true);
      setThirdPage(false);
      setFourthPage(false);
      setFivethPage(false);
      setSixthPage(false);
      setSeventhPage(false);
      setEigthPage(false);
      setNinethPage(false);
      setTenthPage(false);
      setEleventhPage(false);
      setTwelvethPage(false);
      setThirteenthPage(false);
      setFourteenthPage(false);
      setFifteenthPage(false);
      setSixteenthPage(false);
    } else {
      setErrorText("Please fill the correct company name");
      return false;
    }
  };
  const handleFirstNext = () => {
    setFirstPage(false);
    setSecondPage(true);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleSecondPage = (e: any) => {
    e.preventDefault();
    setErrorText("");
    var reg1 = /^[a-zA-Z0-9_ ]*$/;
    if (
      companyData.first_name &&
      reg1.test(companyData.first_name) &&
      companyData.last_name &&
      reg1.test(companyData.last_name)
    ) {
      setFirstPage(false);
      setSecondPage(false);
      setThirdPage(true);
      setFourthPage(false);
      setFivethPage(false);
      setSixthPage(false);
      setSeventhPage(false);
      setEigthPage(false);
      setNinethPage(false);
      setTenthPage(false);
      setEleventhPage(false);
      setTwelvethPage(false);
      setThirteenthPage(false);
      setFourteenthPage(false);
      setFifteenthPage(false);
      setSixteenthPage(false);
    } else {
      setErrorText("Please fill the correct name");
      return false;
    }
  };
  const handleSecondPre = () => {
    setFirstPage(true);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleSecondNext = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(true);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleThirdPage = (e: any) => {
    e.preventDefault();
    setErrorText("");
    var reg1 = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (companyData.email && reg1.test(companyData.email)) {
      setFirstPage(false);
      setSecondPage(false);
      setThirdPage(false);
      setFourthPage(true);
      setFivethPage(false);
      setSixthPage(false);
      setSeventhPage(false);
      setEigthPage(false);
      setNinethPage(false);
      setTenthPage(false);
      setEleventhPage(false);
      setTwelvethPage(false);
      setThirteenthPage(false);
      setFourteenthPage(false);
      setFifteenthPage(false);
      setSixteenthPage(false);
    } else {
      setErrorText("Not a valid Email!");
      return false;
    }
  };
  const handleThirdPre = () => {
    setFirstPage(false);
    setSecondPage(true);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleThirdNext = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(true);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleFourthPage = (e: any) => {
    e.preventDefault();
    setErrorText("");
    var reg1 = /^\d+$/;
    if (companyData.num_products && reg1.test(companyData.num_products)) {
      setFirstPage(false);
      setSecondPage(false);
      setThirdPage(false);
      setFourthPage(false);
      setFivethPage(true);
      setSixthPage(false);
      setSeventhPage(false);
      setEigthPage(false);
      setNinethPage(false);
      setTenthPage(false);
      setEleventhPage(false);
      setTwelvethPage(false);
      setThirteenthPage(false);
      setFourteenthPage(false);
      setFifteenthPage(false);
      setSixteenthPage(false);
    } else {
      setErrorText("Please fill number of products");
      return false;
    }
  };
  const handleFourthPre = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(true);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleFourthNext = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(true);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleFivethPageYes = (el: any) => {
    setErrorText("");
    setCompanyData({
      ...companyData,
      us_products: "yes",
    });
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(true);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleFivethPageNo = () => {
    setErrorText("");
    setCompanyData({
      ...companyData,
      us_products: "no",
    });
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(true);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleFivethPre = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(true);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleFivethNext = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(true);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleSixthPage = (e: any) => {
    e.preventDefault();
    setErrorText("");
    if (companyData.avg_process_time) {
      setFirstPage(false);
      setSecondPage(false);
      setThirdPage(false);
      setFourthPage(false);
      setFivethPage(false);
      setSixthPage(false);
      setSeventhPage(true);
      setEigthPage(false);
      setNinethPage(false);
      setTenthPage(false);
      setEleventhPage(false);
      setTwelvethPage(false);
      setThirteenthPage(false);
      setFourteenthPage(false);
      setFifteenthPage(false);
      setSixteenthPage(false);
    } else {
      setErrorText("Please fill time in days format e.g. 1-2 days");
      return false;
    }
  };
  const handleSixthPre = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(true);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleSixthNext = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(true);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleSeventhPage = (e: any) => {
    e.preventDefault();
    setErrorText("");
    if (companyData.avg_us_time) {
      setFirstPage(false);
      setSecondPage(false);
      setThirdPage(false);
      setFourthPage(false);
      setFivethPage(false);
      setSixthPage(false);
      setSeventhPage(false);
      setEigthPage(true);
      setNinethPage(false);
      setTenthPage(false);
      setEleventhPage(false);
      setTwelvethPage(false);
      setThirteenthPage(false);
      setFourteenthPage(false);
      setFifteenthPage(false);
      setSixteenthPage(false);
    } else {
      setErrorText("Please fill time in days format e.g. 1-2 days");
      return false;
    }
  };
  const handleSeventhPre = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(true);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleSeventhNext = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(true);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleEigthPage = (e: any) => {
    e.preventDefault();
    setErrorText("");
    if (companyData.avg_int_time) {
      setFirstPage(false);
      setSecondPage(false);
      setThirdPage(false);
      setFourthPage(false);
      setFivethPage(false);
      setSixthPage(false);
      setSeventhPage(false);
      setEigthPage(false);
      setNinethPage(true);
      setTenthPage(false);
      setEleventhPage(false);
      setTwelvethPage(false);
      setThirteenthPage(false);
      setFourteenthPage(false);
      setFifteenthPage(false);
      setSixteenthPage(false);
    } else {
      setErrorText("Please fill time in days format e.g. 1-2 days");
      return false;
    }
  };
  const handleEigthPre = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(true);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleEigthNext = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(true);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleNinethPage = (e: any) => {
    e.preventDefault();
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(true);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleNinethPre = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(true);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleNinethNext = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(true);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleTenthPage = (e: any) => {
    e.preventDefault();
    setErrorText("");
    var reg1 = /^[a-zA-Z, ]*$/;
    if (companyData.niche && reg1.test(companyData.niche)) {
      setFirstPage(false);
      setSecondPage(false);
      setThirdPage(false);
      setFourthPage(false);
      setFivethPage(false);
      setSixthPage(false);
      setSeventhPage(false);
      setEigthPage(false);
      setNinethPage(false);
      setTenthPage(false);
      setEleventhPage(true);
      setTwelvethPage(false);
      setThirteenthPage(false);
      setFourteenthPage(false);
      setFifteenthPage(false);
      setSixteenthPage(false);
    } else {
      setErrorText("Please fill the product's niche");
      return false;
    }
  };
  const handleTenthPre = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(true);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleTenthNext = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(true);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleEleventhPage = (e: any) => {
    e.preventDefault();
    setErrorText("");
    var reg1 =
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    if (companyData.web_url && reg1.test(companyData.web_url)) {
      setFirstPage(false);
      setSecondPage(false);
      setThirdPage(false);
      setFourthPage(false);
      setFivethPage(false);
      setSixthPage(false);
      setSeventhPage(false);
      setEigthPage(false);
      setNinethPage(false);
      setTenthPage(false);
      setEleventhPage(false);
      setTwelvethPage(true);
      setThirteenthPage(false);
      setFourteenthPage(false);
      setFifteenthPage(false);
      setSixteenthPage(false);
      document.body.style.backgroundColor = "#ff0e2a";
      finalSubmit();
    } else {
      setErrorText("Invalid Format");
      return false;
    }
  };
  const handleEleventhPre = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(true);
    setEleventhPage(false);
    setTwelvethPage(false);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const handleEleventhNext = () => {
    setFirstPage(false);
    setSecondPage(false);
    setThirdPage(false);
    setFourthPage(false);
    setFivethPage(false);
    setSixthPage(false);
    setSeventhPage(false);
    setEigthPage(false);
    setNinethPage(false);
    setTenthPage(false);
    setEleventhPage(false);
    setTwelvethPage(true);
    setThirteenthPage(false);
    setFourteenthPage(false);
    setFifteenthPage(false);
    setSixteenthPage(false);
  };
  const redirectFunction = () => {
    navigate("/");
    document.body.style.backgroundColor = "#fff";
  };
  return (
    <React.Fragment>
      <Helmet title="Sign Up" />
      <div className="signup-first">
        {firstPage &&
        !secondPage &&
        !thirdPage &&
        !fourthPage &&
        !fivethPage &&
        !sixthPage &&
        !seventhPage &&
        !eigthPage &&
        !ninethPage &&
        !tenthPage &&
        !eleventhPage &&
        !twelvethPage &&
        !thirteenthPage &&
        !fourteenthPage &&
        !fifteenthPage &&
        !sixteenthPage ? (
          <>
            <ul>
              <li>
                <h1>Enter Full Name of your Company</h1>
              </li>
              <form onSubmit={handleFirstPage}>
                <li>
                  <Input
                    fullWidth={true}
                    value={companyData.companyName}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        companyName: e.target.value,
                      })
                    }
                    placeholder="Type your answer here..."
                  />
                </li>
                <li className="validation-text">{errorText}</li>
                <li>
                  <Button className="form-btn" type="submit">
                    OK
                  </Button>
                </li>
              </form>
            </ul>
            <ul className="bottom-nav-first">
              {companyData.companyName === "" ? (
                <li className="next-arrow disabled" onClick={handleFirstNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              ) : (
                <li className="next-arrow" onClick={handleFirstNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              )}
            </ul>
          </>
        ) : !firstPage &&
          secondPage &&
          !thirdPage &&
          !fourthPage &&
          !fivethPage &&
          !sixthPage &&
          !seventhPage &&
          !eigthPage &&
          !ninethPage &&
          !tenthPage &&
          !eleventhPage &&
          !twelvethPage &&
          !thirteenthPage &&
          !fourteenthPage &&
          !fifteenthPage &&
          !sixteenthPage ? (
          <>
            <ul>
              <li>
                <h1>Enter the First and Last name</h1>
              </li>
              <form onSubmit={handleSecondPage}>
                <li className="full-name">
                  <Input
                    value={companyData.first_name}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        first_name: e.target.value,
                      })
                    }
                    placeholder="First name"
                  />
                  <Input
                    value={companyData.last_name}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        last_name: e.target.value,
                      })
                    }
                    placeholder="Last name"
                  />
                </li>
                <li className="validation-text">{errorText}</li>
                <li>
                  <Button className="form-btn" type="submit">
                    OK
                  </Button>
                </li>
              </form>
            </ul>
            <ul className="bottom-nav">
              <li className="pre-arrow" onClick={handleSecondPre}>
                <img src={arrowup} alt="arrowup" />
              </li>
              {companyData.first_name === "" || companyData.last_name === "" ? (
                <li className="next-arrow disabled">
                  <img
                    src={arrowdown}
                    alt="arrowdown"
                    onClick={handleSecondNext}
                  />
                </li>
              ) : (
                <li className="next-arrow">
                  <img
                    src={arrowdown}
                    alt="arrowdown"
                    onClick={handleSecondNext}
                  />
                </li>
              )}
            </ul>
          </>
        ) : !firstPage &&
          !secondPage &&
          thirdPage &&
          !fourthPage &&
          !fivethPage &&
          !sixthPage &&
          !seventhPage &&
          !eigthPage &&
          !ninethPage &&
          !tenthPage &&
          !eleventhPage &&
          !twelvethPage &&
          !thirteenthPage &&
          !fourteenthPage &&
          !fifteenthPage &&
          !sixteenthPage ? (
          <>
            <ul>
              <li>
                <h1>Enter a valid email address</h1>
              </li>
              <form onSubmit={handleThirdPage}>
                <li>
                  <Input
                    fullWidth={true}
                    value={companyData.email}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        email: e.target.value,
                      })
                    }
                    placeholder="name@example.com"
                  />
                </li>
                <li className="validation-text">{errorText}</li>
                <li>
                  <Button className="form-btn" type="submit">
                    OK
                  </Button>
                </li>
              </form>
            </ul>
            <ul className="bottom-nav">
              <li className="pre-arrow">
                <img src={arrowup} alt="arrowup" onClick={handleThirdPre} />
              </li>
              {companyData.email === "" ? (
                <li className="next-arrow disabled" onClick={handleThirdNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              ) : (
                <li className="next-arrow" onClick={handleThirdNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              )}
            </ul>
          </>
        ) : !firstPage &&
          !secondPage &&
          !thirdPage &&
          fourthPage &&
          !fivethPage &&
          !sixthPage &&
          !seventhPage &&
          !eigthPage &&
          !ninethPage &&
          !tenthPage &&
          !eleventhPage &&
          !twelvethPage &&
          !thirteenthPage &&
          !fourteenthPage &&
          !fifteenthPage &&
          !sixteenthPage ? (
          <>
            <ul>
              <li>
                <h1>How many products do you currently have?</h1>
              </li>
              <form onSubmit={handleFourthPage}>
                <li>
                  <Input
                    fullWidth={true}
                    value={companyData.num_products}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        num_products: e.target.value,
                      })
                    }
                    placeholder="Type your answer here..."
                  />
                </li>
                <li className="validation-text">{errorText}</li>
                <li>
                  <Button className="form-btn" type="submit">
                    OK
                  </Button>
                </li>
              </form>
            </ul>
            <ul className="bottom-nav">
              <li className="pre-arrow" onClick={handleFourthPre}>
                <img src={arrowup} alt="arrowup" />
              </li>
              {companyData.num_products === "" ? (
                <li className="next-arrow disabled" onClick={handleFourthNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              ) : (
                <li className="next-arrow" onClick={handleFourthNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              )}
            </ul>
          </>
        ) : !firstPage &&
          !secondPage &&
          !thirdPage &&
          !fourthPage &&
          fivethPage &&
          !sixthPage &&
          !seventhPage &&
          !eigthPage &&
          !ninethPage &&
          !tenthPage &&
          !eleventhPage &&
          !twelvethPage &&
          !thirteenthPage &&
          !fourteenthPage &&
          !fifteenthPage &&
          !sixteenthPage ? (
          <>
            <ul>
              <li>
                <h1>Do you ship your products from United States?</h1>
              </li>
              <li>
                <Stack spacing={2} direction="row">
                  <Button
                    className="form-btn"
                    value={companyData.us_products}
                    onClick={handleFivethPageYes}
                  >
                    Yes
                  </Button>
                  <Button
                    className="form-btn btn-white"
                    value={companyData.us_products}
                    onClick={handleFivethPageNo}
                  >
                    No
                  </Button>
                </Stack>
              </li>
            </ul>
            <ul className="bottom-nav">
              <li className="pre-arrow" onClick={handleFivethPre}>
                <img src={arrowup} alt="arrowup" />
              </li>
              {companyData.us_products === "" ? (
                <li className="next-arrow disabled" onClick={handleFivethPre}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              ) : (
                <li className="next-arrow" onClick={handleFivethNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              )}
            </ul>
          </>
        ) : !firstPage &&
          !secondPage &&
          !thirdPage &&
          !fourthPage &&
          !fivethPage &&
          sixthPage &&
          !seventhPage &&
          !eigthPage &&
          !ninethPage &&
          !tenthPage &&
          !eleventhPage &&
          !twelvethPage &&
          !thirteenthPage &&
          !fourteenthPage &&
          !fifteenthPage &&
          !sixteenthPage ? (
          <>
            <ul>
              <li>
                <h1>What's your average processing time? (be specific)</h1>
              </li>
              <form onSubmit={handleSixthPage}>
                <li>
                  <Input
                    fullWidth={true}
                    value={companyData.avg_process_time}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        avg_process_time: e.target.value,
                      })
                    }
                    placeholder="Type your answer here...(e.g: 1-2 days)"
                  />
                </li>
                <li className="validation-text">{errorText}</li>
                <li>
                  <Button className="form-btn" type="submit">
                    OK
                  </Button>
                </li>
              </form>
            </ul>
            <ul className="bottom-nav">
              <li className="pre-arrow" onClick={handleSixthPre}>
                <img src={arrowup} alt="arrowup" />
              </li>
              {companyData.avg_process_time === "" ? (
                <li className="next-arrow disabled" onClick={handleSixthNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              ) : (
                <li className="next-arrow" onClick={handleSixthNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              )}
            </ul>
          </>
        ) : !firstPage &&
          !secondPage &&
          !thirdPage &&
          !fourthPage &&
          !fivethPage &&
          !sixthPage &&
          seventhPage &&
          !eigthPage &&
          !ninethPage &&
          !tenthPage &&
          !eleventhPage &&
          !twelvethPage &&
          !thirteenthPage &&
          !fourteenthPage &&
          !fifteenthPage &&
          !sixteenthPage ? (
          <>
            <ul>
              <li>
                <h1>What's your average US shipping time? (be specific)</h1>
              </li>
              <form onSubmit={handleSeventhPage}>
                <li>
                  <Input
                    fullWidth={true}
                    value={companyData.avg_us_time}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        avg_us_time: e.target.value,
                      })
                    }
                    placeholder="Type your answer here...(e.g: 1-2 days)"
                  />
                </li>
                <li className="validation-text">{errorText}</li>
                <li>
                  <Button className="form-btn" type="submit">
                    OK
                  </Button>
                </li>
              </form>
            </ul>
            <ul className="bottom-nav">
              <li className="pre-arrow" onClick={handleSeventhPre}>
                <img src={arrowup} alt="arrowup" />
              </li>
              {companyData.avg_us_time === "" ? (
                <li className="next-arrow disabled" onClick={handleSeventhNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              ) : (
                <li className="next-arrow" onClick={handleSeventhNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              )}
            </ul>
          </>
        ) : !firstPage &&
          !secondPage &&
          !thirdPage &&
          !fourthPage &&
          !fivethPage &&
          !sixthPage &&
          !seventhPage &&
          eigthPage &&
          !ninethPage &&
          !tenthPage &&
          !eleventhPage &&
          !twelvethPage &&
          !thirteenthPage &&
          !fourteenthPage &&
          !fifteenthPage &&
          !sixteenthPage ? (
          <>
            <ul>
              <li>
                <h1>
                  What's your average international shipping time? (be specific)
                </h1>
              </li>
              <form onSubmit={handleEigthPage}>
                <li>
                  <Input
                    fullWidth={true}
                    value={companyData.avg_int_time}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        avg_int_time: e.target.value,
                      })
                    }
                    placeholder="Type your answer here...(e.g: 3 days)"
                  />
                </li>
                <li className="validation-text">{errorText}</li>
                <li>
                  <Button className="form-btn" type="submit">
                    OK
                  </Button>
                </li>
              </form>
            </ul>
            <ul className="bottom-nav">
              <li className="pre-arrow" onClick={handleEigthPre}>
                <img src={arrowup} alt="arrowup" />
              </li>
              {companyData.avg_int_time === "" ? (
                <li className="next-arrow disabled" onClick={handleEigthNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              ) : (
                <li className="next-arrow" onClick={handleEigthNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              )}
            </ul>
          </>
        ) : !firstPage &&
          !secondPage &&
          !thirdPage &&
          !fourthPage &&
          !fivethPage &&
          !sixthPage &&
          !seventhPage &&
          !eigthPage &&
          ninethPage &&
          !tenthPage &&
          !eleventhPage &&
          !twelvethPage &&
          !thirteenthPage &&
          !fourteenthPage &&
          !fifteenthPage &&
          !sixteenthPage ? (
          <>
            <ul>
              <li>
                <h1>What's countries do you offer shipping to?</h1>
              </li>
              <form onSubmit={handleNinethPage}>
                <li>
                  <FormControl sx={{ m: 1 }} fullWidth>
                    <InputLabel
                      id="demo-multiple-checkbox-label"
                      className="select-countries-label"
                    >
                      Select countries
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={countryName}
                      onChange={handleChange}
                      placeholder="country"
                      input={<OutlinedInput label="Select countries" />}
                      renderValue={(selected) => selected.join(", ")}
                      className="select-countries"
                      MenuProps={MenuProps}
                    >
                      {countries.map((name: any) => (
                        <MenuItem key={name.name} value={name.name}>
                          <Checkbox
                            checked={countryName.indexOf(name.name) > -1}
                          />
                          <ListItemText primary={name.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </li>
                <li>
                  <Button className="form-btn" type="submit">
                    OK
                  </Button>
                </li>
              </form>
            </ul>
            <ul className="bottom-nav">
              <li className="pre-arrow" onClick={handleNinethPre}>
                <img src={arrowup} alt="arrowup" />
              </li>
              {countryName.length === 0 ? (
                <li className="next-arrow disabled" onClick={handleNinethNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              ) : (
                <li className="next-arrow" onClick={handleNinethNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              )}
            </ul>
          </>
        ) : !firstPage &&
          !secondPage &&
          !thirdPage &&
          !fourthPage &&
          !fivethPage &&
          !sixthPage &&
          !seventhPage &&
          !eigthPage &&
          !ninethPage &&
          tenthPage &&
          !eleventhPage &&
          !twelvethPage &&
          !thirteenthPage &&
          !fourteenthPage &&
          !fifteenthPage &&
          !sixteenthPage ? (
          <>
            <ul>
              <li>
                <h1>What's niche are your products in?</h1>
              </li>
              <form onSubmit={handleTenthPage}>
                <li>
                  <Input
                    fullWidth={true}
                    value={companyData.niche}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        niche: e.target.value,
                      })
                    }
                    placeholder="Home goods, apparel, jewelry etc."
                  />
                </li>
                <li className="validation-text">{errorText}</li>
                <li>
                  <Button className="form-btn" type="submit">
                    OK
                  </Button>
                </li>
              </form>
            </ul>
            <ul className="bottom-nav">
              <li className="pre-arrow" onClick={handleTenthPre}>
                <img src={arrowup} alt="arrowup" />
              </li>
              {companyData.niche === "" ? (
                <li className="next-arrow disabled" onClick={handleTenthNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              ) : (
                <li className="next-arrow" onClick={handleTenthNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              )}
            </ul>
          </>
        ) : !firstPage &&
          !secondPage &&
          !thirdPage &&
          !fourthPage &&
          !fivethPage &&
          !sixthPage &&
          !seventhPage &&
          !eigthPage &&
          !ninethPage &&
          !tenthPage &&
          eleventhPage &&
          !twelvethPage &&
          !thirteenthPage &&
          !fourteenthPage &&
          !fifteenthPage &&
          !sixteenthPage ? (
          <>
            <ul>
              <li>
                <h1>Enter in the URL for your company website.</h1>
              </li>
              <form onSubmit={handleEleventhPage}>
                <li>
                  <Input
                    fullWidth={true}
                    value={companyData.web_url}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        web_url: e.target.value,
                      })
                    }
                    placeholder="https://"
                  />
                </li>
                <li className="validation-text">{errorText}</li>
                <li>
                  <Button className="form-btn" type="submit">
                    OK
                  </Button>
                </li>
              </form>
            </ul>
            <ul className="bottom-nav">
              <li className="pre-arrow" onClick={handleEleventhPre}>
                <img src={arrowup} alt="arrowup" />
              </li>
              {companyData.web_url === "" ? (
                <li
                  className="next-arrow disabled"
                  onClick={handleEleventhNext}
                >
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              ) : (
                <li className="next-arrow" onClick={handleEleventhNext}>
                  <img src={arrowdown} alt="arrowdown" />
                </li>
              )}
            </ul>
          </>
        ) : (
          <p className="sign-up-para">
            Thank you for submitting an application to be a Drophook supplier!
            As of right now, you’re on the waiting list of America’s most
            trusted marketplace of online distributers. You’ll receive a
            confirmation email from us shortly. As soon as a spot opens up, and
            we think you’d be a good fit, we’ll be back in touch with you.
          </p>
        )}
      </div>
    </React.Fragment>
  );
}

export default SignUp;
