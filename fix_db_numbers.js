const fs = require('fs');

const dbPath = './db.json';

try {
    const data = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(data);

    let changed = false;

    if (db.users) {
        db.users = db.users.map(user => {
            if (typeof user.id === 'string' && !isNaN(user.id)) {
                user.id = Number(user.id);
                changed = true;
            }
            return user;
        });
    }

    if (db.posts) {
        db.posts = db.posts.map(post => {
            // Convert ID to number
            if (typeof post.id === 'string' && !isNaN(post.id)) {
                post.id = Number(post.id);
                changed = true;
            }
            // Convert userId to number
            if (post.userId && typeof post.userId === 'string' && !isNaN(post.userId)) {
                post.userId = Number(post.userId);
                changed = true;
            }
            return post;
        });
    }

    if (changed) {
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        console.log('Fixed db.json: Converted ALL IDs to NUMBERS.');
    } else {
        console.log('db.json execution: No changes needed / Already numbers.');
    }

} catch (err) {
    console.error('Error fixing db.json:', err);
}
