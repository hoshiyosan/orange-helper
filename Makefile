
help:
	@echo "Commands: dist"

bump:
	bump2version --tag --commit --current-version `cat public/manifest.json | jq -r .version` patch public/manifest.json
	git push && git push --tags

dist:
	npm run build
	cd dist/ && zip -r orange-helper *
	cp dist/orange-helper.zip .
