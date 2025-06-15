start:
	make install
	make up

install:
	npm install

up:
	docker compose up --build

clear:
	docker compose down --rmi all