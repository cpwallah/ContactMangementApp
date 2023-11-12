const {constants}=require("../constants");
const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode?res.statusCode:500;

    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({title:"Validation failed",message:err.message,stackTrace:err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title:"Not found",message:err.message,stackTrace:err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.json({title:"Unauthorised",message:err.message,stackTrace:err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title:"Forbidden",message:err.message,stackTrace:err.stack});
            break;
        case constants.SERVER_ERROR:
            res.json({title:"Server Error",message:err.message,stackTrace:err.stack});
            break;
        default:
            console.log("no error ,all good");
            break;
    }
    res.json({title:"Not found",message:err.message,stackTrace:err.stack});
};
module.exports=errorHandler;