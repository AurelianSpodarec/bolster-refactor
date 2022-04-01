import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm, useUpdateItem } from 'helpers/hooks';

import fetchSingleFaqs from 'actions/superAdmin/faqs/async/fetchSingleFaqs';
import UpdateFaqs from '../presentational/UpdateFaqs';
import updateFaqs from 'actions/superAdmin/faqs/async/updateFaqs';
import {
    selectFaqsIsFetching,
    selectFaqsIsPosting,
    selectFaqsPostSuccess,
    selectFaqsSingle,
} from 'selectors/superAdmin/faqs';

const UpdateFaqsContainer = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const isPosting = useSelector(selectFaqsIsPosting);
    const postSuccess = useSelector(selectFaqsPostSuccess);
    const isFetching = useSelector(selectFaqsIsFetching);
    const faqSingle = useSelector(state => selectFaqsSingle(state, id));

    const [form, handleChange] = useForm({
        type: faqSingle.type,
        title: faqSingle.title,
        content: faqSingle.content,
        imageS3Key: faqSingle.imageS3Key,
        pdfS3Key: faqSingle.pdfS3Key,
        videoLink: faqSingle.videoLink,
    });

    useUpdateItem(isPosting, postSuccess, 'Successfully Updated', '/admin/faqs', 'Go back to FAQs');

    const handleSave = () => {
        dispatch(updateFaqs(id, form));
    };

    useEffect(() => {
        dispatch(fetchSingleFaqs(id));
    }, []);

    return (
        <UpdateFaqs
            form={form}
            handleSave={handleSave}
            handleFormChange={handleChange}
            isFetching={isFetching}
            faqSingle={faqSingle}
        />
    );
};

export default UpdateFaqsContainer;
