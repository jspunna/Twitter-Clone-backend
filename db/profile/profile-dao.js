const model = require('./profile-model');

const findProfileById = (id) =>
    model.find(id);
//tried using model.findById, however ran into issues with Id/ObjectId. Only works with model.find().

const updateProfile = (id, updatedProfile) =>
    model.updateOne({_id: id},
        {$set: updatedProfile});

module.exports = {
    findProfileById, updateProfile
};