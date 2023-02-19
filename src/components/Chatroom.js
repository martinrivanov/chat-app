import { useNavigate, useParams } from "react-router"

const Chatroom = () => {
    const navigate = useNavigate();
    const params = useParams();

    return(
        <main>
            <button onClick={() => navigate('/')}>Go back</button>
            <div>Chatroom...</div>
        </main>
    )
}

export default Chatroom;