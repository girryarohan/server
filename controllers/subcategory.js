const Subcategory = require("../models/subcategory");
const slugify = require("slugify");
const Product = require("../models/product");

exports.create = async (req, res) => {
  // create a subcategory
  try {
    const { name, parent } = req.body;
    const subcategory = await new Subcategory({
      name,
      parent,
      slug: slugify(name),
    }).save();
    res.json(subcategory);
  } catch (err) {
    res.status(400).send("Create subcategory failed");
  }
};

exports.list = async (req, res) => {
  // get all subcategories
  try {
    res.json(await Subcategory.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    res.status(400).send("list subcategory failed");
  }
};

exports.read = async (req, res) => {
  // only one subcategory
  let subcategory = await Subcategory.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: subcategory })
    .populate("category")
    .exec();
  res.json({ subcategory, products });
};

exports.update = async (req, res) => {
  // update the subcategory
  const { name, parent } = req.body;
  try {
    const updated = await Subcategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, parent: parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("update subcategory failed");
  }
};

exports.remove = async (req, res) => {
  // delete the subcategory
  try {
    const deleted = await Subcategory.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("remove subcategory failed");
  }
};
