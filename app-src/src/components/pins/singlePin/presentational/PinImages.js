import React from 'react';
import image from '_content/images/examples/pipe.jpg';

const PinImages = ({ images }) =>
    images.map((src, i) => (
        <img key={src + i} alt="pin" src={image} style={{ width: 50 }} />
    ));

export default PinImages;
