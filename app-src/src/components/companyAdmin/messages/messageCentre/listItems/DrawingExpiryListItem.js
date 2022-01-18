import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import dismissDrawingExpiryMessage from 'actions/companyAdmin/messageCentre/async/dismissDrawingExpiryMessage';

const DrawingExpiryListItem = ({ message: { id, drawings, createdOn } }) => {
    const dispatch = useDispatch();
    return (
        <div key={id} className="message-wrapper">
            <div className="title-wrapper">
                <h3 className="title">{`You have ${drawings.length} drawings expiring soon`}</h3>

                <div className="date-wrapper">
                    <span className="date">{moment(createdOn).format('DD/MM/YY - hh:mm')}</span>
                    <button
                        className="no-background-btn"
                        onClick={() => dispatch(dismissDrawingExpiryMessage())}
                    >
                        <i className="fas fa-times-circle close-icon" />
                    </button>
                </div>
            </div>

            <div>
                <button className="button rounded">View Drawings</button>
            </div>
        </div>
    );
};

export default DrawingExpiryListItem;
