import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AllFaqs from '../presentational/AllFaqs';
import fetchAllFaqs from 'actions/shared/faqs/async/fetchAllFaqs';
import deleteFaqs from 'actions/shared/faqs/async/deleteFaqs';

const AllFaqsContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { faqs, isFetching } = useSelector(state => state.shared.faqsReducer);

    const handleAddFaq = () => history.push('/admin/faqs/new');

    const handleDeleteFaqs = id => {
        dispatch(deleteFaqs(id));
    };

    useEffect(() => {
        dispatch(fetchAllFaqs());
    }, []);

    return (
        <AllFaqs
            faqs={Object.values(faqs)}
            isFetching={isFetching}
            createDocument={handleAddFaq}
            handleDelete={handleDeleteFaqs}
        />
    );
};

export default AllFaqsContainer;
