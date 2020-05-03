const express = require("express");
const router= express.Router();

const{isAdmin,isAuthenticated,isSignedIn}= require("../controllers/auth");
const{getUserById}= require("../controllers/user");
const{getProductById,createProduct,photo,updateProduct,deleteProduct,getProduct,getAllProducts,getAllUniqueCategories}= require("../controllers/product");

router.param("userId",getUserById);
router.param("productId",getProductById);

//create
router.post("/product/create/:userId",isSignedIn,isAdmin,isAuthenticated,createProduct);

//read
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)

//delete
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct);

//update
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct);

//listing
router.get("/product",getAllProducts)


router.get("/product/categories",getAllUniqueCategories);

module.exports=router;