var Yao = require("./yaoapi.js");



function test1() {
  var _Yao$listCategory$the = Yao.listCategory().then(function (categories) {
    console.log(categories);
  }).catch(function (error) {
    console.log('hahahahahah');
  }),
    categories = _Yao$listCategory$the.categories,
    error = _Yao$listCategory$the.error;
}
function aaa() {

  // let assets =  test1.listAsset().then(function(data){
  //   console.log(data);
  // })

  //let assets = await test1.listAsset()

  // let categories = await test1.listCategory()

  //     const { categories, error } = test1.listCategory().then(categories => {console.log(categories)})
  // .catch(error => {console.log(error)})


  //   const { response, error } = jsonApi.create(...).then(response => ({ response }))
  // .catch(error => ({ error }))



  // console.log("****-------------------------------------Categories---------------------------------------***")
  // console.log(categories)

  //console.log('8888888888888888888888888888888888888888888888888888888888888')
  //console.log(categories[2].items[0])


  // let ret = await test1.getCategory(1)
  // console.log(ret)
  //console.log("-------------------------------------Asset---------------------")
  //console.log(assets)
  //console.log(assets[0].categories[0]);
}

test1()