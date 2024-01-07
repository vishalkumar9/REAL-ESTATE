const jwt = require("jsonwebtoken");
const HttpError = require("../schema/httpError");

module.exports = (req, res, next) => {
    console.log(req);
    if (req.method === "OPTIONS") return next();
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error("Authentication failed!");
        }

        const decodedToken = jwt.verify(
            token,process.env.SECRETKEY,
        );
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        const error = new HttpError("Authentication Failed", 401);
        return next(error);
    }
};
