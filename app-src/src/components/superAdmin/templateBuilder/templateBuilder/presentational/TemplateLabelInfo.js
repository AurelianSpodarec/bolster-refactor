import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import LabelFieldList from './LabelFieldList';

const TemplateLabelInfo = ({ showSetLabelsModal, labelFields }) => (
    <div className="template-block size-lg-12">
        <BlockContainer>
            <BlockHeading classes="w-table" title="Label Fields">
                <button className="button blue" onClick={showSetLabelsModal}>
                    Update
                </button>
                <LabelFieldList />
            </BlockHeading>
        </BlockContainer>
    </div>
);

export default TemplateLabelInfo;
