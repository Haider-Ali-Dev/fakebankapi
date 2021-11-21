const signIn = (db, bcrypt, req, res) => {
    const { email, password } = req.body;
    if (email && password) {

        db('users').select("password").where({email: email}).then((hash) => {
            const isPasswordValid = bcrypt.compareSync(password, hash[0].password);

            if (isPasswordValid) {
                db('users').select('name', 'coins', 'id', 'email', 'joined').where({email:email}).then(data => {
                    res.status(200).json({
                        name: data[0].name,
                        email: data[0].email,
                        coins: data[0].coins,
                        joined: data[0].joined,
                        id: data[0].id
                    })
                })
            } else {
                res.status(400).json("Wrong credentials")
            }
        }).catch((err) => res.status(400).json(err))
    } else {
        res.status(400).json("Wrong credentials")
    }
}

module.exports = {
    signIn: signIn
}