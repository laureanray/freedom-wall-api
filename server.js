const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(bodyParser.json());

const inMemoryDatabase = [];

app.get('/freedom', (req, res) => {
  res.send(inMemoryDatabase);
});


const isDuplicate = (name, message) => {
  for (const data of inMemoryDatabase) {
    if (data.name === name && data.message === message) {
      return true;
    } 
  }

  return false;
}

app.post('/freedom', (req, res) => {
  const name = req.body.name;
  const message = req.body.message;

  if (!isDuplicate(name, message)) {
    const data = {
      name: req.body.name,
      message: req.body.message,
      createdAt: new Date().toISOString()
    };
  
    inMemoryDatabase.push(data);
    res.status(201).send(data);
  } else {
    res.status(409).send({
      message: "Duplicatex message"
    });
  }
})


const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log(`App is now running at port ${port}`);
})