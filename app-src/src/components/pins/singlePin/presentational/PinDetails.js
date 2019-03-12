import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';

const PinDetails = ({ pinHistory }) => (
    <div>
        <Block>
            <h3 className="heading heading-3">Details</h3>
            <p>ID</p>
            <p>{pinHistory.id}</p>
            <p>History</p>
            <p>{pinHistory.id}</p>
            <p>ID</p>
            <p>{pinHistory.id}</p>
            <p>ID</p>
            <p>{pinHistory.id}</p>
        </Block>
        <a className="button" href="#/">
            Edit this history
        </a>
    </div>
);

export default PinDetails;
