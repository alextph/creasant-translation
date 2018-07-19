var express = require('express');
var mysql = require('mysql');
var log4js = require('log4js');
var _ = require('lodash');
var path = require('path');
var Q = require('q');
var squel = require("squel");
var bodyParser = require('body-parser')
var session = require('express-session')
var _prefix = 'mbt';

class ApiManager {

  constructor(config) {
    this.config = config;
    this.app = express();
    this.app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
    this.initRoutes();
  }

  authentication(req, res, next) {
    if (req.session.user) next()
    else res.status(500).send("authentication error")
  }

  createConnection(req, res, next){
    req.connection = mysql.createConnection(this.config);
    req.connection.connect(error=>{
      if (error) return res.status(500).send(error)
      next();
    })
  }

  getResourceList(req, res, next) {
    let schema = {}
    Q()
      .then(()=>{
        let sql = squel.select()
                    .from("information_schema.tables")
                    .where("table_type = 'BASE TABLE'")
                    .toString()
        return Q.ninvoke(req.connection, "query", sql);
      })
      .spread(result=>{
        return Q.all(_.map(result, (item)=>{
          let sql = `desc ${item.TABLE_NAME}`
          return Q.ninvoke(req.connection, "query", sql).spread(list => schema[item.TABLE_NAME] = list );
        }))
        .then(result=>{
          res.send(schema)
        })
      })
      .catch(error=> {
        return res.status(500).send(error);
      })
      .then(()=>{
        req.connection.end();
      })
  }

  getResource(req, res, next) {
    Q()
      .then(()=>{
        let sql = squel.select().from(_prefix + '_' + req.params.resource)
        sql = sql.where(`is_delete = ?`, 0)
        if (req.query) {
          _.each(req.query, (value, key)=>{
            sql = sql.where(`${key} = ?`, value)
          })
        }
        if (req.params.id) {
          sql = sql.where('id = ?', req.params.id)
        }
        sql = sql.toString();
        return Q.ninvoke(req.connection, "query", sql);
      })
      .spread(result=>{
        if (req.params.id) {
          result = _.head(result)
        }

        if (!result) return res.sendStatus(404)
        res.send(result)
      })
      .catch(error=> {
        return res.status(500).send(error);
      })
      .then(()=>{
        req.connection.end();
      })
  }

  searchResource(req, res, next) {
    Q()
      .then(() => {
        let sql = squel.select().from("country")
        if (req.query) {
          _.each(req.query, (value, key) => {
            sql = sql.where(`${key} = ?`, value)
          })
        }
        if (req.params.key) {
          sql = sql.where('name LIKE ?', '%'+req.params.key+'%')
        }
        sql = sql.toString();
        return Q.ninvoke(req.connection, "query", sql);
      })
      .spread(result => {
        if (req.params.id) {
          result = _.head(result)
        }

        if (!result) return res.sendStatus(404)
        res.send(result)
      })
      .catch(error => {
        return res.status(500).send(error);
      })
      .then(() => {
        req.connection.end();
      })
  }

  createResource(req, res, next) {
    Q()
      .then(()=>{
        let sql = squel.insert()
                    .into(req.params.resource)
                    .setFields(req.body)
                    .toString()
        return Q.ninvoke(req.connection, "query", sql);
      })
      .spread(result=>{
        if (!result) return res.sendStatus(404)
        req.body.id = result.insertId;
        res.send(req.body)
      })
      .catch(error=> {
        return res.status(500).send(error);
      })
      .then(()=>{
        req.connection.end();
      })
  }

  updateResource(req, res, next) {
    Q()
      .then(()=>{
        let sql = squel.update()
                    .table(req.params.resource)
                    .setFields(req.body)
                    .where(`id = '${req.params.id}'`)
                    .toString()
        return Q.ninvoke(req.connection, "query", sql);
      })
      .spread(result=>{
        if (!result || !result.affectedRows) return res.sendStatus(404)
      })
      .then(()=>{
        let sql = squel.select()
                    .from(req.params.resource)
                    .where(`id = '${req.params.id}'`)
                    .toString()
        return Q.ninvoke(req.connection, "query", sql);
      })
      .spread(result=>{
        if (!result) return res.sendStatus(404)
        res.send(_.head(result));
      })
      .catch(error=> {
        return res.status(500).send(error);
      })
      .then(()=>{
        req.connection.end();
      })
  }

