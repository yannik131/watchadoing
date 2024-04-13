#! /bin/bash

uwsgi --ini ./config/uwsgi.ini &
./env/bin/daphne -u /tmp/daphne2.sock watchadoing.asgi:application --access-log /home/websites/watchadoing/api/logs/daphne.log &
