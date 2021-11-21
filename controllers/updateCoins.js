const coinsUpdate = (db, req, res) => {
    const { email, newAmount, type } = req.body;
    if (email && newAmount) {
        if (Number(newAmount) === 0) {
            res.status(400).json(`"${newAmount}" is not valid!`)
        } else {
            db('users').select('coins').where({email: email})
            .then(data => {
                db('users').where({email: email}).update({
                    coins: Boolean(type) ?  Number(newAmount + Number(data[0].coins)) :  Number(Number(data[0].coins) - newAmount)
                }).returning('coins')
                .then((coins) => {
                    res.status(200).json({
                        coins:coins[0]
                    })
                }).catch(() => res.status(400).json("Error"))
            }).catch(() => res.status(400).json("Error"))
        }

    } else {
        res.status(400).json("Check your amount/email")
    }
}

module.exports = {
    coinsUpdate: coinsUpdate
}