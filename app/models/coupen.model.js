const mongoose=require('mongoose')


var CoupenSchema = new mongoose.Schema({
    offerName: {
      type: String,
      required:true
    },    
    coupenCode: {
        type: String,
        required:true     
    },

    startDate: {
        type: Number,
        required:true
    },
    
    endDate:{
      type: Number,
      required:true

    
    },

    discountPercentage:{
      type: Number,
      required:true
    },
    discountAmount:{
      type: Number,
      required:true
    },
    termsCondition:{
      type: String,
      required:true
    },
    offerImage:{
      type: String,
      required:true
    },
    created: {
      type: Date,
      default: Date.now
    }
  });

const Coupen = mongoose.model('Coupen',CoupenSchema); 
module.exports =Coupen;