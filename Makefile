
help:
	@echo "Commands: dist"

bump:
	bump2version --commit --current-version `cat public/manifest.json | jq -r .version` patch public/manifest.json

dist:
	npm run build
	cd dist/ && zip -r orange-helper *
	cp dist/orange-helper.zip .
