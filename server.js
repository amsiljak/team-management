const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require ( 'body-parser' );
const { Sequelize } = require('sequelize');
const db = require('./config/database');

db.sync({force:true});
db.authenticate().then(()=>console.log("dia"))

app.use(express.static(path.join(__dirname, 'build')));
app.use('/users', require('./routes/users'));

app.get('/*', (req, res) => { 
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log("Server started on port " + PORT);
}); 