#!bin/bash

source .env

npm run lint

npm run build

cp package*.json ./dist

mkdir -p dist/.vercel

touch dist/.vercel/project.json

echo "{\"orgId\":\"$VERCEL_ORG_ID\",\"projectId\":\"$VERCEL_PROJECT_ID\"}" >dist/.vercel/project.json

vercel ./dist \
    -A "vercel.json" \
    -e MONGODB_URI=$MONGODB_URI \
    -e AUTH0_AUDIENCE=$AUTH0_AUDIENCE \
    -e AUTH0_ISSUER_URL=$AUTH0_ISSUER_URL \
    -e AUTH0_TOKEN_SIGN_ALG=$AUTH0_TOKEN_SIGN_ALG \
    -t "$VERCEL_TOKEN"
