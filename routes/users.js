var express = require('express');
var router = express.Router();
var userModel = require('./../model/user')
const JWT = require('jsonwebtoken');
const config = require("../config");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Đăng kí
 *     responses:
 *       200:
 *         description: Đăng kí thành công
 *       400:
 *         description: Đăng kí thất bại
 */
//http://192.168.93.25:3000/users/register
router.post('/register', async function (req, res, next) {
  try {
    const { name, password, address, phonenumber } = req.body
    const adduser = { name, password, address, phonenumber }
    const add = await userModel.create(adduser);
    res.status(200).json(add)
  } catch (error) {
    res.status(400).json("Loi")
  }
})


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Đăng nhập
 *     responses:
 *       200:
 *         description: Đăng nhập
 *       400:
 *         description: Đăng nhập thất bại
 */
// http://192.168.93.25:3000/users/login
router.post('/login', async function (req, res, next) {
  try {
    const { name, password } = req.body
    const check = await userModel.findOne({ name: name, password: password });
    if (check) {

      const token = JWT.sign({ name: name, password: password }, config.SECRETKEY, { expiresIn: '20s' })
      const refreshToken = JWT.sign({ name: name }, config.SECRETKEY, { expiresIn: '1d' })

      res.status(200).json({ message: "Thanh Cong", token: token, refreshToken: refreshToken })
    } else {
      res.status(401).json("That bai")
    }
  } catch (error) {
    res.status(400).json('loi')
  }
})




/**
 * @swagger
 * /users/edit:
 *   post:
 *     summary: Cập nhật thông tin users 
 *     responses:
 *       200:
 *         description: Thay đổi thông tin thành công
 *       400:
 *         description: Thay đổi thông tin thất bại
 */
//http://192.168.111.77:3000/users/edit
router.post('/edit', async function (req, res, next) {
  try {
    const { id, name, password, phonenumber, address } = req.body
    const user = await userModel.findById(id)
    if (user) {
      user.name = name;
      user.password = password;
      user.phonenumber = phonenumber;
      user.address = address;
    }

    await user.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

module.exports = router;
