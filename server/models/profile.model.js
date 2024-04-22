import mongoose from 'mongoose';

const profile = new mongoose.Schema(
    {
        profile_pic: { type: String },
        location: { type: String },
        what_brings_you_here: { type: String },
    },
    { collection: 'profile-data' }
);

profile.set('timestamps', true);

const Profile = mongoose.model('Profile', profile);

export { Profile };
export default Profile;