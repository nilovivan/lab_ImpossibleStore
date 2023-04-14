#!/bin/bash
docker-compose build
docker-compose up &
RET=$(docker cp ../src/db/backup.sql postgresql:/db.sql 2>&1)
while echo "$RET" | grep -q "Error"; do
        echo 'waiting for db to start..'
        sleep 5
        RET=$(docker cp ../src/db/backup.sql postgresql:/db.sql 2>&1)
done
docker exec -i postgresql pg_restore -d postgres db.sql