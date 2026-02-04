const fetch = require('http');

function checkEndpoint(endpoint) {
    const url = `http://localhost:3001/${endpoint}`;
    console.log(`Checking ${url}...`);
    fetch.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                console.log(`${endpoint} Count:`, Array.isArray(json) ? json.length : 'N/A');
                if (Array.isArray(json) && json.length > 0) {
                    console.log(`First ${endpoint} item:`, JSON.stringify(json[0], null, 2));
                }
            } catch (e) {
                console.error(`Error parsing ${endpoint}:`, e.message);
            }
        });
    }).on('error', (err) => {
        console.error(`Error fetching ${endpoint}:`, err.message);
    });
}

checkEndpoint('posts');
checkEndpoint('users');
