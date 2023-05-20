/*eslint-disable*/
import axios from "axios";
const https = require("https");

export async function request_(url, data, method) {
  if(data == "" || data == undefined)
    return
  
  axios.defaults.withCredentials = true;
  data = JSON.stringify(data);
  
  var config = {
    method: method,
    url: url,
   headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-Type": "application/json",
        "Accept": "*/*",
      },
    withCredentials: true,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    data: data,
  };

  let promis = await axios(config)
  let configPromis = promis.data
  
  return configPromis
}
