import JsonApi from "devour-client"
// import Request from "es6-request"

// const request = require("es6-request");

/* for Production */
const  baseUrl = "http://54.186.1.104:3001/api/v1"
const  authUrl = "http://54.186.1.104:3001/users"

/* for Development */
// const  baseUrl = "http://192.168.0.109:3001/api/v1"
// const  authUrl = "http://192.168.0.109:3001/users"


class YaoApi{
  constructor() {
    this.jsonApi = new JsonApi({ apiUrl: baseUrl, logger: false })
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
  listAsset(){
    return new Promise((resolve, reject) => {
      this.jsonApi.findAll('asset', {
        include: 'categories'
      }).then( (assets) => {
        resolve(assets)
      })
    })
  }

  // Get Category
  assetData(asset_id){
    return this.jsonApi.find('asset', asset_id, {
      include: 'categories,categories.subcategories,categories.items,categories.subcategories.items'
    })
  }

  // Get Unassigned Sub Category
  getUnassignedSubCategories(asset_id){
    return this.jsonApi.findAll('category', {
      include: 'items',
      filter: { 
        assigned: false, 
        categorytype: 1, 
        deleted: false
        ,assetid1: asset_id
      }
    })
  }

  // Get Unassigned Items
  getUnassignedItems(asset_id) {
    return this.jsonApi.findAll('item', {
      include: 'category',
      filter: { 
        assigned: false, 
        deleted: false,
        assetid: asset_id
      }
    })
  }

  // Create Category
  createCategory(asset_id, cat_name){
    let data = {
      name: cat_name,
      asset: {
        id : asset_id,
        type : "assets"
      }
    }

    return this.jsonApi.create('category', data)
  }
  // Create Sub Category
  createSubCategory(asset_id, cat_id, cat_name){
    let data = {
      name: cat_name,
      categorytype: 1,
      assetid1:asset_id,
      parent: {
        id : cat_id,
        type : "categories"
      }
    }

    return this.jsonApi.create('category', data)
  }

  // Create PDF 
  createItem(asset_id, cat_id, pdf_title){
    let data = {
      title: pdf_title,
      assetid: asset_id,
      category: {
        id : cat_id,
        type : "categories"
      }
    }

    return this.jsonApi.create('item', data)
  }


  // Update Category/SubCategory
  updateCategory(category){
    return this.jsonApi.update('category',category)
  }

  // Update PDF 
  updateItem(item){
    return this.jsonApi.update('item', item)
  }

  // Delete Category
  deleteCategory(id){
    return this.jsonApi.destroy('category',id)
  }

  // Delete PDF
  deleteItem(id){
    return this.jsonApi.destroy('item', id)
  }

  authenticate (token) {
    this.jsonApi.headers['Authorization'] = `${token}`
  }

  unauthenticate () {
    delete this.jsonApi.headers['Authorization']
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
  searchPDF(asset_id, keyword) {
    return this.jsonApi.findAll('item', {
      include: 'category',
      filter: { 
        assigned: true, 
        deleted: false,
        assetid: asset_id,
        content: keyword
      },
      fields: {items: ['id']}
    })
  }
}

module.exports = YaoApi;
