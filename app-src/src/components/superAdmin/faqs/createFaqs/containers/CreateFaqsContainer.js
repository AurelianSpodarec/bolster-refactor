import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddItem, useForm } from 'helpers/hooks';

import { getKeyByValue } from 'helpers/generic';
import { FAQS_PAGES } from 'constants/superAdmin/faqs';

import postFaqs from 'actions/superAdmin/faqs/async/postFaqs';
import { selectFaqsIsPosting, selectFaqsPostSuccess } from 'selectors/superAdmin/faqs';

import CreateFaqs from '../presentational/CreateFaqs';

const CreateFaqsContainer = () => {
    const dispatch = useDispatch();

    const initialForm = useMemo(() => {
        return {
            type: { text: FAQS_PAGES[1], value: FAQS_PAGES[1] },
            title: 'FAQ Name',
            content: '',
            imageS3Key: '',
            pdfS3Key: '',
            videoLink: '',
        };
    }, []);

    const [form, handleChange] = useForm(initialForm);

    const isPosting = useSelector(selectFaqsIsPosting);
    const postSuccess = useSelector(selectFaqsPostSuccess);

    useAddItem(isPosting, postSuccess, 'Success', '/admin/faqs', 'Go back to FAQs');

    const handleFormChange = (name, value) => {
        if (name === 'type') {
            handleChange(name, { text: value, value: value });
        } else {
            handleChange(name, value);
        }
    };

    const handleSave = () => {
        dispatch(postFaqs({ ...form, type: Number(getKeyByValue(FAQS_PAGES, form.type.value)) }));
    };

    return <CreateFaqs form={form} handleSave={handleSave} handleFormChange={handleFormChange} />;
};

export default CreateFaqsContainer;
