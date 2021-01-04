const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const{ v4 :uuid4} = require('uuid');


let storage = multer.diskStorage({
    //cb => callback(error,function)
    destination: (req , file ,cb) => cb(null, 'uploads/'),
    filename : (req, file,cb) =>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        //THIS WILL GIVE THE UNIQUE URL FOR THE FILE WE NEED TO SHARE
        cb(null,uniqueName)
   
    },

}) ;
let upload = multer({
    storage: storage, 
    limits :{fileSize: 1000000 * 100}
}).single('myfile');//single represents that we can upload only one file
//my file is the name of the file that we are sending through the front end

router.post('/',(req,res) => {

    



    //store file
    upload(req,res,async(err)=>{
         //validate request
         if(!req.file){//When user does not give any file 
        return res.json({error :"all fields are required"})
                      }

        if(err){
            return res.status(500).send({error: err.message});
        }
        //store file into database
        const file = new File({
            filename : req.file.filename,
            uuid : uuid4(),
            path: req.file.path,
            size:req.file.size
         } );
         
         //response that will give the link to download rhe file
         const response = await file.save();
         return res.json({ file: `${process.env.APP_BASED_URL}/files/${response.uuid}`});
         // 
          


    });




});
//---------------now the following code will be to send email------------------


router.post('/send',async(req,res)=>{
    const { uuid,emailTo,emailFrom}= req.body;
    
    //validate the post request
    if(!uuid|| !emailTo || emailFrom){
        return res.status(422).send({error:'all fields are required.'});
    }
    //get data from database
    const file = await File.findOne({uuid : uuid });
    // this will check the uuid from the database and from the request 

    if(file.sender){
        return res.status(422).send({error:'email already send.'});
        //this check wheather the email have been already send or not 
    }


    file.sender= emailFrom;
    file.receiver = emailTo;
    const response = await file.save();


    //---------------------------code to send mail--------------------------------------
    const sendMail = require('../services/emailService');//here we will receive the function that we have exported from emailservices
    sendMail({
        from : emailFrom,
        to: emailTo,
        subject: 'Ashare file sharing',
        text: `${emailFrom} shared a file with you`,
        html: require('../services/emailTemplate')({
            emailFrom: emailFrom,
            downloadLink:`${process.env.APP_BASED_URL}/files/${file.uuid}`,
            size: parseInt(file.size/1000) + 'kb',
            expires: `24 hours`
        })
        //email template
    });return res.send({success:'mail send hurray'});
    

    //making another module to send email


});





module.exports=router;