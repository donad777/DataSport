var express = require('express');
var router = express.Router();
var categoryModel = require('./../model/category')
const JWT = require('jsonwebtoken');
const config = require("../config");
const checkToken = require('./checkToken')
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/**
 * @swagger
 * /category-add/add:
 *   post:
 *     summary: Thêm danh mục
 *     responses:
 *       200:
 *         description: Thêm danh mục thành công
 *       400:
 *         description: Thêm thất bại
 */
//http://192.168.93.25:3000/category-add/add
router.post('/add', async function (req, res, next) {
    try {
        const { name, image } = req.body
        const addcate = { name, image }
        const add = await categoryModel.create(addcate);
        res.status(200).json(add)
    } catch (error) {
        res.status(400).json({ error: e.message });
    }
})


/**
 * @swagger
 * /category-add/get:
 *   get:
 *     summary: Lấy danh mục
 *     responses:
 *       200:
 *         description: Lấy danh mục thành công
 *       400:
 *         description: Lấy thất bại
 */
//http://192.168.93.25:3000/category-add/get
router.get('/get', checkToken, async function (req, res, next) {
    try {
        const getcate = await categoryModel.find()
        res.status(200).json(getcate);
    } catch (error) {
        res.status(400).json({ error: e.message });
    }

})

module.exports = router;