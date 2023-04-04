help:
	@echo "Makefile for Hamster Travel"
compile:
	yarn build
deploy:
	make -C $(DEPLOY_PATH) travel
