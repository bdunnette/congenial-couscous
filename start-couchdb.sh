COUCHDIR="/var/run/couchdb"
if [ -d "$COUCHDIR" ]; then
  sudo mkdir -p $COUCHDIR
  sudo chown -R couchdb:couchdb /var/run/couchdb/
fi
sudo couchdb -b -A /etc/couchdb/
