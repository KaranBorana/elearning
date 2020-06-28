var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('ohdshdsn');
  res.sendStatus(200).send({ 'message': 'OK' });
});

module.exports = router;
