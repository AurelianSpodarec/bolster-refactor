import React from 'react';
import image from '_content/images/examples/pipe.jpg';

const PinPhotoModal = ({ hideModal }) => (
    <div>
        <h3 className="heading heading-3" />
        <img alt="pin" src={image} />
        <button className="button" onClick={hideModal}>
            Close
        </button>
    </div>
);

export default PinPhotoModal;
