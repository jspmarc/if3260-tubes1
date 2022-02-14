#!/bin/sh

# default port is 8080
port=$(if [[ -z $1 ]]; then printf 8080; else printf $1; fi)

python3 -m http.server "$port"
