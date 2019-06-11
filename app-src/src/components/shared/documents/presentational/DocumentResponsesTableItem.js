import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const DocumentResponsesTableItem = ({ response, user, handleShowModal }) => (
    <tr>
        <td>
            {user.userFirstName && `${user.userFirstName} ${user.userLastName}`}
        </td>
        <td>
            <DateTimeContainer date={response.createdOn} />
        </td>
        <td>
            <DateTimeContainer date={response.syncedOn} />
        </td>
        <td>
            <BlockButtonWrapper>
                <ButtonContainer handleClick={handleShowModal}>
                    More info
                </ButtonContainer>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default DocumentResponsesTableItem;
