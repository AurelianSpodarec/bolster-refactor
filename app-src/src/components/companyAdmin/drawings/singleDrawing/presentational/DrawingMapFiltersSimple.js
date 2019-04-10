import React from 'react';

import RedPin from '_content/images/pins-examples/red-pin.svg';
import GreenPin from '_content/images/pins-examples/green-pin.svg';
import BluePin from '_content/images/pins-examples/blue-pin.svg';
import YellowPin from '_content/images/pins-examples/yellow-pin.svg';

const DrawingMapFiltersSimple = () => (
    <div className="size-lg-12">
        <div className="pin-amounts size-lg-12">
            <div className="pin pull-left">
                <img alt="red pin" src={RedPin} />
                <p>100</p>
            </div>
            <div className="pin pull-left">
                <img alt="green pin" src={GreenPin} />
                <p>100</p>
            </div>
            <div className="pin pull-left">
                <img alt="blue pin" src={BluePin} />
                <p>100</p>
            </div>
            <div className="pin pull-left">
                <img alt="yellow pin" src={YellowPin} />
                <p>100</p>
            </div>
        </div>
    </div>
);

export default DrawingMapFiltersSimple;
