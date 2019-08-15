import axios from 'axios';

const data = {
  "id":"abcdef",
  "user":{
    "name":"tarou",
    "age":20,
    "email":"example@example.com",
    "result":true
  }
}

axios.get('https://script.google.com/macros/s/AKfycbzPqbtPRlmmacan7j2P5ZH_c2QttGPtrimaoNELY7zw09Ve1CgZ/exec')
    .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  })
  .catch(function (error) {
    console.log(error);
  });

axios.post('https://script.google.com/macros/s/AKfycbzPqbtPRlmmacan7j2P5ZH_c2QttGPtrimaoNELY7zw09Ve1CgZ/exec', data , {
    headers : {
    "Access-Control-Allow-Origin":"*",
     "Content-type": "application/json; charset=UTF-8"
    }})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
