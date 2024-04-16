source env/bin/activate
uwsgi --stop /tmp/watchadoing.pid
ps -ef | grep daphne2 | grep sock | awk '{print $2}' | xargs kill -9
