"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _devourClient = require("devour-client");

var _devourClient2 = _interopRequireDefault(_devourClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var baseUrl = "http://54.186.1.104:3001/api/v1/";

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
      categoryType: '',
      sort: '',
      deleted: '',
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
        type: 'category'
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
      createdAt: '',
      updatedAt: '',

      category: {
        jsonApi: 'hasOne',
        type: 'category'
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

    // Category

  }, {
    key: "assetData",
    value: function assetData(asset_id) {
      return this.jsonApi.find('asset', asset_id, {
        include: 'categories,categories.parent,categories.subcategories,categories.items,categories.subcategories.items'
      });
    }
  }]);

  return YaoApi;
}();

module.exports = YaoApi;
