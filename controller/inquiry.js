const storage = require('node-persist');
const inquiry = require('../model/inquiry');
// const role = require('../model/role');
storage.init( /* options... */);


exports.inquiry = async (req,res) =>{
    
        var data = await inquiry.create(req.body);
        res.status(200).json({
            status:"inquiry Insert",
            data
         })

    
}

exports.inquiry_delete  = async  (req,res) =>{
   
    var id = req.params.id;
    var data = await inquiry.findByIdAndDelete(id,req.body);
    res.status(200).json({
        status:"inquiry Delete"
    })
 
}

exports.inquiry_update = async(req,res) =>{
    
        var id = req.params.id;
        var data = await inquiry.findByIdAndUpdate(id,req.body);
        res.status(200).json({
            status:"inquiry update",
            data
        })
    
}
exports.viewinquiry_update = async(req,res) =>{
    
        var id = req.params.id;
        var data = await inquiry.findById(id);
        res.status(200).json({
            status:"inquiry update",
            data
        })
    
}
exports.find_inquiry = async(req,res) =>{
    
        var search = req.query;
        var data = await inquiry.find(search)
        res.status(200).json({
            status:"inquiry find",
            data
        })
     
}

exports.view_inquiry = async(req,res) =>{
    
        var data = await inquiry.find().populate('branch').populate('reference').populate({path:'inquiry_by',populate:[{path:'role'},{path:'branch'}]}).populate('status');
        res.status(200).json({
            status:"inquiry View",
            data
        })
    
}

