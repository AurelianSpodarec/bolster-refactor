import React from 'react';

import GridWrapper from 'components/shared/generic/gridWrapper/GridWrapper';
import DocumentPod from 'components/shared/documentPods/DocumentPod';

const OptionDocumentsList = () => {
    return (
        <GridWrapper gap={15} itemsPerRow={5}>
            <DocumentPod />
            <DocumentPod />
            <DocumentPod />
            <DocumentPod />
            <DocumentPod />
            <DocumentPod />
            <DocumentPod />
            <DocumentPod />
            <DocumentPod />
            <DocumentPod />
        </GridWrapper>
    );
};

export default OptionDocumentsList;
