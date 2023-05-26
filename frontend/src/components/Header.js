import {useContext} from "react";
import {UserContext} from "../userContext";
import {Link} from "react-router-dom";
import './styles/Header.css';
import titleImg from "./pictures/box.png";

function Header(props) {
    return (
        <header>
            <div className="maindiv">
                <div className="title">
                    <img className="title-img" src={titleImg} />
                    <h2 className="h2-title">{props.title}</h2>
                </div>
                <div className="othersdiv">
                    <UserContext.Consumer>
                        {context => (
                            context.user ? (
                                <>
                                    <Link to='/' className="nav-link">Home</Link>
                                    <Link to='/profile' className="nav-link">Profile</Link>
                                    <Link to={`/mymailbox/${context.user._id}`} className="nav-link">My mailbox</Link>
                                    {context.user.isAdmin && <Link to="/admin" className="nav-link">Admin</Link>}
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
