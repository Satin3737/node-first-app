preview ?= false

up:
	PROD_PREVIEW=${preview} docker compose up

clear:
	docker compose down --rmi all