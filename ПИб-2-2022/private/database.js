const pathDB = "./private/database.db";
const db = require('better-sqlite3')(pathDB);

class DataProcessing {
    getFeeds() {
        let query = `
            SELECT userName, userFeed, userMark
            FROM feeds
            ORDER BY userMark DESC`;
        let rows = db.prepare(query).all();
        return rows;
    }
    insertFeed(name, feed, mark) {
        let values = { name: name, feed: feed, mark: mark };
        let query = `
            INSERT INTO feeds (userName,userFeed,userMark)
            VALUES (@name, @feed, @mark)`;
        db.prepare(query).run(values);
    }
}

module.exports = new DataProcessing();
