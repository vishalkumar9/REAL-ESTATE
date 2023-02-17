const formidable = require('formidable');
const HttpError = require("../schema/httpError");
const formDataParser = (req, res, next) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error(err);
            const error = new HttpError('Unable to parse form data', 500);
            return next(error);
        }
        req.body = { ...fields, ...files };
        next();
    });
};

module.exports = formDataParser;