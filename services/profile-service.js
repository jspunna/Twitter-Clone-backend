const dao = require('../db/profile/profile-dao');

module.exports = (app) => {

    const findProfileById = (req, res) => {
        dao.findProfileById({_id : '61981fcddf5f55eebd87bf80'}) //only one profile in profiles collection
            .then(prof => res.json(prof));
    }
    app.get('/profile/get', findProfileById);

    const updateProfile = (req, res) => {
        dao.updateProfile(req.params.id, req.body)
            .then((status) => res.send(status));
    }
    app.put('/profile/:id', updateProfile);

};