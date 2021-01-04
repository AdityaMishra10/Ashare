const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const fileSchema = new Schema({
    filename :{ type: String, required: true},
    path : { type: String , required: true},
    size : {type: Number, required: true},
    sender: { type: String, required: false},//for sender email
    uuid : { type: String, required: true},
    receiver: { type: String, required: false},//for sender email
    
},{timestamps: true});

module.exports = mongoose.model('file',fileSchema);


//after model the first variabblee is for the file name and the
// other is for the schema that file follows