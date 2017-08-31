"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _devourClient = require("devour-client");

var _devourClient2 = _interopRequireDefault(_devourClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import Request from "es6-request"

// const request = require("es6-request");

/* for Production */
var baseUrl = "http://54.202.144.125:3001/api/v1";
var authUrl = "http://54.202.144.125:3001/users";

/* for Development */
// const  baseUrl = "http://192.168.0.109:3001/api/v1"
// const  authUrl = "http://192.168.0.109:3001/users"


var YaoApi = function () {
  function YaoApi() {
    _classCallCheck(this, YaoApi);

    this.jsonApi = new _devourClient2.default({ apiUrl: baseUrl, logger: false });
    this.jsonApi.replaceMiddleware('errors', {
      name: 'yao-error-handler',
      error: function error(payload) {
        console.log(payload);
        var ret = void 0;
        if (payload.data.errors) ret = payload.data.errors;
        return ret;
        // return { errors: [] }
      }
    });

    this.jsonApi.define('asset', {
      name: '',
      createdAt: '',
      updatedAt: '',

      categories: {
        jsonApi: 'hasMany',
        type: 'categories'
      }
    });

    this.jsonApi.define('category', {
      name: '',
      categorytype: '',
      sort: '',
      deleted: '',
      assigned: '',
      createdAt: '',
      updatedAt: '',
      assetid1: '',
      items: {
        jsonApi: 'hasMany',
        type: 'items'
      },
      subcategories: {
        jsonApi: 'hasMany',
        type: 'categories'
      },
      parent: {
        jsonApi: 'hasOne',
        type: 'categories'
      },
      asset: {
        jsonApi: 'hasOne',
        type: 'assets'
      }
    });

    // this.jsonApi.define('subcategories', {
    //   name: ''
    // })

    this.jsonApi.define('item', {
      title: '',
      content: '',
      file: '',
      sort: '',
      deleted: '',
      assigned: '',
      createdAt: '',
      updatedAt: '',
      filesize: '',
      assetid: '',
      category: {
        jsonApi: 'hasOne',
        type: 'categories'
      }
    });
  }

  // Asset


  _createClass(YaoApi, [{
    key: "listAsset",
    value: function listAsset() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.jsonApi.findAll('asset', {
          include: 'categories'
        }).then(function (assets) {
          resolve(assets);
        });
      });
    }

    // Get Category

  }, {
    key: "assetData",
    value: function assetData(asset_id) {
      return this.jsonApi.find('asset', asset_id, {
        include: 'categories,categories.subcategories,categories.items,categories.subcategories.items'
      });
    }

    // Get Unassigned Sub Category

  }, {
    key: "getUnassignedSubCategories",
    value: function getUnassignedSubCategories(asset_id) {
      return this.jsonApi.findAll('category', {
        include: 'items',
        filter: {
          assigned: false,
          categorytype: 1,
          deleted: false,
          assetid1: asset_id
        }
      });
    }

    // Get Unassigned Items

  }, {
    key: "getUnassignedItems",
    value: function getUnassignedItems(asset_id) {
      return this.jsonApi.findAll('item', {
        include: 'category',
        filter: {
          assigned: false,
          deleted: false,
          assetid: asset_id
        }
      });
    }

    // Create Category

  }, {
    key: "createCategory",
    value: function createCategory(asset_id, cat_name) {
      var data = {
        name: cat_name,
        asset: {
          id: asset_id,
          type: "assets"
        }
      };

      return this.jsonApi.create('category', data);
    }
    // Create Sub Category

  }, {
    key: "createSubCategory",
    value: function createSubCategory(asset_id, cat_id, cat_name) {
      var data = {
        name: cat_name,
        categorytype: 1,
        assetid1: asset_id,
        parent: {
          id: cat_id,
          type: "categories"
        }
      };

      return this.jsonApi.create('category', data);
    }

    // Create PDF 

  }, {
    key: "createItem",
    value: function createItem(asset_id, cat_id, pdf_title) {
      var data = {
        title: pdf_title,
        assetid: asset_id,
        category: {
          id: cat_id,
          type: "categories"
        }
      };

      return this.jsonApi.create('item', data);
    }

    // Update Category/SubCategory

  }, {
    key: "updateCategory",
    value: function updateCategory(category) {
      return this.jsonApi.update('category', category);
    }

    // Update PDF 

  }, {
    key: "updateItem",
    value: function updateItem(item) {
      return this.jsonApi.update('item', item);
    }

    // Delete Category

  }, {
    key: "deleteCategory",
    value: function deleteCategory(id) {
      return this.jsonApi.destroy('category', id);
    }

    // Delete PDF

  }, {
    key: "deleteItem",
    value: function deleteItem(id) {
      return this.jsonApi.destroy('item', id);
    }
  }, {
    key: "authenticate",
    value: function authenticate(token) {
      this.jsonApi.headers['Authorization'] = "" + token;
    }
  }, {
    key: "unauthenticate",
    value: function unauthenticate() {
      delete this.jsonApi.headers['Authorization'];
    }

    // Login 
    // login(email, password){
    //   let userinfo = {
    //     user:{
    //       email : email,
    //       password : password
    //     }
    //   }

    //   /** using axios */
    //   // this.jsonApi.axios.post(authUrl+"/login", userinfo).then((resp) => {
    //   //   console.log(resp.status)
    //   //   console.log(resp.data)
    //   // })

    //   /** es6-request */
    //   return new Promise((resolve, reject) => {
    //     request.post(authUrl+"/login")
    //       .sendJSON({
    //         user: {
    //           email: email,
    //           password: password
    //         }
    //       }).then(([body, res]) => {
    //         // if(res != 200)
    //         //   reject(JSON.parse(body).error.message)
    //         // else
    //         // console.log(JSON.parse(body).auth_token) 
    //         resolve(JSON.parse(body).auth_token)
    //       })
    //   })
    // }

    // // Logout
    // logout(token){
    //   return new Promise((resolve, reject) => {
    //     request.delete(authUrl+"/logout")
    //     .header("Authorization", token)
    //     .then(([body, res]) => {
    //       // console.log(res)
    //       // console.log(body)
    //       console.log(res.statusCode)
    //       if(res.statusCode > 400)
    //         resolve(false)
    //       else
    //         resolve(true)
    //     })
    //   })
    // }

    // Search pdf files with their contents

  }, {
    key: "searchPDF",
    value: function searchPDF(asset_id, keyword) {
      return this.jsonApi.findAll('item', {
        include: 'category',
        filter: {
          assigned: true,
          deleted: false,
          assetid: asset_id,
          content: keyword
        },
        fields: { items: ['id'] }
      });
    }
  }]);

  return YaoApi;
}();

module.exports = YaoApi;
