const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }
    return (
        <div className={message.type === "error" ? "error" : "info"}>
            {message.message}
        </div>
    );
};

export default Notification;
