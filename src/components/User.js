const User = (props) => {
    const {fullName, photoURL, uid} = {...props.user};

    return (
        <div id={uid}>
            <img className="profile-img" src={photoURL}/>
            <h4 className="profile-name">{fullName}</h4>
        </div>
    );
}

export default User;