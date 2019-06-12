import React from 'react';
import { withRouter } from 'react-router-dom';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const ClientsInvite = ({ type, location, unavailable }) => (
    <div className="size-lg-12">
        <BlockHeading title="Invite Client">
            <ButtonContainer
                disabled={unavailable}
                className={`pull-right ${unavailable ? 'disabled' : 'green'}`}
                to={`${location.pathname}/invite-client`}
            >
                <i className="fa fa-plus" /> Invite
            </ButtonContainer>
        </BlockHeading>
        <p className="generic-text size-lg-12">
            If you invite a client to this {type}, they will be given access to
            each drawing it contains. To remove the client you will need to
            remove them from each drawing individually.
        </p>
    </div>
);

export default withRouter(ClientsInvite);
