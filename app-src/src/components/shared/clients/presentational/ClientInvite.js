import React from 'react';
import { withRouter } from 'react-router-dom';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonNoClickContainer from 'components/shared/generic/button/containers/ButtonNoClickContainer';

const ClientsInvite = ({ type, location }) => (
    <div className="size-lg-12">
        <BlockHeading title="Invite Client">
            <ButtonNoClickContainer
                className="pull-right green"
                to={`${location.pathname}/invite-client`}
            >
                <i className="fa fa-plus" /> Invite
            </ButtonNoClickContainer>
        </BlockHeading>
        <p className="generic-text size-lg-12">
            If you invite a client to this {type}, they will be given access to
            each drawing it contains. To remove the client you will need to
            remove them from each drawing individually.
        </p>
    </div>
);

export default withRouter(ClientsInvite);
