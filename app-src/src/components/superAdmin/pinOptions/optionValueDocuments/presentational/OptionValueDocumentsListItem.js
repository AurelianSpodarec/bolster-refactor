import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DocumentVersionsListContainer from '../containers/DocumentVersionsListContainer';

const OptionValueDocumentsListItem = ({ document }) => {
    return (
        <BlockContainer>
            <BlockHeading title={document.name} classes={'underline-full'}>
                <button onClick={() => {}} className="button green">
                    <i className="far fa-plus" />
                    Add New Version
                </button>
                <button onClick={() => {}} className="button yellow">
                    <i className="far fa-pencil" />
                    Edit Name
                </button>
            </BlockHeading>

            <DocumentVersionsListContainer document={document} />
        </BlockContainer>
    );
};

export default OptionValueDocumentsListItem;
