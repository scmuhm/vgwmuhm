#!/bin/sh
# Run npm i if packages have not already been installed

# Build GPA
echo "<------- Starting Global Poker Academy build ------->"
SITE_NAME=GlobalPokerAcademy JSS_APP_NAME=GlobalPokerAcademy GRAPH_QL_ENDPOINT=https://edge.sitecorecloud.io/api/graphql/v1 EXPORT_MODE=1 npm run build

# Run dev
echo "<------- Running dev environment ------->"
SITE_NAME=GlobalPokerAcademy JSS_APP_NAME=GlobalPokerAcademy GRAPH_QL_ENDPOINT=https://edge.sitecorecloud.io/api/graphql/v1 npm run next:dev
