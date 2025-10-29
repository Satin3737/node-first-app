preview ?= 0

up:
	PROD_PREVIEW=${preview} docker compose up

exec:
	docker compose exec -it nodefirstapp-backend /bin/bash

clear:
	docker compose down --rmi all