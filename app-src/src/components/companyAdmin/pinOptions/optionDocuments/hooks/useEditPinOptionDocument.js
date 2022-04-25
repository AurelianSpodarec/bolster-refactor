import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'helpers/hooks';
import { selectPinOptionDocumentsIsPosting } from 'selectors/companyAdmin/pinOptionsDocuments';
import editPinOptionDocument from 'actions/companyAdmin/pinOptionsDocuments/async/editPinOptionDocument';

const useEditPinOptionDocument = documentsVersion => {
    console.log(documentsVersion.documentS3Key);
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionDocumentsIsPosting);

    const [form, handleChange] = useForm({
        name: documentsVersion.name,
        documentS3Key: documentsVersion.s3Key,
    });

    const handleSubmit = () => {
        const postBody = {
            ...form,
        };

        dispatch(editPinOptionDocument(documentsVersion.id, postBody));
    };

    return { form, handleChange, handleSubmit, isPosting };
};

export default useEditPinOptionDocument;
