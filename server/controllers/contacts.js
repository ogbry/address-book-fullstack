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
            userId: req.body.id,
            contactId: undefined,
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

module.exports = {
  createContact,
};