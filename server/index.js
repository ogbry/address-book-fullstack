const express = require('express');
const massive = require('massive');
const cors = require("cors");

const users = require('./controllers/users.js');
const contacts = require('./controllers/contacts.js');
const groups = require('./controllers/groups.js');


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

  //Users
  app.post('/signup', users.create);
  app.post('/signin', users.login);
  
  //Contacts
  app.post('/createcontact', contacts.createContact);
  app.get('/addressbook/:id', contacts.contactList);
  app.get('/addressbook/view/:id', contacts.getById);
  app.delete('/addressbook/delete/:userid/:id', contacts.deleteById);
  app.patch('/addressbook/update/:id', contacts.updateContact)

  //Groups
  app.post('/creategroup', groups.createGroup);
  app.get('/grouplist/:id', groups.groupList);
  // app.get('/addtogroup/:id', groups.addToGroup);

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});