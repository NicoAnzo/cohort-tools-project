
const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

const User = require("../models/User.model");


router.get("/api/user/:userId", isAuthenticated, (req, res) => {
  
    const { userId } = req.params;
  
    User.findOne({_id: userId})
      .then((userFromDB) => {
        res.json(userFromDB)
      })
      .catch((error) => {
        next(error);
      });
  });

  module.exports = router;
  