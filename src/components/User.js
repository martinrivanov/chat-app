const User = (props) => {
    const {fullName, photoURL, uid} = {...props.user};

    return (
        <div id={uid}>
            <img src={photoURL}/>
            <h4>{fullName}</h4>
        </div>
    );
}

export default User;