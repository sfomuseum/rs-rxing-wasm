# As in: https://github.com/aaronland/go-http-fileserver

debug:
	fileserver \
		-root ./www \
		-mimetype js=text/javascript \
		-mimetype wasm=application/wasm \
		-enable-cors
