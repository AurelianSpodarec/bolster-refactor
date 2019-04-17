import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';

const CompaniesListItem = ({
    company: { name, telephone, address, id, termsAcceptedOn },
    match: { url }
}) => (
    <tr>
        <td>{name}</td>
        <td>{telephone || '##Not listed##'}</td>
        <td>{address || '##Not listed##'}</td>
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
        <td>
            <Link to={`${url}/${id}`} className="button">
                More info
            </Link>
        </td>
    </tr>
);

export default withRouter(CompaniesListItem);
