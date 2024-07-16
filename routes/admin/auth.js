const usersRepo = require("../../repositories/users");
const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireValidEmail,
  requireExistingPasswordForUser,
} = require("./validators");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  async (req, res) => {
    const error = validationResult(req);
    res.send(signupTemplate({ req, error }));
    const { email, password, passwordConfirmation } = req.body;

    const user = await usersRepo.create({ email, password });
    req.session.userId = user.Id;

    res.send("Account Created!");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  "/signin",
  [requireValidEmail, requireExistingPasswordForUser],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.send(signinTemplate({ error }));
    }

    const { email } = req.body;
    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.Id;
    res.send("You are signed in!");
  }
);

module.exports = router;
