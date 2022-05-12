sudo -u postgres psql -d watchadoing -c "select * from location_location;" > data.txt
sudo -u postgres psql -d watchadoing -c "select * from activity_activity;" >> data.txt