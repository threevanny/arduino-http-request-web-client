var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Arduino' });
});

router.get('/arduino', (req, res, next) => {
  let l = req.query.l || "NO DATA"
  let t = req.query.t || "NO DATA"
  let h = req.query.h || "NO DATA"
  res.json({
    isOk: "true",
    'luz': l,
    'tem': t,
    'hum': h
  });
})

module.exports = router;
