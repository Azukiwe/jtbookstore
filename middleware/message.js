function message(req, res, next) {
    console.log("This message it is coming from middleware");
    next();
}
module.exports = {message};