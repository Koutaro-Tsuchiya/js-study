#!/bin/bash
# Usage
# ./copy.sh -d [DIRNAME]

while getopts d: OPT
do
  case $OPT in
    "d" ) DIR="$OPTARG" ;;
    *   ) echo "Usage: $0 [-d DIRNAME]" 1>&2
          exit 1 ;;
  esac
done

cp -r src gulpfile.js package.json yarn.lock .gitignore webpack.config.js  $DIR
