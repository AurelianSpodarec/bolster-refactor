import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS, COMPANY_TYPES, getEnumKey } from 'constants/companyAdmin/enums';
import { capitaliseWords } from 'helpers/generic';

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
    },
    match: { url },
}) => (
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
            <Link to={`${url}/${id}`} className="button">
                More info
            </Link>
        </td>
    </tr>
);

export default withRouter(CompaniesListItem);
