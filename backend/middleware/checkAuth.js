const jwt = require("jsonwebtoken");
const HttpError = require("../schema/httpError");
const Config = require("../config");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") return next();
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error("Authentication failed!");
        }

        const decodedToken = jwt.verify(
            token,Config.SECRET_KEY,
        );
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        const error = new HttpError("Authentication Failed", 401);
        return next(error);
    }
};
