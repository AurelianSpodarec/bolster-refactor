import React from 'react';
import moment from 'moment';

import OptionValueDocumentsListItemContainer from '../containers/OptionValueDocumentsListItemContainer';

const OptionValueDocumentsList = ({ documents }) => {
    return documents
        .sort((a, b) => moment(a.createdAt) - moment(b.createdAt))
        .map(document => (
            <OptionValueDocumentsListItemContainer key={document.id} document={document} />
        ));
};

export default OptionValueDocumentsList;
