/*eslint-disable*/
import axios from "axios";
const https = require("https");

function request_(url, data) {
    alert("request");
  axios.defaults.withCredentials = true;
  data = JSON.stringify(data);
  var config = {
    method: "post",
    url: url,
    withCredentials: true,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    data: data,
  };

  axios(config)
    .then(function (response) {
      return JSON.stringify(response.data);
    })
    .then((json) => (this.get = json))
    .catch(function (error) {
      console.log(JSON.stringify(error.data));
    });
}
