#!/bin/sh
# Run npm i if packages have not already been installed

# Build global poker
echo "<------- Starting global poker build ------->"
SITE_NAME=GlobalPoker JSS_APP_NAME=GlobalPoker GRAPH_QL_ENDPOINT=https://edge.sitecorecloud.io/api/graphql/v1 EXPORT_MODE=1 NEXT_PUBLIC_HOST_NAME=http://localhost:3000/ npm run build
rm ./out/index.html
rm -rf ./out/404
rm -rf ./out/500
rm -rf ./out/geo-block
rm -rf ./out/shareholders
rm -rf ./out/static-pages
cp -r ./vgw/GlobalPoker/static-pages/. ./out/
cp -r ./vgw/GlobalPoker/config ./out/

# Run dev
echo "<------- Running dev environment ------->"
SITE_NAME=GlobalPoker JSS_APP_NAME=GlobalPoker GRAPH_QL_ENDPOINT=https://edge.sitecorecloud.io/api/graphql/v1 npm run next:dev
