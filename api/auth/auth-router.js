const router = require("express").Router();
const User = require("../users/users-model");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8); //2 üzeri 12
    const newUser = { username, password: hashedPassword };
    const result = await User.create(newUser);
    res.status(201).json({ message: `Welcome to here ${result.username}...` });
  } catch (err) {
    next(err);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const [registeredUser] = await User.getByFilter({ username });
    if (
      registeredUser &&
      bcrypt.compareSync(password, registeredUser.password)
    ) {
      req.session.user = registeredUser;
      res.json({ message: `Welcome back ${registeredUser.username}...` });
    } else {
      next({ status: 401, message: "Invalid credentials!..." });
    }
  } catch (err) {
    next(err);
  }
});
router.get("/logout", async (req, res, next) => {
  if (req.session && req.session.user) {
    const { username } = req.session.user;
    req.session.destroy((err) => {
      if (err) {
        next({ message: "Burası İnönü Buradan çıkış yok!..." });
      } else {
        res.set(
          "Set-Cookie",
          "titan=; Path=/; Expires=Mon, 01 Jan 1970 00:00:00"
        );
        res.json({ message: `Goodbye ${username}!...` });
      }
    });
  } else {
    next({ status: 400, message: "Zaten hiç gelmedin ki!..." });
  }
});
router.post("/password/reset", async (req, res, next) => {
  res.json({ message: "password reset working" });
});

module.exports = router;
