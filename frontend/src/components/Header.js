import {useContext} from "react";
import {UserContext} from "../userContext";
import {Link} from "react-router-dom";
import './styles/Header.css';

function Header(props) {
    return (
        <header>
            <div className="maindiv">
                <div className={"title"}>
                    <h1>{props.title}</h1>
                </div>
                <div className="othersdiv">
                    <Link to='/' className="nav-link">Home</Link>
                    <UserContext.Consumer>
                        {context => (
                            context.user ? (
                                <>
                                    <Link to='/publish' className="nav-link">Publish</Link>
                                    <Link to='/profile' className="nav-link">Profile</Link>
                                    <Link to={`/mymailbox/${context.user._id}`} className="nav-link">My mailbox</Link>
                                </>
                            ) : null
                        )}
                    </UserContext.Consumer>
                </div>


                <div className="logdiv">
                    <UserContext.Consumer>
                        {context => (
                            context.user ?
                                <div>
                                    <Link to='/logout' className="nav-link">Logout</Link>
                                </div>
                                :
                                <div className="login-register">
                                    <Link to='/login' className="nav-link">Login</Link>
                                    <Link to='/register' className="nav-link">Register</Link>
                                </div>
                        )}
                    </UserContext.Consumer>
                </div>
            </div>
        </header>
    );
}

export default Header;