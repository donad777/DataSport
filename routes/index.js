var express = require('express');
var router = express.Router();
var modelCate = require('../model/category');
var modelProd = require('../model/product');
const product = require('../model/product');
var modelUser = require('../model/user');
const user = require('../model/user');

/* GET home page. */
//http://localhost:3000/
router.get('/', async function (req, res, next) {
  var _list = await modelProd.find().populate("category");

  res.render('index', { title: "Quản lý sản phẩm", list: _list });
});


//find products by keywords
router.get("/find", async function (req, res, next) {
  const { name } = req.query

  const _list = await modelProd.find({ name: { $regex: `^${name}`, $options: 'i' } }).populate("category");
  // new RegExp, bạn có thể thực hiện tìm kiếm linh hoạt hơn
  // cho phép tìm kiếm các phần của chuỗi thay vì khớp chính xác toàn bộ chuỗi.
  //       new RegExp(pattern, flags)
  //       flags: Các cờ (flags) cho biểu thức chính quy. Các cờ phổ biến bao gồm:
  //                 'i': Không phân biệt chữ hoa chữ thường(case -insensitive).
  //                 'g': Tìm kiếm toàn bộ chuỗi(global search), thay vì chỉ tìm kiếm lần xuất hiện đầu tiên.
  //                 'm': Tìm kiếm nhiều dòng(multiline).
  // pattern: Đây là mẫu (pattern) của biểu thức chính quy. Có thể là một chuỗi ký tự mô tả mẫu 
  res.render('index', { title: "Quản lý sản phẩm", list: _list });
})


//thêm
//localhost:3000/add
//hiển thị trang thêm
router.get('/add', async function (req, res, next) {

  var listCate = await modelCate.find();

  res.render('add', { listCate: listCate });
});

//xử lý form trang thêm
router.post('/add-product', async function (req, res, next) {
  const { name, price, quantity, image, description, category } = req.body;

  const newItem = { name, price, quantity, image, description, category };
  await modelProd.create(newItem);

  res.redirect("/");

});

//localhost:3000/delete/12233
router.get("/delete/:id", async function (req, res, next) {
  const { id } = req.params;
  await modelProd.findByIdAndDelete(id);
  res.redirect("/");
});


//hien thi trang edit
router.get('/edit/:id', async function (req, res, next) {
  const { id } = req.params
  var product = await modelProd.findById(id).populate("category")
  var listCate = await modelCate.find();
  res.render('edit', { listCate: listCate, product: product });
});

// Xử lý việc chỉnh sửa sản phẩm
router.post('/edit/:id', async function (req, res, next) {
  const { id } = req.params
  const { name, price, quantity, image, description, category } = req.body
  await modelProd.findByIdAndUpdate(id, { name, price, quantity, image, description, category })
  res.redirect("/");
})


// đăng kí
router.post('/register', async function (req, res, next) {
  const { name, password } = req.body
  const register = { name, password }
  if (!name || !password) {
    res.render('register');
    return;
  }
  await modelUser.create(register);
  res.redirect("/login");
})

//đăng nhập
// Đăng nhập hoặc đăng ký
router.post('/login-register', async function (req, res, next) {
  const { name, password, action } = req.body;
  if (action === "login") {
    // Kiểm tra nếu các trường trống
    if (!name || !password) {
      res.render('login');
      return;
    }
    try {
      const user = await modelUser.findOne({ name: name, password: password });
      if (user) {
        res.redirect("/");
      } else {
        res.render('login');
      }
    } catch (error) {
      next(error);
    }
  } else if (action === "register") {
    res.redirect("/register");
  }
});


module.exports = router;