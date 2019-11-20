db.getCollection('channels').insertMany([{ "name":"Channel de test 1", "description":"Ceci est le Channel de test 1", "idChannel":"test1"}]);
db.getCollection('users').insertMany([{
  "login": "user1",
  "password": "user1",
  "email": "Mclaughlin.Cochran@undefined.com",
  "firstname": "Mclaughlin",
  "lastname": "Cochran",
  "address": {
    "street": "Jewel Street",
    "postalCode": "61400",
    "city": "Snelling"
  },
  "phone": "+33600000000",
  "picture": "https://i.kym-cdn.com/photos/images/newsfeed/000/313/882/cc0.gif"
}]);

db.getCollection('channels').createIndex({ idChannel: 1 }, { unique: true });
db.getCollection('users').createIndex({ login: 1 }, { unique: true });
