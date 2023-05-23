function errorHandler(err, req, res, next){
    if(err.name === "UnauthorisedError") {
        return res.status(401).json({message: "The User is not authorized"});
    }
    if(err.name === "ValidationError"){
        return res.status(401).json({message: err})
    }

    return res.status(500).json(err)
}

module.exports = {errorHandler}