function createContact(req, res) {
  const db = req.app.get('db');
  
  const { 
          id,
          first_name,
          last_name,
          home_phone,
          mobile_phone,
          work_phone,
          email,
          city,
          state_or_province,
          postal_code,
          country } = req.body;
          console.log(req.body)
  db.contacts
    .insert(
      {   
            first_name,
            last_name,
            home_phone,
            mobile_phone,
            work_phone,
            email,
            city,
            state_or_province,
            postal_code,
            country,

        address_book: [
          {
            userid: req.body.id,
            contactid: undefined,
          },
        ],
      },
      {
        deepInsert: true, 
      }
    )
    .then(data => res.status(201).json(data))
    .catch(err => {
      console.error(err);
    });  
          
}

function contactList(req, res) {
  const db = req.app.get('db');

  const userId = req.params.id

  db.query(`select * from contacts INNER JOIN address_book on contacts.id = address_book.contactid where address_book.userid = ${userId}`, [])
       .then(data => {
           res.status(200).json(data)
       })
}

function getById(req, res) {
  const db = req.app.get('db');

  db.contacts
    .findOne(req.params.id)
    .then(contact => res.status(200).json(contact))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function deleteById(req, res) {
  const db = req.app.get('db');

  console.log(req.params.id)

  db.contacts
    destroy({id: req.params.id})
    .then(cont => res.status(200).json(cont))
    .catch(err => {
     res.status(500).end()
   })
}

module.exports = {
  createContact,
  contactList,
  getById,
  deleteById,
};





