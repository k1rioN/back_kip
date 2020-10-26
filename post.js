const axios = require('axios')

axios.post('http://127.0.0.1:666/process', {
  text: 'a b c d.......',
})
.then((res) => {
  console.log("Response: " + res.data)
})
.catch((error) => {
  console.error(error)
})
