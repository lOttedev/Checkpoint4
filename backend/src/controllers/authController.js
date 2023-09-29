const models = require("../models");
const { verify } = require("../helpers/hashingHelpers");
const { encodeJWT } = require("../helpers/jwtHelper");

const signIn = async (req, res) => {
  const passwordVerif = await verify(
    req.user.password,
    req.body.passwordConnection
  );

  if (!passwordVerif) return res.sendStatus(500);

  delete req.user.passwordConnection;
  const token = encodeJWT(req.user);

  res.cookie("auth_token", token, { httpOnly: true, secure: false });

  return res.status(200).json(req.user);
};

const signUp = async (req, res) => {
  const [result] = await models.user.insert(req.body);
  try {
    if (result.affectedRows) {
      delete req.body.confirmPassword;
      delete req.body.password;
      res.sendStatus(201);
    } else {
      res.status(500);
    }
  } catch (err) {
    console.error(err);
  }
};

const logOut = (req, res) => {
  res.clearCookie("auth_token").sendStatus(200);
};

module.exports = { signIn, signUp, logOut };
