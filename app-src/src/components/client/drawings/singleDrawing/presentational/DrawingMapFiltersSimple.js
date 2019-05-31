import React from 'react';

import RedPin from '_content/images/map-markers/red-pin2x.png';
import GreenPin from '_content/images/map-markers/green-pin2x.png';
import BluePin from '_content/images/map-markers/blue-pin2x.png';
import YellowPin from '_content/images/map-markers/yellow-pin2x.png';
import PurplePin from '_content/images/map-markers/purple-pin2x.png';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const DrawingMapFiltersSimple = ({
    installed,
    inspected,
    noAction,
    action,
    other
}) => (
    <BlockHeading>
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
    </BlockHeading>
);

export default DrawingMapFiltersSimple;
