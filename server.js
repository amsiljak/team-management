const express = require('express');
const app = express();
const path = require('path');
const { Sequelize } = require('sequelize');

app.use(express.static(path.join(__dirname, 'build')));
app.use('/users', require('./routes/users'));
app.use(express.json());

app.get('/*', (req, res) => { 
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log("Server started on port " + PORT);
}); 