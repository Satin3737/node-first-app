#!/bin/sh

if [ "$PROD_PREVIEW" = 1 ]; then
  npm install
  npm run build
  npm run start
else
  npm install
  npm run dev
fi
