const JoiBase = require("joi");
const JoiDate = require("@joi/date");

const Joi = JoiBase.extend(JoiDate);

function validateRegisterUser(req, res, next) {
  // create schema object
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    gender: Joi.string().valid("male", "female", "other").required(),
    dob: Joi.date().format("DD/MM/YYYY"),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    // on fail return comma separated errors
    return res.status(400).json({
      message: `Validation error: ${error.details
        .map((x) => x.message)
        .join(", ")}`,
    });
  } else {
    // on success replace req.body with validated value and trigger next middleware function
    req.body = value;
    return next();
  }
}

module.exports = { validateRegisterUser };
