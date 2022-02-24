import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import postCompanyJobRefDropdown from 'actions/superAdmin/companies/async/postCompanyJobRefDropdown';

import EditJobRefDropdownModal from '../presentational/EditJobRefDropdownModal';
import { usePrevious } from 'helpers/hooks';
import { selectCompaniesPostSuccess } from 'selectors/superAdmin/companies';

const EditFreeCreditModalContainer = ({ company }) => {
    const dispatch = useDispatch();
    const [isJobReferenceDropdownEnabled, setIsJobReferenceDropdownEnabled] = useState(
        company.isJobReferenceDropdownEnabled,
    );

    const postSuccess = useSelector(selectCompaniesPostSuccess);
    const prevPostSuccess = usePrevious(postSuccess);

    const closeModal = () => dispatch(hideModal());

    const handleSubmit = () => {
        dispatch(postCompanyJobRefDropdown(company.id, { isJobReferenceDropdownEnabled }));
    };

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            closeModal();
        }
    }, [postSuccess, prevPostSuccess]);

    return (
        <EditJobRefDropdownModal
            company={company}
            isJobReferenceDropdownEnabled={isJobReferenceDropdownEnabled}
            handleChange={setIsJobReferenceDropdownEnabled}
            handleSubmit={handleSubmit}
            closeModal={closeModal}
        />
    );
};

export default EditFreeCreditModalContainer;
