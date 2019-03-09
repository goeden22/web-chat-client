//path. join to metoda ktora pozwala nam z relatywnej sciezki stworzyc bezwzgledna sciezke
const express = require('express');
const path = require('path')

const publicPath = path.join(__dirname, '../public')
const app = express();

//middleware do uruchamiania na serwerze statycznych plików
app.use(express.static(publicPath))

app.listen(3000, () => {
    console.log(`Started up at port 3000`);
  });