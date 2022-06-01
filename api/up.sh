#! /bin/bash

uwsgi --ini ./config/uwsgi.ini &
daphne -u /tmp/daphne2.sock watchadoing.asgi:application --access-log /home/projects/watchadoing/api/logs/daphne.log