const User = (props) => {
    const {fullName, photoURL, uid} = {...props.user};
    const {setUserId, dialogRef} = props;

    return (
        <div className="user-card" id={uid} onClick={() => {
            dialogRef.current.style.display='block';
            setUserId(uid);
        }}>
            <img className="profile-img" src={photoURL} referrerPolicy="no-referrer"/>
            <p className="profile-name">{fullName}</p>
        </div>
    );
}

export default User;