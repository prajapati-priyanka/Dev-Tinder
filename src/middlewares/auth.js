// use to check Auth for all the http methods GET, POST, DELETE etc...
const authAdmin = (req,res,next)=>{
    console.log("checking Auth");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";

    if(!isAdminAuthorized){
        res.send(401).send("Admin is not authorized");
    }else{
        next();
    }
};

module.exports = {
    authAdmin : authAdmin
}
