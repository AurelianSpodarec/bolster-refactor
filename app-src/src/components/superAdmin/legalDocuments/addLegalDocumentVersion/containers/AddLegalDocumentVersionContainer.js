import React, { useEffect, useState } from 'react';
import AddLegalDocumentVersion from '../presentational/AddLegalDocumentVersion';
import { useParams } from 'react-router-dom';

const AddLegalDocumentVersionContainer = () => {
    const { id } = useParams();
    console.log({ id });
    useEffect(() => {
        // fetch document, latest version / draft
    }, []);
    const [documentText, setDocText] = useState('');

    return (
        <AddLegalDocumentVersion
            handleSaveDraft={handleSaveDraft}
            handlePublishDraft={handlePublishDraft}
            documentText={documentText}
            setDocText={setDocText}
        />
    );

    function handleSaveDraft() {}
    function handlePublishDraft() {}
};

export default AddLegalDocumentVersionContainer;
