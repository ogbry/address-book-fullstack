const express = require('express');
const massive = require('massive');
const cors = require("cors");

const users = require('./controllers/users.js');
const contacts = require('./controllers/contacts.js');



massive({
  host: 'localhost',
  port: 5432,
  database: 'address_book_db',
  user: 'postgres',
  password: 'address',
}).then(db => {
  const app = express();
  app.use(cors());
  app.set('db', db);

  app.use(express.json());

  app.post('/signup', users.create);
  app.post('/signin', users.login);
  app.post('/createcontact', contacts.createContact);

  app.get('/addressbook/:id', contacts.contactList);


  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});