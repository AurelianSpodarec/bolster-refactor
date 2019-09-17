import React from 'react';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { DELETED_DATA_TYPE } from 'constants/companyAdmin/enums';

const RecentlyDeletedListItem = ({ item, onMobile, headers, handleRestore }) => (
    <tr key={item.id}>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
            {item.name}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
            {item.type === DELETED_DATA_TYPE.DRAWING ? 'Drawing' : 'Pin History'}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
            <BlockButtonWrapper>
                <button className="button green" onClick={() => handleRestore(item.id, item.type)}>
                    <i className="fal fa-sync" /> Restore
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default RecentlyDeletedListItem;
