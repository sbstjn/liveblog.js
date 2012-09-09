#!/bin/bash

echo 'Clean-Up Directory'
rm package.json
rm app.js
rm -rf public
rm -rf routes
rm -rf views

echo 'Installing express.js'
npm install -g express

echo 'Creating files'
express -f --sessions --css less .

echo 'Downloading latest bootstrap'
git clone git://github.com/twitter/bootstrap.git

echo 'Moving files'
cp bootstrap/docs/assets/css/bootstrap-responsive.css public/stylesheets/bs-r.css
cp bootstrap/docs/assets/css/bootstrap.css public/stylesheets/bs.css
rm -rf bootstrap

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

rm -rf create.sh
