const express = require("express");
const router = express.Router();
const {getCategoryId,createCategory,getCategory,removeCategory,getALLCategory,updateCategory}=require("../controllers/category");
const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth");
const {getUserById,}=require("../controllers/user");

//create

router.param("userId", getUserById);
router.param("categoryId",getCategoryId);

router.post("/category/create/:userId",
isSignedIn,isAuthenticated,isAdmin,
createCategory);

//read
router.get("/category/:categoryId",getCategory);
router.get("/categories",getALLCategory);

//update
router.put("/category/:categoryId/:userId",
isSignedIn,isAuthenticated,isAdmin,
updateCategory);

//delete

router.delete("/category/:categoryId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
removeCategory);

module.exports=router;
