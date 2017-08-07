import YaoApi from "../src/yaoapi_es6"

const yao1 = new YaoApi()

async function test1(){

  /*
  const { categories, error } = yao1.assetData(1).then(categories => {
    console.log(categories)
    console.log('------------------------*********************+++++++++++++++++++++++++++')
    console.log(categories.categories[0].subcategories[0].items);
  })
  .catch(error => {console.log(error)})
  */
  try{

    // console.log("1 : assetData Test")
    // let assetData = await yao1.assetData(1)
    // console.log(assetData)

    /*
    console.log("2 : Create Category Test")
    let result = await yao1.createCategory(1, "Hahahaha")
    console.log(result)

    console.log("3 : Create Sub Category Test")
    let result1 = await yao1.createSubCategory(46, "Sub Hahahaha")
    console.log(result1)
    */

    // console.log("3 : Create PDF file Test")
    // let result2 = await yao1.createItem(46, "Sub Hahahaha")
    // console.log(result2)

    
    console.log("4 : Update Category Test - 1")
    // change category name
    let newCat = {
      id: 13,
      name: 'New Cat'
    }
    let result3 = await yao1.udpateCategory(newCat)
    console.log(result3)
    

    // change parent_id for subcategory drag and drop
    /*
    console.log("5 : Update Category Test - 2")
    let newCat1 = {
      id: 13,
      parent:{
        id : 2,
        type: "categories"
      }
    }
    let result4 = await yao1.udpateCategory(newCat1)
    console.log(result4)
    */

    // console.log("6 : Delete Category Test")
    // let result5 = await yao1.deleteCategory(72)
    // console.log(result5)

    // console.log("7 : Delete PDF Test")
    // let result6 = await yao1.deleteItem(34)
    // console.log(result6)

    // delete category
    /*
    let delCat = {
      id: 13,
      deleted: true
    }
    let result7 = await yao1.udpateCategory(delCat)
    console.log(result7)

    // delete pdf
    let delItem = {
      id: 13,
      deleted: true
    }
    let result8 = await yao1.udpateItem(delItem)
    console.log(result8)
    */

    // drag and drop pdf
    console.log("Update Item - Drag and Drop Test")
    let dragItem = {
      id: 80,
      //title: newTitle
      category: {
        id: 14, //category_id
        type: 'categories'
      }      
    }
    let result9 = await yao1.updateItem(dragItem)
    console.log(result9)

  }catch(err){
    console.log(err)
  }
}

test1()


