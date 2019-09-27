import React from 'react';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { DELETED_DATA_TYPE } from 'constants/companyAdmin/enums';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const RecentlyDeletedListItem = ({ item, onMobile, headers, handleRestore }) => (
    <tr key={item.id}>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
            {item.fullName}
        </td>

        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
            <DateTimeContainer date={item.createdOn} />
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
            {item.deletedOn ? <DateTimeContainer date={item.deletedOn} /> : 'Not available'}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
            {item.deletedByCompanyUserName ? item.deletedByCompanyUserName : 'Not available'}
            {!!item.deletedByCompanyName && ` (${item.deletedByCompanyName})`}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[4]}</span>}
            {DELETED_DATA_TYPE[item.hierarchyName]}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[5]}</span>}
            <BlockButtonWrapper>
                <button
                    className="button green"
                    onClick={() => handleRestore(item.id, item.hierarchyName)}
                >
                    <i className="fal fa-sync" /> Restore
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default RecentlyDeletedListItem;
