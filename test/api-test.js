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

    if (false) { // passed : OK, 8.10
      console.log("1 : assetData Test")
      let assetData = await yao1.assetData(1)
      console.log(assetData)
    }

    if (false) { //passed : OK, 8.10
      console.log("2 : Create Category Test")
      let result = await yao1.createCategory(1, "Hahahaha")
      console.log(result)
    }

    if (false) { //passed : OK, 8.10   
      console.log("3 : Create Sub Category Test")
      let result1 = await yao1.createSubCategory(1, 38, "API SubTest88")
      console.log(result1)
    }

    if (false) { //passed : OK, 8.10
      console.log("3 : Create PDF file Test")
      let result2 = await yao1.createItem(1, 10, "API Test88")
      console.log(result2)
    }


    // change category name
    if (false) { //passed : OK, 8.10
      console.log("4 : Update Category Test - 1")
      let newCat = {
        id: 38,
        name: 'APITEST:001'
      }
      let result3 = await yao1.updateCategory(newCat)
      console.log(result3)
    }


    // change parent_id for subcategory drag and drop
    if (false) { //passed : OK, 8.10
      console.log("5 : Update Category Test - 2")
      let newCat1 = {
        id: 39,
        parent: {
          id: 1,
          type: "categories"
        }
      }
      let result4 = await yao1.updateCategory(newCat1)
      console.log(result4)
    }
    

    if(false){
      // console.log("6 : Delete Category Test")
      let result5 = await yao1.deleteCategory(72)
      console.log(result5)

      // console.log("7 : Delete PDF Test")
      let result6 = await yao1.deleteItem(34)
      console.log(result6)
    }


    // delete category
    if(false){
      let delCat = {
        id: 38,
        deleted: true
      }
      let result7 = await yao1.updateCategory(delCat)
      console.log(result7)
    }

    // delete pdf
    if(false){
      let delItem = {
        id: 60,
        deleted: true
      }
      let result8 = await yao1.updateItem(delItem)
      console.log(result8)
    }


    //pdf drag and drop
    if(false){
      console.log("Update Item - Drag and Drop Test")
      let dragItem = {
        id: 14,
        //title: newTitle
        category: {
          id: 38, //category_id
          type: 'categories'
        }      
      }
      let result9 = await yao1.updateItem(dragItem)
      console.log(result9)
    }

    //subcategory drag and drop
    if(true){
      console.log("Update Item - Drag and Drop Test")
      let dragItem = {
        id: 14,
        assigned: true,
        //title: newTitle
        parent: {
          id: 38, //category_id
          type: 'categories'
        }      
      }
      let result9 = await yao1.updateCategory(dragItem)
      console.log(result9)
    }

    //unassigned list test
    if(false){ 
      console.log("10 : getUnassignedSubCategories Test")
      let unassignedSubCategories = await yao1.getUnassignedSubCategories(1)
      console.log(unassignedSubCategories)

      console.log("11 : getUnassignedItems Test")
      let unassignedItems = await yao1.getUnassignedItems(1)
      console.log(unassignedItems)
    }
  }catch(err){
    console.log(err)
  }
}

test1()


