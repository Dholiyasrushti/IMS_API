    const storage = require('node-persist');
    // const role = require('../model/role');
    storage.init( /* options... */)
const bcrypt= require('bcrypt');
const admin = require('../model/admin');
var jwt = require('jsonwebtoken');

exports.add_admin = async (req,res) =>{
     var b_pass = await bcrypt.hash(req.body.admin_pass,10);
     req.body.admin_pass = b_pass;
    //  req.body.image = req.file.originalname;

     var data = await admin.create(req.body);
     res.status(200).json({
        status:"Admin Insert",
        data
     })
}

exports.admin_delete = async(req,res) =>{
    
        var id = req.params.id;
        var data = await admin.findByIdAndDelete(id,req.body);
        res.status(200).json({
            status:"Admin Delete"
        })
    
}
exports.admin_update = async (req, res) => {
 
    var id = req.params.id;
    var data = await admin.findByIdAndUpdate(id, req.body);

    res.status(200).json({
      data,
      status: "data-updated.....!",
    });
 
};
exports.viewadmin_update = async(req,res) =>{

        var id = req.params.id;
        var data = await admin.findById(id).populate('role').populate('branch');
        res.status(200).json({
            status:"Admin update",
            data
        })
    
}

exports.logoutadmin = async(req,res)=>{
    await storage.clear('admin-login');
    res.status(200).json({
        status:" logout "
    })
}

exports.view_admin = async(req,res) =>{
    
        var data = await admin.find().populate('role').populate('branch');
        res.status(200).json({
            status:"Admin View",
            data
        })
    
}

exports.admin_login = async (req, res) => {
    var status = await storage.getItem("admin-login");

  if (status == undefined) {
    // var name = await admin.find({ name: req.body.name });
    var email = await admin.findOne({admin_email:req.body.admin_email});

    if (email) {
      bcrypt.compare(
        req.body.admin_pass,
        email.admin_pass,
        async function (err, result) {
          if (result == true) {
            await storage.setItem(' -login',email.id);
            const token = jwt.sign({ adminId: admin._id }, 'IMS', { expiresIn: '1h' });
            res.status(200).json({
              status: "login success",
              token
            });
          } else {
            res.status(200).json({
              status: "Check Your Email and Password(1)",
            });
          }
        }
      );
    } else {
      res.status(200).json({
        status: "Check Your Email and Password(2)",
      });
    }
  } else {
    res.status(200).json({
      status: "admin is already login",
    });
  }

};
exports.find_admin = async(req,res) =>{
    
        var search = req.query;
        var data = await admin.find(search)
        res.status(200).json({
            status:"Admin find",
            data
        })
    
}