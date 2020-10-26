const express = require('express')
var sqlite = require("better-sqlite3")
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
 
var db = new sqlite("base.db");
 
var themes = ['computer', 'physics', 'economy', 'marketing', 'organization', 'math', 'tech', 'normative', 'rules', 'const'];
 
app.post('/test', (req, res) => {
  res.send('{"a":"b"}');
})
 
app.post('/process', (req, res) => {
  console.log(req.body)
 
  var text = req.body.text.toLowerCase().replace('/\./g').replace('/\,/g').replace('/\-/g')
  var words = text.split(" ")
  var array = {}
 
  var counter = 0
  for(var t = 0; t < themes.length; t++){
    let cTheme = themes[t];
    array[cTheme] = { count:0, words:[] }
    for(var i = 0; i < words.length; i++){
      var cWord = words[i];
      var query = "SELECT * FROM `" + cTheme + "` WHERE instr('" + cWord + "', word)";
 
      var len = db.prepare(query).all().length
      array[cTheme].count += db.prepare(query).all().length
      if(len > 0) array[cTheme].words[counter++] = cWord;
    }
    counter = 0
  }
 
  res.send(JSON.stringify(array));
})


 
app.listen(666, () => {
  console.log('Сервер запущен')
})
 