const express = require("express");
const router = express.Router();

const { getUserById, getUser ,getusers, updateUser,userPurchaseList} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.get("/users", getusers);

router.put("/user/:userId",isSignedIn, isAuthenticated,updateUser);
router.put("orders/user/:userId",isSignedIn, isAuthenticated,userPurchaseList);

module.exports = router;
