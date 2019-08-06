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
  const sort = req.query.sort
  
  db.query(`select * from contacts INNER JOIN address_book on contacts.id = address_book.contactid where address_book.userid = ${userId} ORDER BY last_name ${sort}`, [])
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

  db.address_book
    .destroy({id: req.params.id})
    .then(cont => res.status(200).json(cont))
    .catch(err => {
     res.status(500).end()
   })
}

function updateContact(req, res) {
  const db = req.app.get('db')
  const {
      first_name,
      last_name,
      home_phone,
      mobile_phone,
      work_phone,
      email,
      city,
      state_or_province,
      postal_code,
      country

  } = req.body

    db.contacts
    .update(req.params.id, {
      first_name: first_name,
      last_name: last_name,
      home_phone: home_phone,
      mobile_phone: mobile_phone,
      work_phone: work_phone,
      email: email,
      city: city,
      state_or_province: state_or_province,
      postal_code: postal_code,
      country: country
    })
    .then(item => res.status(200).json(item))
}

module.exports = {
  createContact,
  contactList,
  getById,
  deleteById,
  updateContact,
};
