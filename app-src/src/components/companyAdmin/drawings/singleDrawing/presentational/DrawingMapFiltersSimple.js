import React from 'react';

import RedPin from '_content/images/pins-examples/red-pin.svg';
import GreenPin from '_content/images/pins-examples/green-pin.svg';
import BluePin from '_content/images/pins-examples/blue-pin.svg';
import YellowPin from '_content/images/pins-examples/yellow-pin.svg';
import PurplePin from '_content/images/pins-examples/purple-pin.svg';

const DrawingMapFiltersSimple = ({
    installed,
    inspected,
    noAction,
    action,
    other
}) => (
    <div className="">
        <div className="map-filters size-lg-12">
            <div className="pin-amounts size-lg-12">
                <div className="pin pull-left">
                    <img alt="red pin" src={RedPin} />
                    <p>{action}</p>
                </div>
                <div className="pin pull-left">
                    <img alt="green pin" src={GreenPin} />
                    <p>{installed}</p>
                </div>
                <div className="pin pull-left">
                    <img alt="blue pin" src={BluePin} />
                    <p>{inspected}</p>
                </div>
                <div className="pin pull-left">
                    <img alt="yellow pin" src={YellowPin} />
                    <p>{noAction}</p>
                </div>
                <div className="pin pull-left">
                    <img alt="purple pin" src={PurplePin} />
                    <p>{other}</p>
                </div>
            </div>
        </div>
    </div>
);

export default DrawingMapFiltersSimple;
