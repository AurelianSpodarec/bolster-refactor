import React from 'react';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const RecentlyDeletedListItem = ({ item, onMobile, headers }) => (
    <tr key={item.id}>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
            {'##Lorem ipsum##'}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
            {'##Lorem ipsum##'}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[4]}</span>}
            <BlockButtonWrapper>
                <button className="button green">
                    <i className="fal fa-times" /> Restore
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default RecentlyDeletedListItem;
