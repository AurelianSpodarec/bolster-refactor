import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'helpers/generic';
import { useUpdateItem } from 'helpers/hooks';
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
    const [faqText, setFaqText] = useState('');
    const [form, setFormChange] = useState({
        faqTitle: 'FAQs Name',
    });
    const isPosting = useSelector(selectFaqsIsPosting);
    const postSuccess = useSelector(selectFaqsPostSuccess);
    const isFetching = useSelector(selectFaqsIsFetching);
    const faqsSingle = useSelector(state => selectFaqsSingle(state, id));

    useUpdateItem(isPosting, postSuccess, 'Successfully Updated', '/admin/faqs', 'Go back to FAQs');

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

    const handleUpdate = () => {
        const { faqTitle } = form;

        const postBody = {
            ID: faqsSingle.id,
            Title: faqTitle,
            Content: faqText,
        };

        dispatch(updateFaqs(postBody));
    };

    useEffect(() => {
        dispatch(fetchSingleFaqs(id));
    }, []);

    useEffect(() => {
        if (faqsSingle && !isEmpty(faqsSingle)) {
            handleFormChange('faqTitle', faqsSingle.title);
            setFaqText(faqsSingle.content);
        }
    }, [faqsSingle]);

    return (
        <UpdateFaqs
            {...form}
            handleUpdate={handleUpdate}
            faqText={faqText}
            setFaqText={setFaqText}
            handleFormChange={handleFormChange}
            isFetching={isFetching}
            faqsSingle={faqsSingle}
        />
    );
};

export default UpdateFaqsContainer;
