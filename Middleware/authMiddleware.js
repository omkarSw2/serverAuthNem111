const jwt = require("jsonwebtoken");
const { blackList } = require("../blackList");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    if (blackList.includes(token)) {
      return res.status(401).send({ msg: "Please Login Again !!" });
    }

    jwt.verify(token, "masai", (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: err });
      }

      next();
    });
  } else {
    res.status(401).send({ msg: "Token not provided" });
  }
};

module.exports = { auth };
