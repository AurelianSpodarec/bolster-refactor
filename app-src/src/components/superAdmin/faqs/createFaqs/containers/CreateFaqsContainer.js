import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddItem } from 'helpers/hooks';

import { getKeyByValue } from 'helpers/generic';
import { FAQS_PAGES } from 'constants/superAdmin/faqs';

import postFaqs from 'actions/superAdmin/faqs/async/postFaqs';
import { selectFaqsIsPosting, selectFaqsPostSuccess } from 'selectors/superAdmin/faqs';

import CreateFaqs from '../presentational/CreateFaqs';

const CreateFaqsContainer = () => {
    const dispatch = useDispatch();
    const [faqText, setFaqText] = useState('');
    const [form, setFormChange] = useState({
        faqTitle: 'FAQs Name',
        faqType: { text: FAQS_PAGES[1], value: FAQS_PAGES[1] },
    });
    const isPosting = useSelector(selectFaqsIsPosting);
    const postSuccess = useSelector(selectFaqsPostSuccess);
    useAddItem(isPosting, postSuccess, 'Success', '/admin/faqs', 'Go back to FAQs');

    const handleFormChange = (name, value) => {
        if (name === 'faqType') {
            setFormChange({
                ...form,
                [name]: { text: value, value: value },
            });
        } else {
            setFormChange({
                ...form,
                [name]: value,
            });
        }
    };

    const handleSave = () => {
        const { faqTitle, faqType } = form;

        const postBody = {
            Title: faqTitle,
            Content: faqText,
            Type: Number(getKeyByValue(FAQS_PAGES, faqType.value)),
        };

        dispatch(postFaqs(postBody));
    };

    return (
        <CreateFaqs
            {...form}
            handleSave={handleSave}
            faqText={faqText}
            setFaqText={setFaqText}
            handleFormChange={handleFormChange}
        />
    );
};

export default CreateFaqsContainer;
