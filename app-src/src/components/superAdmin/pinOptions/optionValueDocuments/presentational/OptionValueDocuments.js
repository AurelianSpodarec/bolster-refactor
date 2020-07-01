import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import OptionValueDocumentListContainer from '../containers/OptionValueDocumentListContainer';

const OptionValueDocuments = ({ optionValues, optionValueID, handleAddDocumentModal }) => (
    <>
        <PageHeading title={`${optionValues[optionValueID].name} Documents`} withBackButton>
            {' '}
            <button className="button green" onClick={handleAddDocumentModal}>
                <i className="fa fa-plus" /> {'Add Document'}
            </button>
        </PageHeading>
        <OptionValueDocumentListContainer />
    </>
);

export default OptionValueDocuments;
