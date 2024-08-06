const Product = require("../models/Product");

//hàm lấy danh sách sản phẩm
exports.getList = async (req, res) => {
  try {
    //B1: gửi query để lấy data về
    var products = await Product.find();
    //B2: truyền data sang cho giao diện
    res.render("list", { products });
  } catch (error) {
    console.log(error);
  }
};

//trả về form thêm mới
exports.create = (req, res) => {
  res.json({ message: "Create form" });
};

//tạo mới
exports.save = async (req, res) => {
  try {
    //B1: lấy data ng dùng nhập vào form
    var newProduct = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.file.filename,
    };
    //B2: lưu data vào trong db
    var product = await Product.create(newProduct);
    if (product) {
      console.log("create success");
      res.json({ message: "Create successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

//trả về form sửa
exports.edit = async (req, res) => {
  try {
    var product = await Product.findById(req.params.id);
    if (product) {
      res.render("edit", { product });
    } else {
      console.log("Không tìm thấy product tương ứng");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.update = async (req, res) => {
  try {
    //B1: lấy data ng dùng nhập vào form
    var updateProduct = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.file.filename,
    };
    //B2: lưu data vào trong db
    var product = await Product.findByIdAndUpdate(req.params.id, updateProduct);
    if (product) {
      console.log("update success");
      res.json({ message: "Update successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.delete = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Delete successfully" });
  } catch (error) {
    console.log(error);
  }
};

//API
exports.apiGetList = async (req, res) => {
  try {
    var products = await Product.find();
    res.status(200).json({ data: products });
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
};

exports.apiDetail = async (req, res) => {
  try {
    var product = await Product.findById(req.params.id);
    res.status(200).json({ data: product });
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
};

exports.apiCreate = async (req, res) => {
  try {
    //B1: lấy data ng dùng nhập vào form
    var newProduct = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.file.filename,
    };
    //B2: lưu data vào trong db
    var product = await Product.create(newProduct);
    if (product) {
      res.status(200).json({ message: "Create successfully", data: product });
    }
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
};

exports.apiUpdate = async (req, res) => {
  try {
    //B1: lấy data ng dùng nhập vào form
    var updateProduct = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.file.filename,
    };
    await Product.findByIdAndUpdate(req.params.id, updateProduct);
    res.status(200).json({ message: "Update successfully" });
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
};

exports.apiDelete = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Delete successfully" });
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
};
