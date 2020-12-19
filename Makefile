
help:
	@echo "Commands: dist"

bump:
	bump2version --current-version `cat dist/manifest.json | jq -r .version` patch dist/manifest.json

dist:
	npm run build
	cd dist/ && zip -r orange-helper *
	cp dist/orange-helper.zip .
