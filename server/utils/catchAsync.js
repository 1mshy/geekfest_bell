//function that catches errors and passes them to the next middleware
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}