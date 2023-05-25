import {Link} from "react-router-dom";
import DeleteButton from "./DeleteButton";
import './styles/Mailbox.css';

function Mailbox(props) {
    const mailboxId = props.mailbox._id;
    const isAdminSite = window.location.pathname === "/admin";
    const isNotAdminSite = window.location.pathname !== "/admin";

    return (
        <div>
            {isAdminSite && (
                <div className="mailbox-container-admin">
                    <table className="mailbox-table">
                        <tbody>
                        <tr>
                            <th>Box ID</th>
                            <th>Location</th>
                            <th>Open</th>
                            {isAdminSite && (
                                <>
                                    <th>Read More</th>
                                    <th>Delete</th>
                                </>
                            )}
                        </tr>
                        <tr>
                            <td>{props.mailbox.boxID}</td>
                            <td>
                                <div className="mailbox-box">
                                    <div className="mailbox-image"></div>
                                    <p className="mailbox-info">
                                        {props.mailbox.street}, {props.mailbox.postcode}, {props.mailbox.post}
                                    </p>
                                </div>
                            </td>
                            <td>{props.mailbox.open.toString()}</td>
                            {isAdminSite && (
                                <>
                                    <td>
                                        <Link to={`/mailboxes/${mailboxId}`} className="mailbox-link">
                                            More info
                                        </Link>
                                    </td>
                                    <td>
                                        <DeleteButton id={props.mailbox._id} text="Delete mailbox" />
                                    </td>
                                </>
                            )}
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {isNotAdminSite && (
                <div className="mailbox-container">
                    <h5 className="mailbox-name">Box ID: {props.mailbox.boxID}</h5>
                    <div className="mailbox-box">
                        <div className="mailbox-image"></div>
                        <p className="mailbox-info">
                            {props.mailbox.street}, {props.mailbox.postcode}, {props.mailbox.post}
                        </p>
                    </div>
                    <p className="mailbox-info">Open: {props.mailbox.open.toString()}</p>
                </div>
            )}
        </div>
    );
}


export default Mailbox;