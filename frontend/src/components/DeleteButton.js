import './styles/Mailbox.css';
async function handleDeleteClick(props) {
    console.log(props.id) //comment id

    const res = await fetch(`http://localhost:3001/mailboxes/delete/${props.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                id: props.id
            }
        )
    })

    if(res.ok)
    {
        //props.onCommentDeleted();
    }
    else
    {
        console.error("Ne gre zbrisati komentarja");
    }

}


function DeleteButton(props) {

    return (
        <button className="delete-button" type="button" onClick={() => handleDeleteClick(props)}>
            {props.text}
        </button>
    )

}

export default DeleteButton;