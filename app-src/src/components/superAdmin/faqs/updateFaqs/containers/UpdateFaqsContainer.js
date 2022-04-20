import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm, usePrevious, useUpdateItem } from 'helpers/hooks';

import fetchSingleFaqs from 'actions/superAdmin/faqs/async/fetchSingleFaqs';
import UpdateFaqs from '../presentational/UpdateFaqs';
import updateFaqs from 'actions/superAdmin/faqs/async/updateFaqs';
import {
    selectFaqsError,
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
    const error = useSelector(selectFaqsError);
    const faqSingle = useSelector(state => selectFaqsSingle(state, id));
    const prevIsFetching = usePrevious(isFetching);

    const [form, handleChange, setFormData] = useForm({
        type: faqSingle?.type,
        title: faqSingle?.title,
        content: faqSingle?.content,
        imageS3Key: faqSingle?.imageS3Key,
        videoLink: faqSingle?.videoLink,
        pdfS3Key: faqSingle?.pdfS3Key,
        videoThumbnail: faqSingle?.videoThumbnail,
    });

    useEffect(() => {
        dispatch(fetchSingleFaqs(id));
    }, []);

    useEffect(() => {
        if (prevIsFetching && !isFetching && !!faqSingle) {
            setFormData({
                type: faqSingle.type,
                title: faqSingle.title,
                content: faqSingle.content,
                imageS3Key: faqSingle.imageS3Key,
                videoLink: faqSingle.videoLink,
                pdfS3Key: faqSingle.pdfS3Key,
                videoThumbnail: faqSingle.videoThumbnail,
            });
        }
    }, [isFetching, prevIsFetching, faqSingle]);

    useUpdateItem(isPosting, postSuccess, 'Successfully Updated', '/admin/faqs', 'Go back to FAQs');

    const handleSave = () => {
        dispatch(updateFaqs(id, form));
    };

    return (
        <UpdateFaqs
            form={form}
            handleSave={handleSave}
            handleFormChange={handleChange}
            isFetching={isFetching}
            faqSingle={faqSingle}
            error={error}
        />
    );
};

export default UpdateFaqsContainer;
