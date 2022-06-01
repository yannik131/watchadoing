#! /bin/bash

cd app
VUE_APP_MODE=production yarn build
scp -r dist root@myactivities.net:/home/projects/watchadoing/app/dist