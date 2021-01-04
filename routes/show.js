const router = require('express').Router();
const File = require('../models/file');

router.get('/:uuid', async(req,res) =>{
    try{
     const file = await File.findOne({ uuid: req.params.uuid })
     if(!file){
        return res.render('download',{error: 'link has been experid'});
     }
     return res.render('download',{
         uuid: file.uuid,
         fileName: file.filename,
         fileSize: file.filesize,
         downloadLink: `${process.env.APP_BASED_URL}/files/download/${file.uuid}`
         //this whole code is used to generate a link for the file that we will download
         //http://localhost:3000/files/download/sdhfjbj-sjfjfjjdjgjfjf
     })
    }catch(err){
        return res.render('download',{error: 'error in shows.js'})
    }

});
//we are ussing get so that i can get some data from here
//: before uuid shows that it is a dynamic function 


module.exports = router;