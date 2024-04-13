#!/bin/bash

set -e
set -x

cd "$(dirname "$0")"

cd api
python3 -m venv env
echo "export DJANGO_SETTINGS_MODULE=watchadoing.settings_pro" >> env/bin/activate
source env/bin/activate
pip3 install -r requirements.txt
sudo -u postgres createdb watchadoing
sudo -u postgres psql -d watchadoing -c "create extension hstore"
python3 manage.py makemigrations activity location
python3 manage.py migrate
mkdir logs
touch logs/uwsgi.log
chmod 666 *.log
cd ../app
yarn install
VUE_APP_MODE=production yarn build
