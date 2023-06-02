FROM openresty/openresty:alpine

RUN apk add --no-cache lua5.1 lua5.1-dev luarocks5.1 gcc musl-dev
RUN luarocks-5.1 install lua-cjson CJSON_LUA_VERSION=2.1.0.10-1
RUN luarocks-5.1 install lua-resty-http
RUN luarocks-5.1 install luasocket

COPY server.lua /app/server.lua
COPY frases.json /app/frases.json

CMD ["lua5.1", "/app/server.lua"]
