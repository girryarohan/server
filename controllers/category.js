const Category = require("../models/category");
const Subcategory = require("../models/subcategory");
const Product = require("../models/product");

const slugify = require("slugify");
exports.create = async (req, res) => {
  // create a category
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    res.status(400).send("Create category failed");
  }
};

exports.list = async (req, res) => {
  // get all categories
  try {
    res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    res.status(400).send("list category failed");
  }
};

exports.read = async (req, res) => {
  // only one category
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  // res.json(category);
  const products = await Product.find({ category: category })
    .populate("category")
    .exec();

  res.json({
    category,
    products,
  });
};

exports.update = async (req, res) => {
  // update the category
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("update category failed");
  }
};

exports.remove = async (req, res) => {
  // delete the category
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("remove category failed");
  }
};

// get all subcategories  associated with selected (parent) category 81
exports.getAssoSubcategories = (req, res) => {
  Subcategory.find({ parent: req.params._id }).exec((err, subcategories) => {
    if (err) console.log(err);
    res.json(subcategories);
  });
};
