const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { validateAuth } = require("../middleware/auth");
const { validateToken, generateToken } = require("../configs/tokens");

router.post("/register", (req, res) => {
  const { email, name, password, lastName } = req.body;

  User.findOne({ where: { email } }).then((userExist) => {
    if (userExist) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    User.create({
      email,
      name,
      password,
      lastName,
    })
      .then((user) => {
        console.log("USER", user);
        res.status(201).send(user);
      })
      .catch((error) => {
        console.error(
          "Error al crear usuario:",
          error,
          "APELLIDOOOO",
          lastName
        );
        res.status(500).json({ error: "Error al crear el usuario" });
      });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);
      console.log("aca está el error33");

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
      };
      const token = generateToken(payload);

      res.cookie("token", token);
      res.send(payload);
    });
  });
});

router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
