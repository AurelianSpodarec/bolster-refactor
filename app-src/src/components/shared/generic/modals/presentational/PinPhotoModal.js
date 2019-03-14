import React from 'react';

const PinPhotoModal = ({ hideModal }) => (
    <div>
        <h3 className="heading heading-3" />
        <button className="button" onClick={hideModal}>
            Close
        </button>
    </div>
);

export default PinPhotoModal;
