
help:
	@echo "Commands: dist"

dist:
	npm run build
	cd dist/ && zip -r orange-helper *
	cp dist/orange-helper.zip .
