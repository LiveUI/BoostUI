REPO = liveui
IMAGE = boostui
TAG = 1.0.0

pack:
	./scripts/build.sh
	docker build -t $(REPO)/$(IMAGE):$(TAG) .

publish: pack
	docker tag $(REPO)/$(IMAGE):$(TAG) $(REPO)/$(IMAGE):latest
	docker push $(REPO)/$(IMAGE):$(TAG)
	docker push $(REPO)/$(IMAGE):latest
