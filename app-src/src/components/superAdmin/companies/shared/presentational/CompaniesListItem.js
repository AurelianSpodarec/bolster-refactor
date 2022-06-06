import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS, COMPANY_TYPES, getEnumKey } from 'constants/companyAdmin/enums';
import { capitaliseWords } from 'helpers/generic';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import { useDispatch } from 'react-redux';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import useCompanyActions from '../hooks/useCompanyActions';

const CompaniesListItem = ({
    company: {
        name,
        telephone,
        address,
        id,
        nextSubscriptionExpiryDate,
        companyType,
        hideOnClientList,
        creditValue,
        isDisabled,
    },
    match: { url },
    company,
}) => {
    const dispatch = useDispatch();

    const { showEnableCompanyModal, showDisableCompanyModal } = useCompanyActions(company);

    return (
        <tr>
            <td>{name}</td>
            <td>{telephone || '-'}</td>
            <td>{address || '-'}</td>
            <td>
                {nextSubscriptionExpiryDate ? (
                    <DateTimeContainer
                        date={nextSubscriptionExpiryDate}
                        datetime={DATE_TIME_IDS.DATE}
                    />
                ) : (
                    '-'
                )}
            </td>
            <td>{capitaliseWords(getEnumKey(COMPANY_TYPES, companyType))}</td>
            <td>{creditValue || 0}</td>
            <td>{!hideOnClientList ? 'Yes' : 'No'}</td>
            <td>
                <LinkButton
                    text="More info"
                    href={`${url}/${id}`}
                    source="secondary"
                    ambient="positive"
                />
            </td>
            <td>
                {isDisabled ? (
                    <ActionButton text="Enable" onClick={showEnableCompanyModal} />
                ) : (
                    <ActionButton text="Disable" onClick={showDisableCompanyModal} />
                )}
            </td>
        </tr>
    );
};

export default withRouter(CompaniesListItem);
