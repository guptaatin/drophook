import axios from "axios";
const HttpRequest = async (method: any, url: any, data: any) => {
  try {
    const response = await axios({
      method: method,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "multipart/form-data",
      },
      url: url,
      data: data,
    });
    return response.data;
  } catch (error) {
    //console.log('ERROR from ShipStation: ', error.response.data);
    return error;
  }
};

export default HttpRequest;
