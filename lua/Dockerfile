FROM openresty/openresty:alpine

RUN apk add --no-cache lua5.1 lua5.1-dev luarocks5.1 gcc libc-dev
RUN luarocks-5.1 install luasocket

RUN mkdir /app
WORKDIR /app
RUN wget https://raw.githubusercontent.com/LuaDist/dkjson/master/dkjson.lua

COPY server.lua /app/server.lua

CMD ["lua5.1", "/app/server.lua"]