  removeResource(req, res, next) {
    Q()
      .then(()=>{
        let sql = squel.delete()
                    .from(req.params.resource)
                    .where(`id = '${req.params.id}'`)
                    .toString()
        return Q.ninvoke(req.connection, "query", sql);
      })
      .spread(result=>{
        if (!result || !result.affectedRows) return res.sendStatus(404)
        res.sendStatus(200)
      })
      .catch(error=> {
        return res.status(500).send(error);
      })
      .then(()=>{
        req.connection.end();
      })
  }

  validateInput(req, res, next){
    if (_.isString(req.params.id)) req.params.id = req.params.id.replace(/['"]/g, '');
    if (_.isString(req.params.resource)) req.params.resource = req.params.resource.replace(/['"]/g, '');

    _.each(req.query, (value, key)=>{
      if(/['"]/.test(key)) {
        delete req.query[key]
      } else if(/['"]/.test(value)) {
        req.query[key] = value.replace(/'/g, "\\'");
      }
    })

    _.each(req.body, (value, key)=>{
      if(/['"]/.test(key)) {
        delete req.body[key]
      } else if(/['"]/.test(value)) {
        req.body[key] = value.replace(/'/g, "\\'");
      }
    })

    next()
  }

  manageAdmin(req, res, next) {
    if (req.params.action == 'login') {
      Q()
      .then(() => {
        let sql = squel.select().from("mbt_sys_admin")
                  .field("admin_id")
        sql = sql.where(`is_active = ?`, 1);
        sql = sql.where(`is_delete = ?`, 0);
        if (req.query) {
          _.each(req.query, (value, key) => {
            sql = sql.where(`${key} = ?`, value)
          })
        }
        sql = sql.toString();
        return Q.ninvoke(req.connection, "query", sql);
      })
      .spread(result => {
        result = _.head(result)

        if (!result) return res.sendStatus(404)

        req.session.user = result

        console.log(req.session.user)
        res.send(result)
      })
      .catch(error => {
        return res.status(500).send(error);
      })
      .then(() => {
        req.connection.end();
      })
    } else if (req.params.action == 'fetchUser') {
      res.send(req.session.user)
      // Q()
      //   .then(() => {
      //     let sql = squel.select().from("mbt_sys_admin")
      //               .field("name")
      //               .field("email")
      //               .field("profile_pic")
      //               .field("level")
      //     sql = sql.where(`is_active = ?`, 1);
      //     sql = sql.where(`is_delete = ?`, 0);
      //     if (req.query) {
      //       _.each(req.query, (value, key) => {
      //         sql = sql.where(`${key} = ?`, value)
      //       })
      //     }
      //     sql = sql.toString();
      //     return Q.ninvoke(req.connection, "query", sql);
      //   })
      //   .spread(result => {
      //     if (req.params.id) {
      //       result = _.head(result)
      //     }

      //     if (!result) return res.sendStatus(404)
      //     res.send(result)
      //   })
      //   .catch(error => {
      //     return res.status(500).send(error);
      //   })
      //   .then(() => {
      //     req.connection.end();
      //   })
    } else if (req.params.action == 'logout') {
      delete req.session.user
      res.send('ok')
    }
  }

  initRoutes() {
    this.app.use(bodyParser.json())
    this.app.get(`/api/search/:key`, this.validateInput.bind(this), this.createConnection.bind(this), this.searchResource.bind(this))
    this.app.post(`/api/admin/:action`, this.validateInput.bind(this), this.createConnection.bind(this), this.manageAdmin.bind(this))
    this.app.get(`/api/admin/list/:resource`, this.validateInput.bind(this), this.createConnection.bind(this), this.getResource.bind(this))

    this.app.get(`/api/:resource/:id?`, this.authentication.bind(this), this.validateInput.bind(this), this.createConnection.bind(this), this.getResource.bind(this))
    this.app.post(`/api/:resource`, this.authentication.bind(this), this.validateInput.bind(this), this.createConnection.bind(this), this.createResource.bind(this))
    this.app.delete(`/api/:resource/:id?`, this.authentication.bind(this), this.validateInput.bind(this), this.createConnection.bind(this), this.removeResource.bind(this))
    this.app.put(`/api/:resource/:id`, this.authentication.bind(this), this.validateInput.bind(this), this.createConnection.bind(this), this.updateResource.bind(this))
  }
}

exports = module.exports = ApiManager;