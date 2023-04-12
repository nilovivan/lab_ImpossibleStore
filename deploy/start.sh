#!/bin/bash
docker-compose build
docker-compose up &
docker cp ../src/db/backup.sql postgresql:/db.sql
docker exec -i postgresql pg_restore -d postgres db.sql
