import React from 'react';

import standardLabel from '_content/images/labels/standard.png';
import trimLabel from '_content/images/labels/trim.png';

import BlockHeading from '../../blockHeading/presentational/BlockHeading';

const BolsterLabelExample = () => (
    <div className="size-lg-12">
        <BlockHeading title="Label example" />
        <div className="flex-container size-lg-12">
            <div className="flex-padding size-lg-6">
                <img src={standardLabel} />
            </div>
            <div className="flex-padding size-lg-6">
                <img src={trimLabel} />
            </div>
        </div>
    </div>
);

export default BolsterLabelExample;
