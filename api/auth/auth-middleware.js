const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/config')

function protect(req,res,next){
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, JWT_SECRET, (err, decodedJWT)=> {
            if(err){
                next({
                    status:401, 
                    message: err.message
                })
            } else {
                req.decodedJWT = decodedJWT;
                next();
            }
        })
    } else {
        next({status:401, message:"Token yok!..."})
    }
   

    /* if(req.session && req.session.user){ 
        next();
    } else {
        
    } */
    
}

function onlyAdmins(req,res,next) {
    if(req.decodedJWT.role_name === "Admin"){
        next()
    } else {
        next({
            status: 403,
            message: "Buraya giriş izniniz yok!..."
        })
    }
}

const checkRole = (role) => (req,res,next)=> {
    if(req.decodedJWT.role_name === role){
        next()
    } else {
        next({
            status: 403,
            message: "Buraya giriş izniniz yok!..."
        })
    }
}



module.exports= {
    protect,
    onlyAdmins,
    checkRole
}