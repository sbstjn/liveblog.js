#!/bin/bash

echo 'Installing dependencies'
npm install less-middleware jade

echo 'Installing express.js'
npm install -g express

echo 'Creating files'
express -f --sessions --css less .

echo 'Downloading latest bootstrap'
curl https://raw.github.com/twitter/bootstrap/master/docs/assets/css/bootstrap-responsive.css -o public/stylesheets/bs-r.css
curl https://raw.github.com/twitter/bootstrap/master/docs/assets/css/bootstrap.css -o public/stylesheets/bs.css

echo 'Copying example files'
cp -r sample.layout.jade views/layout.jade
rm sample.layout.jade
cp -r sample.main.js public/javascripts/main.js
rm sample.main.js

echo 'Downloading RequireJS'
curl http://requirejs.org/docs/release/jquery-require/jquery1.8.0-requirejs2.0.6/jquery-require-sample.zip -O
unzip jquery-require-sample.zip
rm jquery-require-sample.zip
cp jquery-require-sample/webapp-build/scripts/require-jquery.js public/javascripts/r-j.js
rm -rf jquery-require-sample

echo " "
echo " Start your application with: "
echo " "
echo " $ > node app.js "
echo " "
rm -rf create.sh
