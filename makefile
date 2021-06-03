check:
	deployctl check --libs=ns,fetchevent main.ts

dev:
	deployctl run --watch --no-check main.ts