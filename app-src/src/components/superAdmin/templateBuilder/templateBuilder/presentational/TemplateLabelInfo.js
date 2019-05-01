import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const TemplateLabelInfo = () => (
    <div className="template-block size-lg-12">
        <BlockContainer>
            <BlockHeading classes="w-table" title="Label Fields">
                <button className="button blue">Update</button>
            </BlockHeading>
        </BlockContainer>
    </div>
);

export default TemplateLabelInfo;
