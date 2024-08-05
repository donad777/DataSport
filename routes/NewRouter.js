var express = require('express');
var router = express.Router();
var newModel = require("../model/new1")
/* GET home page. */

// router.post('/add', function (req, res, next) {
//     res.render('index', { title: 'Express' });
// });



/**
 * @swagger
 * /news/add:
 *   post:
 *     summary: Thêm tin tức
 *     responses:
 *       200:
 *         description: Thêm tin tức
 *       400:
 *         description: Thêm thất bại
 */
// http://192.168.93.25:3000/news/add
router.post('/add', async function (req, res, next) {
    try {
        const { name, image } = req.body;
        const addNew = { name, image };
        const addnew1 = await newModel.create(addNew)
        res.status(200).json(addnew1);
    } catch (error) {
        res.status(400).json({ error: e.message });
    }

})


/**
 * @swagger
 * /news/get:
 *   get:
 *     summary: Lấy danh sách tin tức
 *     responses:
 *       200:
 *         description: Lấy ra tin tức
 *       400:
 *         description: Lấy thất bại
 */
// http://192.168.93.25:3000/news/get
router.get('/get', async function (req, res, next) {
    try {
        const addnew1 = await newModel.find()
        res.status(200).json(addnew1);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

})


module.exports = router;