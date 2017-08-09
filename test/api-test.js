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

    console.log("1 : assetData Test")
    let assetData = await yao1.assetData(1)
    console.log(assetData)

  
    console.log("2 : Create Category Test")
    let result = await yao1.createCategory(1, "Hahahaha")
    console.log(result)


    console.log("3 : Create Sub Category Test")
    let result1 = await yao1.createSubCategory(1, 10, "API Test88")
    console.log(result1)
  

    // console.log("3 : Create PDF file Test")
    // let result2 = await yao1.createItem(1, 10, "API Test88")
    // console.log(result2)

    
    // console.log("4 : Update Category Test - 1")
    // // change category name
    // let newCat = {
    //   id: 13,
    //   name: 'New Cat'
    // }
    // let result3 = await yao1.udpateCategory(newCat)
    // console.log(result3)
    

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
    */
    // delete pdf
    // let delItem = {
    //   id: 60,
    //   deleted: true
    // }
    // let result8 = await yao1.updateItem(delItem)
    // console.log(result8)


    //drag and drop pdf
    console.log("Update Item - Drag and Drop Test")
    let dragItem = {
      id: 81,
      //title: newTitle
      category: {
        id: 36, //category_id
        type: 'categories'
      }      
    }
    let result9 = await yao1.updateItem(dragItem)
    console.log(result9)

    // console.log("10 : getUnassignedSubCategories Test")
    // let unassignedSubCategories = await yao1.getUnassignedSubCategories(1)
    // console.log(unassignedSubCategories)

    // console.log("11 : getUnassignedItems Test")
    // let unassignedItems = await yao1.getUnassignedItems(1)
    // console.log(unassignedItems)
  }catch(err){
    console.log(err)
  }
}

test1()


