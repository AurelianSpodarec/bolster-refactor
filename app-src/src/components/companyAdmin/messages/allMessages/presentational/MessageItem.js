import React from 'react';

const MessageItem = ({ message: { message }, dismissMessage }) => (
    <tr>
        <td>{message}</td>
        <td>
            <button className="button" onClick={dismissMessage}>
                Dismiss
            </button>
        </td>
    </tr>
);

export default MessageItem;
