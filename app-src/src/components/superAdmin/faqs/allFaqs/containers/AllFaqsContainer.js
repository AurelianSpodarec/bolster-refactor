import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AllFaqs from '../presentational/AllFaqs';
import fetchAllFaqs from 'actions/shared/faqs/async/fetchAllFaqs';

const AllFaqsContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { faqs, isFetching } = useSelector(state => state.shared.faqsReducer);

    const handleAddFaq = () => history.push('/admin/faqs/new');

    useEffect(() => {
        dispatch(fetchAllFaqs());
    }, []);

    return <AllFaqs faqs={faqs} isFetching={isFetching} createDocument={handleAddFaq} />;
};

export default AllFaqsContainer;
