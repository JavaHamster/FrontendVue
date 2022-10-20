/*eslint-disable*/
import axios from "axios";
const https = require("https");

export default async function request_(url, data, method) {
  if(data == "" || data == undefined)
    return
  
  axios.defaults.withCredentials = true;
  data = JSON.stringify(data);

  console.warn(data)
  
  var config = {
    method: method,
    url: url,
    headers: {
      "Content-Type": "apllication/json",
      "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    data: data,
  };

  let promis = await axios(config)
  let configPromis = promis.data
  
    return configPromis
}
