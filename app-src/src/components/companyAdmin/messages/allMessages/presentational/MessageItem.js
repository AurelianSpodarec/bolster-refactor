import React from 'react';

const MessageItem = ({ message: { message } }) => (
    <tr>
        <td>{message}</td>
        <td>
            <button className="button">Dismiss</button>
        </td>
    </tr>
);

export default MessageItem;
