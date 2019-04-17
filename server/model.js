
const mysql = require('mysql');
const config = require('./config');

let data = null;
let con = null;

module.exports.createConnect = function () {
  con = mysql.createConnection(config.connectionConfig());

  con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });
}

module.exports.getTables = () => {
  const query = `SELECT table_name FROM information_schema.tables WHERE table_schema = '${config.dbname}';`;
  return new Promise((resolve, reject) => {
    con.query(query, (err, result) => {
      if (err) reject(err);
      console.log(result);
      resolve(result);
    });
  });
}

module.exports.getTable = (table) => {
  const query = `SELECT * FROM ${config.dbname}.${table};`;
  return new Promise((resolve, reject) => {
    con.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

module.exports.getQuery = function (table, params) {
  const query = `select * from ${config.dbname}.${table} where ${Object.entries(params).reduce(function(prev, [key, value]) {
    if (typeof value === 'number') return prev + `${table}.${key} = '${value}' and `;
    return prev + `${table}.${key} like '%${value}%' and `;
  }, '')}true`;
  console.log(query);
  return new Promise((resolve, reject) => {
    con.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

module.exports.addRow = function(table, values) {
  const query = `INSERT INTO ${config.dbname}.${table} (${Object.keys(values).reduce((prev, key) => prev + `,${key}`, '').slice(1)}) 
  VALUES (${Object.values(values).reduce((prev, value) => prev + `,${value}`, '').slice(1)})`;
  console.log(query);
  return new Promise((resolve, reject) => {
    con.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

module.exports.deleteRow = function (table, params) {
  const query = `delete from ${config.dbname}.${table} where ${Object.entries(params).reduce(function(prev, [key, value]) {
    return prev + `${table}.${key} = '${value}' and `;
  }, '')}true`;
  console.log(query);
  return new Promise((resolve, reject) => {
    con.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

module.exports.updateRow = function (table, params, newvalues) {
  const query = `UPDATE ${config.dbname}.${table} SET 
  ${Object.entries(newvalues).reduce(function(prev, [key, value], index, array) {
    if (index === array.length -1) return prev + `${table}.${key} = '${value}' `;
    return prev + `${table}.${key} = '${value}', `;
  }, '')}
  where
  ${Object.entries(params).reduce(function(prev, [key, value]) {
    return prev + `${table}.${key} = '${value}' and `;
  }, '')}true
  ;`;
  console.log(query);
  return new Promise((resolve, reject) => {
    con.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}