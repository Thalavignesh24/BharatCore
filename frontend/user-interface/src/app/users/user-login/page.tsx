
import '../common-design/login.css';

const login = () => {
    return (
        <div className="main">

            <div className="header">
                <h1>
                    USER LOGIN
                </h1>
            </div>

            <div className="container">
                <div id="loginContainer">
                    <input name="email" id="input-box" placeholder="Email ID"></input>
                    <br></br><br></br>

                    <input name="password" id="input-box" placeholder="Password"></input>
                    <br></br><br></br>

                    <input type="checkbox"></input>
                    <span>Remember me</span>

                    <a href="http://localhost:3000/users/user-login"> Forgot Password? </a>
                    <br></br><br></br>
                    <button id="submitField">Login</button>

                </div>

            </div>

            <div className="footer">

            </div>

        </div>
    )
}


export default login;