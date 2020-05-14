import React from 'react';
import moment from 'moment';

import OptionValueDocumentsListItemContainer from '../containers/OptionValueDocumentsListItemContainer';

const OptionValueDocumentsList = ({ documents, optionValueID }) => {
    return documents
        .sort((a, b) => moment(a.createdAt) - moment(b.createdAt))
        .map(document => (
            <OptionValueDocumentsListItemContainer
                key={document.id}
                document={document}
                optionValueID={optionValueID}
            />
        ));
};

export default OptionValueDocumentsList;
