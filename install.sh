src="./src"
deploy="./deploy"
admin_asset="../vertex_admin_asset/app/scripts/"
viwer_asset="../vertex_asset_viewer/app/scripts/"
tmp="./tmp"
tempfile="yaoapi.tmp.js"

echo "yao api library deploy start..."
echo "directory information"
echo "src : "$src
echo "deploy : "$deploy

mkdir $tmp
chmod 777 $tmp

echo "converting ES6 to ES5..."
$(npm bin)/babel $src/yaoapi_es6.js --out-file $src/yaoapi.js
if [ $? -eq 0 ]; then
    echo "succesfully converted ES6 to ES5."
else
    echo "converting ES6 to ES5 failed."
    exit 1
fi

echo "browserify..."
browserify $src/export.js -o $tmp/$tempfile
if [ $? -eq 0 ]; then
    echo "succesfully browserify."
else
    echo "browserify failed."
    exit 1
fi

echo "minifying..."
$(npm bin)/minify --output $deploy/yaoapi.js $tmp/$tempfile
if [ $? -eq 0 ]; then
    echo "succesfully minified."
else
    echo "minifying failed."
    exit 1
fi
# cp $tmp/$tempfile $deploy/yaoapi.js

echo "Removing temp folder and files..."
rm -rf $tmp

echo "deploy to Asset Viwer and Admin Asset"
echo "deploy to Admin Asset"
cp ./deploy/yaoapi.js $admin_asset
echo "deploy to Asset Viwer"
cp ./deploy/yaoapi.js $viwer_asset
echo "finished."