const jwt= require('jsonwebtoken');
module.exports = (req,res, next)=>{
    try{
    const token = req.headers.authorization;
    if(token){
    jwt.verify(token,'webTokenSecret');
    };
    next();
    }
    catch (err){
        res.status(401).json({message:'Token not found'})
    }
}




//const request = require('request')
// request.post('http://www.kohat.edu.pk/auth', {
//   json: {
//     todo: 'Buy the milk'
//   }
// }, (error, res, body) => {
//   if (error) {
//     console.error(error)
//     return
//   }
//   console.log(`statusCode: ${res.statusCode}`)
//   console.log(body)
// });
