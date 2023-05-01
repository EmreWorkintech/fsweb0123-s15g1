function protect(req,res,next){
    
    if(req.session && req.session.user){
        next();
    } else {
        next({status:401, message:"Buraya giremezsin!..."})
    }
    
}



module.exports= {
    protect
}