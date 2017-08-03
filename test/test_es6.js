import YaoApi from "./yaoapi_es6"

const yao1 = new YaoApi()

async function test1(){

  const { categories, error } = yao1.assetData(1).then(categories => {
    console.log(categories)
    console.log('------------------------*********************+++++++++++++++++++++++++++')
    console.log(categories.categories[0].subcategories[0].items);
  })
  .catch(error => {console.log(error)})
}

test1()


