#! /bin/bash

git pull origin
cd app
VUE_APP_MODE=production yarn build