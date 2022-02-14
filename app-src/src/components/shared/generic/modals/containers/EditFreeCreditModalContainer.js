import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import postCompanyFreeCredit from 'actions/superAdmin/companies/async/postCompanyFreeCredit';

import EditFreeCreditModal from '../presentational/EditFreeCreditModal';
import { usePrevious } from 'helpers/hooks';
import { selectCompaniesPostSuccess } from 'selectors/superAdmin/companies';

const EditFreeCreditModalContainer = ({ company }) => {
    const dispatch = useDispatch();
    const [shouldReceiveFreeCredit, setShouldReceiveFreeCredit] = useState(
        company.shouldReceiveFreeCredit,
    );

    const postSuccess = useSelector(selectCompaniesPostSuccess);
    const prevPostSuccess = usePrevious(postSuccess);

    const closeModal = () => dispatch(hideModal());

    const handleSubmit = () => {
        dispatch(postCompanyFreeCredit(company.id, { shouldReceiveFreeCredit }));
    };

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            closeModal();
        }
    }, [postSuccess, prevPostSuccess]);

    return (
        <EditFreeCreditModal
            company={company}
            shouldReceiveFreeCredit={shouldReceiveFreeCredit}
            handleChange={setShouldReceiveFreeCredit}
            handleSubmit={handleSubmit}
            closeModal={closeModal}
        />
    );
};

export default EditFreeCreditModalContainer;
