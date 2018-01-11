install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js

build: 
	npm run build

lint:
	npm run eslint

test:
	npm run test

watch:
	sudo npm run test -- --watchAll

publish:
	npm publish