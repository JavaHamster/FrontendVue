/*eslint-disable*/
import axios from "axios";
const https = require("https");

export default function request_(url, data) {
  if(data == "" || data == undefined)
    return

  alert("request");
  axios.defaults.withCredentials = true;
  data = JSON.stringify(data);
  console.warn(data)
  
  let response
  
  var config = {
    method: "post",
    url: url,
    headers: {
      "Content-Type": "apllication/json",
      "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    data: data,
  };

  axios(config)
    .then(function (response) {
      return JSON.stringify(response.data);
    })
    .then((json) => {
      return json
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.data));
    });
}
