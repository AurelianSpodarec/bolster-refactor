import postCompanyTracking from 'actions/superAdmin/companies/async/postCompanyTracking';
import Checkbox from 'components/shared/generic/form/presentational/Checkbox';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const CompanyContacted = ({ contacted, period, companyID }) => {
    const [contactedState, setContacted] = useState(contacted);

    const dispatch = useDispatch();

    const handleButtonClick = () => {
        const prevContacted = contactedState;
        setContacted(state => !state);
        dispatch(
            postCompanyTracking({
                ContactPeriod: period,
                Contacted: !contacted,
                CompanyId: companyID,
            }),
        ).catch(() => {
            setContacted(prevContacted);
        });
    };

    return (
        <div className="contacted-container">
            <Checkbox
                name={`contacted-${companyID}`}
                checked={contactedState}
                handleChange={handleButtonClick}
            />
        </div>
    );
};

export default CompanyContacted;
