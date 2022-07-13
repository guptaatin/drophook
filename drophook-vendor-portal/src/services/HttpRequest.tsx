import axios from "axios";
const HttpRequest = async (method: any, url: any, data: any) => {
  // try {
  const response = await axios({
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "XMLHttpRequest",
    },
    url: url,
    data: JSON.stringify(data),
  });
  return response.data;
  // } catch (error) {
  //   console.log("ERROR from ShipStation: ", error);
  //   // return error;
  // }
};

export default HttpRequest;
