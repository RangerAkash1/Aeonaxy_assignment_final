import "./profile.css";

const ProfileCreation = ({
  avatar,
  location,
  setLocation,
  setAvatar,
  handleNext,
}) => {
  return (
    <div>
      {" "}
      {/*  profile-container */}
      <div className="profile-header">
        <h1>Welcome! Let's create your profile</h1>
        <p>Let others get to know you better! You can do these later</p>

        {/* <div className="avatar-container">
          <label className="profile-label">Add an avatar</label>{" "}
          <img
            className="avatar-image"
            width={100}
            src={avatar ? URL.createObjectURL(avatar) : ""}
            alt="avatar"
          />
          <input
            type="file"
            className="avatar-input"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div> */}

        <div className="avatar-container">
          <h3 className="text-lg font-medium text-zinc-900">Add an avatar</h3>
          <div className="mt-2">
            <div className="w-24 h-24 mx-left p-2 border-2 border-zinc-300 border-dashed rounded-full relative bg-white">
              <img
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : "https://placehold.co/96x96"
                }
                alt="avatar"
                className="w-full h-full rounded-full object-cover"
                width={100}
              />
              <div className="avatar-file">
                <input
                  id="avatar-input"
                  className="avatar-file"
                  type="file"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="location-container">
          <label className="profile-label">Add your location</label>
          <br />

          <input
            type="text"
            id="location"
            placeholder="Enter the location"
            name="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <div className="mt-8 text-center">
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreation;
