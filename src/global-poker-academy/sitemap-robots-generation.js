const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function fetchSitemapAndRobots() {
    const siteName = 'global-poker-academy';
    const apiUrl = process.env.GRAPH_QL_ENDPOINT;

    const headers = {
        'sc_apikey': process.env.SITECORE_API_KEY
    };

    const data = {
        operationName: 'SitemapAndRobotsQuery',
        variables: {
            siteName: siteName
        },
        query: `query SitemapAndRobotsQuery($siteName: String!) {
        site {
          siteInfo(site: $siteName) {
            sitemap
            robots
          }
        }
      }`
    };


    try {
        const response = await axios.post(apiUrl, data, { headers });

        if (response.status === 200) {

            const sitemapUrl = response.data.data.site.siteInfo.sitemap[0];
            const robotsContent = response.data.data.site.siteInfo.robots;

            // Fetch the sitemap.xml from the given URL

            const sitemapRespone = await axios.get(sitemapUrl, {
                responseType: 'text'
            });

            const sitemapContent = sitemapRespone.data;

            // Ensure the 'out' directory exists
            if (!fs.existsSync('out')) {
                fs.mkdirSync('out');
            }

            // Save the fetched sitemap to a file in the 'out' directory
            const sitemapOutputPath = path.join(process.cwd(), 'out', 'sitemap.xml');
            fs.writeFileSync(sitemapOutputPath, sitemapContent);

            // Save the fetched robots to a file in the 'out' directory
            const robotsOutputPath = path.join(process.cwd(), 'out', 'robots.txt');
            fs.writeFileSync(robotsOutputPath, robotsContent);

        }
    } catch (error) {
        console.error('Error while making the POST request:', error);
    }
}

// Execute the post-build task
fetchSitemapAndRobots();