const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .sort("asc")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: " product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  //
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    const { name, description, price, category, stock } = fields;
    if (!name || !description || !price || !stock) {
      return res.status(400).json({
        error: " please inclued all field",
      });
    }

    //todo restriction on field
    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 1024 * 1024 * 3) {
        return res.status(400).json({
          error: " file size big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //console.log(product)
    //save to db
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "failed to save in db",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct=(req,res)=>{
    const product=req.product;

    product.remove((err,product)=>{
        if(err){
            return res.status(400).json({
                error : "failed to delete product"
            });
        }
        res.json({
            message: `successfully deleted ${product}`
        })
    })
}

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //updation
    let product = req.product;
    product = _.extend(product, fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 1024 * 1024 * 3) {
        return res.status(400).json({
          error: " file size big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //console.log(product)
    //save to db
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "failed to update",
        });
      }
      res.json(product);
    });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, prod) => {
      if (err) {
        return res.status(400).json({
          error: "no product in db",
        });
      }
      res.json(prod);
    });
};

exports.updatestock = (req, res, next) => {
  let ops = req.body.order.product.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  Product.bulkWrite(ops, {}, (err, prod) => {
    if (err) {
      return res.status(400).json({
        error: "bulk opt failed",
      });
    }
    next();
  });
};
exports.getAllUniqueCategories = (req, res, next) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "np category",
      });
    }
    res.json(category);
  });
};
