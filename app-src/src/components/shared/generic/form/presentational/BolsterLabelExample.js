import React from 'react';

import standardLabel from '_content/images/labels/standard.png';
import trimLabel from '_content/images/labels/trim.png';

import BlockHeading from '../../blockHeading/presentational/BlockHeading';

const BolsterLabelExample = ({ name }) => (
    <div className="size-lg-12">
        <BlockHeading title="Label example" />
        <div className="label-example-container size-lg-12">
            <div className="label-example size-lg-6">
                <img src={standardLabel} />
                <p className="label-content-large">{name}</p>
                <p className="label-content-small">{name}</p>
            </div>
            <div className="label-example size-lg-6">
                <img src={trimLabel} />
            </div>
        </div>
    </div>
);

export default BolsterLabelExample;
