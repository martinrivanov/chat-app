/*TODO:
    1. СЛОЖИ ДИАЛОГОВИЯТ ПРОЗОРЕЦ В ОТДЕЛЕН КОМПОНЕНТ КАТО ТОЙ ДА БЪДЕ ИЗПОЛЗВАН И ЗА РЕГИСТРАЦИЯ
    2. ДОПИШИ ДОКУМЕНТАЦИЯТА
    3. ЗАПИШИ РЕГИСТРИРАНИТЕ ПОТРЕБИТЕЛИ В БАЗАТА И ДА БЪДАТ ПОКАЗАНИ ВСИЧКИ ПОТРЕБИТЕЛИ СЛЕД УСПЕШНО ВЛИЗАНЕ
    4. НАПРАВИ АУТЕНТИКАЦИЯТА ВЪЗМОЖНА ПРЕЗ ИМЕЙЛ И ПРЕЗ GOOGLE ПРОФИЛ
*/

import { useNavigate } from "react-router";
import '../App.css';
import Login from "./Login";

function Welcome(){
    const showLogIn = () => {
        document.getElementsByClassName('modal')[0].style.display = 'block';
    }

    return (
        <div>
            <div className="welcome-header">
                <h1>Welcome to ChatApp</h1>
                <p>Be able to connect with others</p>
            </div>

            <Login />

            <div className="auth-btns">
                <button onClick={() => showLogIn()}>Log in</button>
                <button>Sign up</button>
            </div>

            {/* <div>
                <button onClick={() => navigate('/login')}>Sign in</button>
                <p>If you don't have an account, click <a href="#">here</a></p>
            </div> */}
        </div>
    )
}

export default Welcome;