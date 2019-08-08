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
   
}

module.exports ={
  createGroup,
  groupList,
  addToGroup
}