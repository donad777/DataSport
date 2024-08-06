var express = require('express');
var router = express.Router();
var productModel = require("../model/product")
var categoryModel = require("../model/category")
const JWT = require('jsonwebtoken');
const config = require("../config");
/* GET home page. */

// router.post('/add', function (req, res, next) {
//     res.render('index', { title: 'Express' });
// });



/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: Thêm sản phẩm
 *     parameters:
 *       - in: path
 *         name: Name product
 *         required: true
 *         schema:
 *           type: string    
 *     responses:
 *       200:
 *         description: Thêm sản phẩm thành công
 *       400:
 *         description: Thêm sản phẩm thất bại
 */
// http://192.168.93.25:3000/products/add
router.post('/add', async function (req, res, next) {
    try {
        const { name, price, rate, image, description, quantity, category } = req.body;
        const addProduct = { name, price, rate, image, description, quantity, category };
        const product = await productModel.create(addProduct)
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: e.message });
    }

})


/**
 * @swagger
 * /products/category/{categoryId}:
 *   get:
 *     summary: Lấy sp theo danh mục
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string    
 *     responses:
 *       200:
 *         description: Lấy ra danh sách sản phẩm
 *       400:
 *         description: Lấy ra thất bại
 */
// http://192.168.93.25:3000/products/category/669bc7987ccd6d09dbaf0709
router.get('/category/:categoryId', async function (req, res, next) {
    try {
        const categoryId = req.params.categoryId;
        const products = await productModel.find({ category: categoryId });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;