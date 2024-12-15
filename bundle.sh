#!/usr/bin/env bash
set -e

# setup dist directory for project files
rm -rf dist
mkdir dist

# copy javascript files from src folder
mkdir dist/src
cd src
find . -name '*.js' | cpio -pdm ../dist/src
cd ..
# cp -R ./src/. dist/src

# copy web page
cp ./index.html dist/index.html

# copy assets
mkdir dist/assets
cp -R ./assets/. dist/assets

# copy phaser editor javascript files
mkdir dist/phaserjs_editor_scripts_base
cd phaserjs_editor_scripts_base
find . -name '*.js' | cpio -pdm ../dist/phaserjs_editor_scripts_base
cd ..
