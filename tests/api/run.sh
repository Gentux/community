#!/bin/sh

export NANOCLOUD_PROTOCOL="http"
export NANOCLOUD_HOST="localhost"
export NANOCLOUD_PORT="4200"
export NANOCLOUD_CLIENTID="9405fb6b0e59d2997e3c777a22d8f0e617a9f5b36b6565c7579e5be6deb8f7ae:9050d67c2be0943f2c63507052ddedb3ae34a30e39bbbbdab241c93f8b5cf341"
export NANOCLOUD_ADMIN_USERNAME="admin@nanocloud.com"
export NANOCLOUD_ADMIN_PASSWORD="admin"
export NANOCLOUD_USER_FIRSTNAME="Nano"
export NANOCLOUD_USER_LASTNAME="Test"
export NANOCLOUD_USER_EMAIL="test@nanocloud.com"
export NANOCLOUD_USER_PASSWORD="Nano@123"

mocha index
