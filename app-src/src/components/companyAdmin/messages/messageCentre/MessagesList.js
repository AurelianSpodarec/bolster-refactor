import React from 'react';

const MessagesList = ({ messages }) => {
    return (
        <div className="messages-container">
            {messages.map(message => (
                <div key={message.id} className="message-wrapper">
                    <div className="title-wrapper">
                        <h3 className="title">{message.title}</h3>

                        <div className="date-wrapper">
                            <span className="date">{message.date}</span>
                            <i className="fas fa-times-circle close-icon" />
                        </div>
                    </div>

                    <div
                        dangerouslySetInnerHTML={{ __html: message.message }}
                        className="wysiwyg"
                    />
                </div>
            ))}
        </div>
    );
};

export default MessagesList;
