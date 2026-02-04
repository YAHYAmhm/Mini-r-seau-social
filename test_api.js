const fetch = require('http');

const url = 'http://localhost:3001/posts?_expand=user';

fetch.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log('Status Code:', res.statusCode);
            console.log('Is Array:', Array.isArray(json));
            console.log('Count:', Array.isArray(json) ? json.length : 'N/A');
            if (Array.isArray(json) && json.length > 0) {
                console.log('First Post Sample:', JSON.stringify(json[0], null, 2));
            }
        } catch (e) {
            console.error('Error parsing JSON:', e.message);
            console.log('Raw Data:', data);
        }
    });
}).on('error', (err) => {
    console.error('Error fetching:', err.message);
});
