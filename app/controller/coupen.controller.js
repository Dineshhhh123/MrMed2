var mongoose = require('mongoose');
const { authSchema } = require('../model/coupen.model.js');
const Coupon = mongoose.model('Coupon')


exports.create = async(req, res) => {
try{
const result = await authSchema.validateAsync(req.body)
Coupon.findById(req.params.couponId, (err, data) => {

    if (!data) {
    const coupon = new Coupon({
    OfferName:req.body.OfferName,
    CouponCode:req.body.CouponCode,
    StartDate:req.body.StartDate,
    EndDate:req.body.EndDate,
    DiscountPercentage:req.body.DiscountPercentage,
    DiscountAmount:req.body.DiscountAmount,
    TermsAndCondition:req.body.TermsAndCondition,
    OfferPosterOrImage:req.body.OfferPosterOrImage,
    Status:req.body.Status
});


coupon.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the Coupon."
    });
});

}})
}catch(error) {
    res.status(409).json({ message: error?.message || error })
  }
};


exports.findAll = (req, res) => {
    Coupon.find({}).sort({_id:-1})
    .then(coupon => {
        res.send(coupon);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving coupon details."
        });
    });
};
exports.findByStatus = (req, res) => {
    Coupon.find({Status:false})
    .then(coupon => {
        res.send(coupon);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving coupon details."
        });
    });
};


exports.findOne = (req, res) => {
    Coupon.findById(req.params.couponId)
    .then(coupon => {
        if(!coupon) {
            return res.status(404).send({
                message: "coupon not found with id " + req.params.couponId
            });            
        }
        res.send(coupon);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "coupon not found with id " + req.params.couponId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving coupon with id " + req.params.couponId
        });
    });
};



exports.update = (req, res) => {
    if(!req.body.OfferName) {
        return res.status(400).send({
            message: "Offer Name can not be empty"
        });
    }

    
    Coupon.findByIdAndUpdate(req.params.couponId, {
        OfferName:req.body.OfferName,
        CouponCode:req.body.CouponCode,
        StartDate:req.body.StartDate,
        EndDate:req.body.EndDate,
        DiscountPercentage:req.body.DiscountPercentage,
        DiscountAmount:req.body.DiscountAmount,
        TermsAndCondition:req.body.TermsAndCondition,
        OfferPosterOrImage:req.body.OfferPosterOrImage,
        Status:req.body.Status
    }, {new: true})
    .then(coupon => {
        if(!coupon) {
            return res.status(404).send({
                message: "Coupon not found with id " + req.params.couponId
            });
        }
        res.send(coupon);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Coupon not found with id " + req.params.couponId
            });                
        }
        return res.status(500).send({
            message: "Error updating Coupon with id " + req.params.couponId
        });
    });
};



exports.delete = (req, res) => {
    Coupon.findByIdAndRemove(req.params.couponId)
    .then(coupon => {
        if(!coupon) {
            return res.status(404).send({
                message: "Coupon not found with id " + req.params.couponId
            });
        }
        res.send({message: "Coupon deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Coupon not found with id " + req.params.couponId
            });                
        }
        return res.status(500).send({
            message: "Could not delete coupon with id " + req.params.couponId
        });
    });
};