#!/bin/bash
# Read the key from file
KEY=$(cat private_key_pkcs8.pem)
# Set the environment variable using convex env set
# We wrap the key in quotes to handle newlines properly
npx convex env set JWT_PRIVATE_KEY "$KEY"

