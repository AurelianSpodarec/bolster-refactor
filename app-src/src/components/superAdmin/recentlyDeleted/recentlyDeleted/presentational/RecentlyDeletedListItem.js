import React from 'react';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const RecentlyDeletedListItem = ({ item, onMobile, headers, handleRestore }) => (
    <tr key={item.createdOn}>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
            {item.name}
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
            {item.deletedBy ? item.deletedBy : 'Not available'}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[4]}</span>}
            {item.type}
        </td>
        {/* <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[5]}</span>}
            <BlockButtonWrapper>
                <button className="button green" onClick={() => handleRestore(item.restoreURI)}>
                    <i className="fal fa-sync" /> Restore
                </button>
            </BlockButtonWrapper>
        </td> */}
    </tr>
);

export default RecentlyDeletedListItem;
