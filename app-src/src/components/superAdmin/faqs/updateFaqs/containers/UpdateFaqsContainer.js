import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getKeyByValue, isEmpty } from 'helpers/generic';
import { FAQS_PAGES } from 'constants/superAdmin/faqs';
import { useUpdateItem } from 'helpers/hooks';
import fetchSingleFaqs from 'actions/shared/faqs/async/fetchSingleFaqs';
import UpdateFaqs from '../presentational/UpdateFaqs';
import updateFaqs from 'actions/shared/faqs/async/updateFaqs';

const UpdateFaqsContainer = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [faqText, setFaqText] = useState('');
    const [form, setFormChange] = useState({
        faqTitle: 'FAQs Name',
        // faqType: { text: FAQS_PAGES[1], value: FAQS_PAGES[1] },
    });
    const isPosting = useSelector(state => state.shared.faqsReducer.isPosting);
    const postSuccess = useSelector(state => state.shared.faqsReducer.postSuccess);
    const isFetching = useSelector(state => state.shared.faqsReducer.isFetching);
    const faqsSingle = useSelector(state => state.shared.faqsReducer.faqsSingle);
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
