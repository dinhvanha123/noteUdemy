const auth = async (req, res, next) =>{
    console.log('authenticate');
    next()
}
module.exports =auth;