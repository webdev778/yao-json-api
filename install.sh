src="./src"
deploy="./deploy"
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

echo "browserify..."
browserify $src/export.js -o $tmp/$tempfile

echo "minifying..."
$(npm bin)/minify --output $deploy/yaoapi.js $tmp/$tempfile

echo "Removing temp folder and files..."
rm -rf $tmp

echo "finished."