import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import dismissDrawingExpiryMessage from 'actions/companyAdmin/messageCentre/async/dismissDrawingExpiryMessage';
import { MESSAGE_CENTRE_DRAWING_EXPIRY } from 'constants/shared/modalTypes';

const DrawingExpiryListItem = ({ message: { id, drawings, createdOn } }) => {
    const dispatch = useDispatch();

    const handleViewDrawings = e => {
        e.preventDefault();

        dispatch(showModal(MESSAGE_CENTRE_DRAWING_EXPIRY, { drawings }));
    };
    return (
        <div key={id} className="message-wrapper">
            <div className="title-wrapper">
                <h3 className="title">{`You have ${drawings.length} drawings set to expire in the next 2 weeks`}</h3>

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
                <button className="button rounded" onClick={handleViewDrawings}>
                    View Drawings
                </button>
            </div>
        </div>
    );
};

export default DrawingExpiryListItem;
