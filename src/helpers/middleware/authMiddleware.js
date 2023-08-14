const jwt = require("jsonwebtoken");

module.exports = {
    checkLogin : (req,res,next)=>{
        const bearer = req.header("access_token");
        if(!bearer){
            res.status(401).send({
                msg: "cannot access",
                status: 401,
                error: "You must log in"
            })
        }else{
            const token = bearer.split(" ")[1]
            req.token = token
            try{
                const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
                req.decodedToken = decodedToken; 
                next();
            }
            catch(error){
                res.status(401).send({
                    msg: "cannot access",
                    status: 401,
                    error: "Invalid token",
                })
            }
            
        }
    }
}