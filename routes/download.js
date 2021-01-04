const router = require('express').Router();
const File = require('../models/file');



router.get('/:uuid',async(req,res)=>{
    const file =await File.findOne({uuid:req.params.uuid});
    //this checks wheather the uuid from database matvhes the uuid of the requested file

    if(!file){
        //if database does not contain the file the following will happen

        return res.render('download',{error : 'link has been expired.'});
    }
    const filePath = `${__dirname}/../${file.path}`
    //we are making file path so that we can download the file

    
    res.download(filePath); 
    //this is the way we download a file in express

});
module.exports = router;