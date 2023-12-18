const jwt = require('jsonwebtoken')
require('dotenv').config()
const Customer = require('../models/customer-accounts')
const Admin = require('../models/admin-accounts')
const adminMiddleware =  (req,resp,next)=>{
    const token = req.headers.authorization
    try{
        if(token){
            const _id = jwt.verify(token, process.env.SECRET_KEY)

            if(Customer.findOne({ _id })){
                req.accountId = _id
                req.userType = 'customers'
                next();
            } else if(Admin.findOne({ _id })){
                req.accountId = _id
                req.userType = 'admins'
                next();
            }
        }
        else{
            console.log("Access denied")
            resp.json({success:false, message:'Access denied'})
        }
    }
    catch(err){
        console.log('err in admin middleware')
        resp.json({success:false, message:err})
    }
}

module.exports=adminMiddleware