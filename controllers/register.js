const registerController = (db, bcrypt, req, res) => {
    const { password, name, email } = req.body;
    if (password && name && email) {
        const hash = bcrypt.hashSync(password);
        db('users')
        .insert({
            password: hash,
            name: name,
            email: email,
            joined: new Date()
        })
        .then(()=> {
            db('users').select('id', 'coins')
            .where({email: email}).then((data) => {
               res.status(200).json({ 
                email: email,
                id: data[0].id,
                coins: data[0].coins,
                joined: new Date(),
                name: name

                })
            })

        }).catch((err) => res.status(400).json("Error"))

    } else {
        res.status(400).json("Check credentials")
    }
}

module.exports = {
    registerController: registerController
}