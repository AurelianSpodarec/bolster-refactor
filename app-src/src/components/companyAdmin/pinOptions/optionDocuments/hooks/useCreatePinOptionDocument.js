import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'helpers/hooks';
import { selectPinOptionDocumentsIsPosting } from 'selectors/companyAdmin/pinOptionsDocuments';
import createPinOptionDocument from 'actions/companyAdmin/pinOptionsDocuments/async/createPinOptionDocument';

const useCreatePinOptionDocument = optionID => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionDocumentsIsPosting);

    const [form, handleChange] = useForm({
        name: '',
        documentS3Key: null,
    });

    const handleSubmit = () => {
        const postBody = {
            ...form,
        };

        dispatch(createPinOptionDocument(postBody, optionID));
    };

    return { form, handleChange, handleSubmit, isPosting };
};

export default useCreatePinOptionDocument;
