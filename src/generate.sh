#!/bin/bash
openssl genrsa -out rsa_private_key.pem 1024
openssl pkcs8 -topk8 -inform PEM -in rsa_private_key.pem -outform PEM -nocrypt
openssl rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem