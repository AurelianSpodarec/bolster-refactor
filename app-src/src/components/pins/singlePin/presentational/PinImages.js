import React from 'react';
import image from '_content/images/examples/pipe.jpg';

const PinImages = ({ images, showModal }) =>
    images.map((src, i) => (
        <div
            className="pin-image"
            onClick={() => showModal({ image })}
            key={src + i}
        >
            <span
                style={{ backgroundImage: `url(${image})` }}
                className="image-holder"
            />
        </div>
    ));

export default PinImages;
