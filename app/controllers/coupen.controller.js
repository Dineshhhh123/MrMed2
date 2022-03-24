const Coupen = require('../models/coupen.model.js');


exports.create = (req, res) => {

    Coupen.findById(req.params.coupenId, (err, data) => {
    
        if (!data) {


    const coupen = new Coupen({
        offerName:req.body.offerName,
        coupenCode:req.body.coupenCode,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        discountPercentage:req.body.discountPercentage,
        discountAmount:req.body.discountAmount,
        termsCondition:req.body.termsCondition,
        offerImage:req.body.offerImage
    });


    coupen.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
        message: err.message || "Some error occurred while creating the Coupen."
    });
});

}})
};


exports.findAll = (req, res) => {
    Coupen.find({}).sort({status:1,_id:-1})
    .then(coupen => {
        res.send(coupen);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving banner details."
        });
    });
};


exports.findOne = (req, res) => {
    Coupen.findById(req.params.coupenId)
    .then(coupen => {
        if(!coupen) {
            return res.status(404).send({
                message: "coupen not found with id " + req.params.coupenId
            });            
        }
        res.send(coupen);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "coupen not found with id " + req.params.coupenId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving banner with id " + req.params.coupenId
        });
    });
};



exports.update = (req, res) => {

    if(!req.body.name) {
        return res.status(400).send({
            message: "Banner Name can not be empty"
        });
    }


    Coupen.findByIdAndUpdate(req.params.coupenId, {
        offerName:req.body.offerName,
        coupenCode:req.body.coupenCode,
        startdate:req.body.startDate,
        endDate:req.body.endDate,
        discountPercentage:req.body.discountPercentage,
        discountAmount:req.body.discountAmount,
        termsCondition:req.body.termsCondition,
        offerImage:req.body.offerImage
    }, {new: true})
    .then(coupen => {
        if(!coupen) {
            return res.status(404).send({
                message: "Banner not found with id " + req.params.coupenId
            });
        }
        res.send(coupen);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Banner not found with id " + req.params.coupenId
            });                
        }
        return res.status(500).send({
            message: "Error updating Banner with id " + req.params.coupenId
        });
    });
};


exports.delete = (req, res) => {
    Coupen.findByIdAndRemove(req.params.coupenId)
    .then(coupen => {
        if(!coupen) {
            return res.status(404).send({
                message: "Banner not found with id " + req.params.coupenId
            });
        }
        res.send({message: "Banner deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Banner not found with id " + req.params.coupenId
            });                
        }
        return res.status(500).send({
            message: "Could not delete banner with id " + req.params.coupenId
        });
    });
};