const express = require('express');
const router = express.Router();
const Data = require('../models/Data')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Arduino' });
});

router.get('/arduino', async (req, res, next) => {
  let t = req.query.t || -404
  let i = req.query.i || -404

  const data = new Data({
    temperature: t,
    illumination: i
  })

  await data.save((err) => {
    if (err) console.error("Error saving Data!", err);
    else
      res.json({
        isOk: true,
        message: `Data T:${t} & I:${i} have been saved`,
      });
  });
})

router.get('/getdata', async (req, res) => {
  const limit = 1
  await Data.find({}, (err, docs) => {
    if (err) console.error("Error getting Data!", err)
    else res.json(docs)
  }).sort({ 'createdAt': 'desc' }).limit(limit)
})

module.exports = router;