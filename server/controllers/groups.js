function createGroup(req, res) {
  
  const db = req.app.get('db')

        const { userid, group_name } = req.body

        db.groups
            .save({
                userid,
                group_name,
            })
            .then(group => res.status(201).json(group))
            .catch(err => {
                res.status(500).end()
  })
          
}

function groupList(req, res) {

  const db = req.app.get('db')
        db.groups
            .find({userid: req.params.id})
            .then(groups => res.status(200).json(groups))
            .catch(err => {
                res.status(500).end()
            })
}

function addToGroup(req, res) {
  const db = req.app.get('db')

  const id = req.params.id
  const userId = req.params.userid
  const { groupid } = req.body

  db.query(`Update address_book set groupid = ${groupid} where contactid = ${id} and userid = ${userId}`)
  .then(cont => res.status(200).json(cont))
    .catch(err => {
     res.status(500).end()
   })
}

function updateGroupById(req, res){

   const db = req.app.get('db')
   const { group_name }  = req.body
   const id = req.params.id
   const userId = req.params.userid

   console.log(req.body)

   db.query(`Update groups set group_name = '${group_name}' where id = ${id} and userid = ${userId}`)
    .then(item => res.status(200).json(item))
}

module.exports ={
  createGroup,
  groupList,
  addToGroup,
  updateGroupById,
}