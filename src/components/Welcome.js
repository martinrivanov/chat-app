/*TODO:
    1. СЛОЖИ ДИАЛОГОВИЯТ ПРОЗОРЕЦ В ОТДЕЛЕН КОМПОНЕНТ КАТО ТОЙ ДА БЪДЕ ИЗПОЛЗВАН И ЗА РЕГИСТРАЦИЯ
    2. ДОПИШИ ДОКУМЕНТАЦИЯТА
    3. ЗАПИШИ РЕГИСТРИРАНИТЕ ПОТРЕБИТЕЛИ В БАЗАТА И ДА БЪДАТ ПОКАЗАНИ ВСИЧКИ ПОТРЕБИТЕЛИ СЛЕД УСПЕШНО ВЛИЗАНЕ
    4. НАПРАВИ АУТЕНТИКАЦИЯТА ВЪЗМОЖНА ПРЕЗ ИМЕЙЛ И ПРЕЗ GOOGLE ПРОФИЛ
*/

import { useNavigate } from "react-router";
import '../App.css';

function Welcome(){
    const navigate = useNavigate();

    const showLogIn = () => {
        document.getElementsByClassName('modal')[0].style.display = 'block';
    }

    const hideLogIn = () => {
        document.getElementsByClassName('modal')[0].style.display = 'none';
    }

    return (
        <div>
            <div className="welcome-header">
                <h1>Welcome to ChatApp</h1>
                <p>Be able to connect with others</p>
            </div>


            <div className="modal">
                <div className="modal-content">
                    <span className="close-btn" onClick={() => hideLogIn()}>&times;</span>
                    <form id="modal-form">  
                        <label for="email">Email:</label>
                        <input type="email" name="email" id="password"  />
                        <label for="password">Password:</label>
                        <input type="password" name="password" id="password"  />
                        <button>Log in</button>
                    </form>
                </div>
            </div>

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