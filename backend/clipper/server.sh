#!/bin/sh

exec socat TCP-LISTEN:8000,reuseaddr,fork EXEC:"/app/response.sh"
