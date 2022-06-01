#! /bin/bash

cd app
VUE_APP_MODE=production yarn build
ssh root@myactivities.net "rm -rf /home/projects/watchadoing/app/dist"
scp -r dist root@myactivities.net:/home/projects/watchadoing/app/dist