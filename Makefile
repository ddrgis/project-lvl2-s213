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

publish:
	npm publish