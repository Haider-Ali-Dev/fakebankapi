const leaderboardController = (db, req, res) => {
    db('users').select('name', 'coins').then(data =>{
        const sortedData = data.sort((a, b) => parseFloat(a.coins) - parseFloat(b.coins)).reverse()
        res.status(200).json(sortedData)
    })
}

module.exports = {
    leaderboardController: leaderboardController
}