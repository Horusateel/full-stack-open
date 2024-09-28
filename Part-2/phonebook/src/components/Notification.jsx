const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    if (message.endsWith("added") || message.endsWith("updated")) {
        return (
            <div className="success">
                {message}
            </div>
        )
    } else {
        return (
            <div className="error">
                {message}
            </div>
        )
    }
}

export default Notification;