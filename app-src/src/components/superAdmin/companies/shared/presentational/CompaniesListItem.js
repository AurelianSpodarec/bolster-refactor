import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import {
    DATE_TIME_IDS,
    COMPANY_TYPES,
    getEnumKey
} from 'constants/companyAdmin/enums';
import { capitaliseWord } from 'helpers/generic';

const CompaniesListItem = ({
    company: { name, telephone, address, id, termsAcceptedOn, companyType },
    match: { url }
}) => (
    <tr>
        <td>{name}</td>
        <td>{telephone || '-'}</td>
        <td>{address || '-'}</td>
        <td>
            {termsAcceptedOn ? (
                <DateTimeContainer
                    date={termsAcceptedOn}
                    datetime={DATE_TIME_IDS.DATE}
                />
            ) : (
                '-'
            )}
        </td>
        <td>{capitaliseWord(getEnumKey(COMPANY_TYPES, companyType))}</td>
        <td>
            <Link to={`${url}/${id}`} className="button">
                More info
            </Link>
        </td>
    </tr>
);

export default withRouter(CompaniesListItem);
