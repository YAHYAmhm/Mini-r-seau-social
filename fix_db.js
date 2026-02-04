const fs = require('fs');

const dbPath = './db.json';

try {
    const data = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(data);

    let changed = false;

    if (db.posts) {
        db.posts = db.posts.map(post => {
            if (typeof post.userId === 'number') {
                post.userId = String(post.userId);
                changed = true;
            }
            // Also ensure post.id is string just in case
            if (typeof post.id === 'number') {
                post.id = String(post.id);
                changed = true;
            }
            return post;
        });
    }

    if (changed) {
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        console.log('Fixed db.json: Converted IDs to strings.');
    } else {
        console.log('db.json execution: No changes needed.');
    }

} catch (err) {
    console.error('Error fixing db.json:', err);
}
