#!/bin/sh
# Run npm i if packages have not already been installed

# Build chumba casino
echo "<------- Starting chumba casino build ------->"
SITE_NAME=ChumbaCasino JSS_APP_NAME=ChumbaCasino GRAPH_QL_ENDPOINT=https://edge.sitecorecloud.io/api/graphql/v1 EXPORT_MODE=1 npm run build
rm -rf ./out/shareholders
rm -rf ./out/gpa
rm -rf ./out/banners
rm ./out/location-unavailable.html

# Run dev
echo "<------- Running dev environment ------->"
SITE_NAME=ChumbaCasino JSS_APP_NAME=ChumbaCasino GRAPH_QL_ENDPOINT=https://edge.sitecorecloud.io/api/graphql/v1 npm run next:dev
