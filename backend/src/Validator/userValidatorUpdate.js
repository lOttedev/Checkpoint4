const Joi = require("joi");

const checkUserUpdate = (req, res, next) => {
  const userSchema = Joi.object({
    id: Joi.number(),

    firstname: Joi.string().max(45),

    lastname: Joi.string().max(45),

    mail: Joi.string().email({ minDomainSegments: 2 }),

    phone: [Joi.string().max(15).optional(), Joi.allow(null)],

    adress: [Joi.string().optional(), Joi.allow(null)],

    role: Joi.string(),

    password: Joi.string().pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    ),

    confirmPassword: [
      Joi.string().optional().valid(Joi.ref("password")),
      Joi.allow(""),
    ],
  }).with("password", "confirmPassword");

  const user = req.body;

  const { error } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    res.status(500).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = checkUserUpdate;
