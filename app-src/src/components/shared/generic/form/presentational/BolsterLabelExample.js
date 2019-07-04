import React from 'react';

import standardLabel from '_content/images/labels/standard.png';
import trimLabel from '_content/images/labels/trim.png';

import BlockHeading from '../../blockHeading/presentational/BlockHeading';

const BolsterLabelExample = ({ name, hierarchy }) => (
    <div className="size-lg-12 label-example">
        <BlockHeading title="Label example" />
        <p className="generic-text size-lg-12 padded">
            If you choose to have this name display on your Bolster labels,
            below is how this will look.
        </p>
        <div className="label-example-container size-lg-12">
            <div className="label-example size-lg-6">
                <img alt="example label standard" src={standardLabel} />
                <p className="label-content-small">
                    {hierarchy}: {name}
                </p>
            </div>
            <div className="label-example size-lg-6">
                <img alt="example label small" src={trimLabel} />
                <p className="label-content-small for-trim">
                    {hierarchy}: {name}
                </p>
            </div>
        </div>
    </div>
);

export default BolsterLabelExample;
