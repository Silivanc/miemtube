

build-image:
	docker build -t registry.miem.hse.ru/miemtube/frontend .

publish: build-image
	docker push registry.miem.hse.ru/miemtube/frontend