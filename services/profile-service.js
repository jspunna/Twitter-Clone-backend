let profile = require('../data/profile.json');
const dao = require('../db/profile/profile-dao');

module.exports = (app) => {

    /*// A8
    const getCurrentProfile = (req, res) => {
        res.json(profile);
    }
    app.get('/api/profile', getCurrentProfile);

    // A8
    const updateCurrentProfile = (req, res) => {
        profile.map(prof => {
            prof.firstName = req.body.firstName;
            prof.lastName = req.body.lastName;
            prof.profilePicture = req.body.profilePicture;
            prof.bannerPicture = req.body.bannerPicture;
            prof.bio = req.body.bio;
            prof.location = req.body.location;
            prof.website = req.body.website;
            prof.dateOfBirth = req.body.dateOfBirth;
        });
        res.sendStatus(200);
    }
    app.put('/api/profile', updateCurrentProfile);*/

    // A9
    const findProfileById = (req, res) => {
        dao.findProfileById({_id : '61981fcddf5f55eebd87bf80'}) //only one profile in profiles collection
            .then(prof => res.json(prof));
    }
    app.get('/profile/get', findProfileById);

    // A9
    const updateProfile = (req, res) => {
        dao.updateProfile(req.params.id, req.body)
            .then((status) => res.send(status));
    }
    app.put('/profile/:id', updateProfile);

};