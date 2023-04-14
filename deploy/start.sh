#!/bin/bash
docker-compose build
docker-compose up &
docker cp ../src/db/backup.sql postgresql:/db.sql > /dev/null
while [ $? -eq  1 ]
do
        echo "waiting for container startup.."
        sleep 10
        docker cp ../src/db/backup.sql postgresql:/db.sql > /dev/null
done
docker exec -i postgresql pg_restore -d postgres db.sql
while [ $? -eq  1 ]
do
        echo "waiting for db startup.."
        sleep 10
        docker exec -i postgresql pg_restore -d postgres db.sql
done