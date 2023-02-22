const User = (props) => {
    const {fullName, photoURL, uid} = {...props.user};
    const {setUserId, btnRef} = props;

    return (
        <div className="user-card" id={uid} onClick={() => {
            btnRef.current.style.display='block';
            setUserId(uid);
        }}>
            <img className="profile-img" src={photoURL}/>
            <p className="profile-name">{fullName}</p>
        </div>
    );
}

export default User;