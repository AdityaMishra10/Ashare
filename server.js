const express = require('express');
// express is a function in here
const app = express();
const path = require('path');

const PORT = process.env.PORT|| 3000;
app.use(express.static('public'));
app.use(express.json());//            so that we can parse the json data

 const connectDB =require('./config/db');
 connectDB();//                         calling the function here


 //template engine
 app.set('views',path.join(__dirname,'/views'));
 app.set('view engine', 'ejs');

//routes to share the files
//all routes
app.use('/api/files',require('./routes/file'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'))//this will be the form in which link will be shown
 
app.listen(PORT, () => {
    console.log(`listening on port ${PORT} `);
})