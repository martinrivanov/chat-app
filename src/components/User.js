const User = (props) => {
    const {fullName, photoURL, uid} = {...props.user};

    return (
        <div className="user-card" id={uid}>
            <img className="profile-img" src={photoURL}/>
            <p className="profile-name">{fullName}</p>
        </div>
    );
}

export default User;