#!/bin/bash
docker-compose build
docker-compose up &
sleep 20
RET=$(docker cp ../src/db/backup.sql postgresql:/db.sql 2>&1)
while [ ${RET} = 'Error: No such container:path: postgresql:/' ]
do
	echo 'waiting..'
	echo ${RET}
	sleep 5
	RET=$(docker cp ../src/db/backup.sql postgresql:/db.sql 2>&1)
done
docker exec -i postgresql pg_restore -d postgres db.sql
