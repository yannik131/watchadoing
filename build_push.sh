#! /bin/bash

cd app
VUE_APP_MODE=production yarn build
ssh root@myactivities.net "rm -rf /home/websites/watchadoing/app/dist"
scp -r dist root@myactivities.net:/home/websites/watchadoing/app/dist