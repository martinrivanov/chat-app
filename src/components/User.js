const User = (props) => {
    const [displayName, photoURL] = {...props};

    return (
        <div>
            <img src={photoURL}/>
            <h3>{displayName}</h3>
        </div>
    );
}