import JsonApi from "devour-client"

const baseUrl = "http://54.186.1.104:3001/api/v1/";

class YaoApi{
  constructor() {
    this.jsonApi = new JsonApi({ apiUrl: baseUrl, logger: false });

    this.jsonApi.replaceMiddleware('errors', {
        name: 'yao-error-handler',
        error: function (payload) {
          console.log(payload)
          // let ret
          // if (payload.data.errors)
          //   ret = payload.data.errors
          // return ret
          return { errors: [] }
        }
      }
    ) 

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
  listAsset(){
    return new Promise((resolve, reject) => {
      this.jsonApi.findAll('asset', {
        include: 'categories'
      }).then( (assets) => {
        resolve(assets)
      })
    })
  }

  // Category
  assetData(asset_id){
    return this.jsonApi.find('asset', asset_id, {
      include: 'categories,categories.parent,categories.subcategories,categories.items,categories.subcategories.items'
    })
  }

}

module.exports = YaoApi;
