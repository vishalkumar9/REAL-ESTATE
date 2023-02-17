const jwt = require("jsonwebtoken");
const HttpError = require("../schema/httpError");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") return next();
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        if (!token) {
            throw new Error("Authentication Failed!");
        }

        const decodedToken = jwt.verify(
            token,"something_private_which_i_dont_tell_to"
        );
        req.userData = { userId: decodedToken.userId };
        console.log(req.userData);
        next();
    } catch (err) {
        const error = new HttpError("Authentication Failed", 401);
        return next(error);
    }
};
