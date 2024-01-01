const { validateToken } = require("../configs/tokens");
const { User } = require("../models");

async function validateAuth(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) return res.sendStatus(401);
  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);
  console.log(user);
  const updatedUser = await User.findByPk(user.id);
  const payload = {
    name: updatedUser.name,
    email: updatedUser.email,
    lastName: updatedUser.lastName,
    id: updatedUser.id,
    isAdmin: updatedUser.isAdmin,
  };

  req.user = payload;
  next();
}

module.exports = { validateAuth };
