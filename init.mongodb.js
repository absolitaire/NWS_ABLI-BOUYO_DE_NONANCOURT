
db.getCollection('channels').createIndex({ idChannel: 1 }, { unique: true });
db.getCollection('users').createIndex({ login: 1 }, { unique: true });
