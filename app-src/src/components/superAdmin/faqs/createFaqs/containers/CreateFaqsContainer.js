import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getKeyByValue } from 'helpers/generic';
import CreateFaqs from '../presentational/CreateFaqs';
import { FAQS_PAGES } from 'constants/superAdmin/faqs';
import postFaqs from 'actions/shared/faqs/async/postFaqs';

const CreateFaqsContainer = () => {
    const dispatch = useDispatch();
    const [faqText, setFaqText] = useState('');
    const [form, setFormChange] = useState({
        faqTitle: 'FAQs Name',
        faqType: { text: FAQS_PAGES[1], value: FAQS_PAGES[1] },
    });

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
