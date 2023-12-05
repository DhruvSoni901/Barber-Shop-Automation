const protected = (req,res,next)=>{
    if(req.session.userAuth){
        next();
    }else{
        return res.status(400).json({ message: 'Not logged in' });
    }
}
module.exports = protected;