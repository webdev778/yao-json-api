"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _devourClient = require("devour-client");

var _devourClient2 = _interopRequireDefault(_devourClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var baseUrl = "http://192.168.0.124:3001/api/v1/";

var YaoApi = function () {
  function YaoApi() {
    _classCallCheck(this, YaoApi);

    this.jsonApi = new _devourClient2.default({ apiUrl: baseUrl, logger: false });

    this.jsonApi.replaceMiddleware('errors', {
      name: 'yao-error-handler',
      error: function error(payload) {
        console.log(payload);
        // let ret
        // if (payload.data.errors)
        //   ret = payload.data.errors
        // return ret
        return { errors: [] };
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
        include: 'categories,categories.parent,categories.subcategories,categories.items,categories.subcategories.items'
      });
    }

    // Get Unassigned Sub Category

  }, {
    key: "getUnassignedSubCategories",
    value: function getUnassignedSubCategories(asset_id) {
      return this.jsonApi.findAll('category', {
        include: 'parent,items',
        filter: {
          assigned: false,
          categorytype: 1,
          deleted: false
          //,asset: asset_id
        }
      });
    }

    // Get Unassigned Sub Category

  }, {
    key: "getUnassignedItems",
    value: function getUnassignedItems(asset_id) {
      return this.jsonApi.findAll('item', {
        include: 'category',
        filter: {
          assigned: false,
          deleted: false
          //,asset: asset_id
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
    value: function createSubCategory(cat_id, cat_name) {
      var data = {
        name: cat_name,
        categorytype: 1,
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
    value: function createItem(cat_id, pdf_title) {
      var data = {
        title: pdf_title,
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
  }]);

  return YaoApi;
}();

module.exports = YaoApi;
