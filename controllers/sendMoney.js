const sendMoneyController = (req, res, db) =>  {
    const { moneySentToID, amount, sentByID } = req.body 
    if (moneySentToID && amount && sentByID) {
        db('users').select('coins')
        .where({id: Number(sentByID)})
        .then(data => {
            if (data[0].coins < Number(amount) || moneySentToID === sentByID || Number(amount) === 0) {
                res.status(400).json({
                    error: "You dont have enough money"
                })
            } else {
                db('users').select('coins').where({ id: Number(moneySentToID) }).then(userData => {
                    db('users').where({ id: Number(moneySentToID) }).update({
                        coins: Number(amount) + Number(userData[0].coins)
                    }).then(() => {
                        db('users').where({id: sentByID}).update({
                            coins: Number(data[0].coins - Number(amount))
                        }).then(() => {
                            db('users').select('name', 'coins', 'id', 'email', 'joined').where({id: sentByID}).then(user => {
                                res.status(200).json({
                                    name: user[0].name,
                                    email: user[0].email,
                                    coins: user[0].coins,
                                    joined: user[0].joined,
                                    id: user[0].id
                                })
                            })
                        })
                    })
                })
            }
        })
    }
}

module.exports = {
    sendMoneyController: sendMoneyController
}