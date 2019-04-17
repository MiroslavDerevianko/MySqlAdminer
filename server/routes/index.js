var express = require('express');
var router = express.Router();

let model = require('../model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('HI I am API');
});


router.get('/tables', function(req, res, next) {
  model.getTables().then(data => {
    return res.json(data);
  })
  .catch(error => {
    return res.status(400).json(error);
  })
});

router.post('/table', function(req, res, next) {
  const table = req.body.table;
  model.getTable(table).then(data => {
    return res.json(data);
  })
  .catch(error => {
    return res.status(400).json(error);
  })
});

router.post('/query', function(req, res, next) {
  const table = req.body.table;
  const query = req.body.query;
  model.getQuery(table, query)
  .then(data => {
    return res.json(data);
  })
  .catch(error => {
    return res.status(400).json(error);
  })
});

router.post('/add', function(req, res, next) {
  const values = req.body.values;
  const table = req.body.table;
  model.addRow(table, values)
  .then(() => {
    return model.getTable(table)
  })
  .then(data => {
    return res.json(data);
  })
  .catch(error => {
    return res.status(400).json(error);
  })
});

router.post('/update', function(req, res, next) {
  const table = req.body.table;
  const query = req.body.query;
  const newvalues = req.body.newvalues;
  console.log(table, query, newvalues);
  model.updateRow(table, query, newvalues)
  .then(() => {
    return model.getTable(table)
  })
  .then(data => {
    return res.json(data);
  })
  .catch(error => {
    return res.status(400).json(error);
  })
});

router.post('/delete', function(req, res, next) {
  const table = req.body.table;
  const query = req.body.query;
  model.deleteRow(table, query)
  .then(() => {
    return model.getTable(table)
  })
  .then(data => {
    return res.json(data);
  })
  .catch(error => {
    return res.status(400).json(error);
  })
});

module.exports = router;
