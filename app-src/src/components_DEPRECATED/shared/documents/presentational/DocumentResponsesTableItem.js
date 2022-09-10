import React from 'react';

import DateTimeContainer from 'components_DEPRECATED/shared/dateTime/containers/DateTimeContainer';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';

const DocumentResponsesTableItem = ({ response, handleShowModal }) => (
    <tr>
        <td>{response.userName}</td>
        <td>
            <DateTimeContainer date={response.createdOn} />
        </td>
        <td>
            <DateTimeContainer date={response.syncedOn} />
        </td>
        <td>
            <ButtonWrapper alignment="right">
                <ActionButton
                    text="More info"
                    source="secondary"
                    ambient="positive"
                    onClick={handleShowModal}
                />
            </ButtonWrapper>
        </td>
    </tr>
);

export default DocumentResponsesTableItem;
