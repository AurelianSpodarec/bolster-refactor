import React from 'react';
import { withRouter } from 'react-router-dom';

import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import LinkButton from 'components_DEPRECATED/shared/generic/button/presentational/LinkButton';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';

const ClientsInvite = ({ type, location, unavailable }) => (
    <div className="size-lg-12">
        <BlockHeading title="Invite Client">
            <ButtonWrapper alignment="right">
                <LinkButton
                    disabled={unavailable}
                    href={`${location.pathname}/invite-client`}
                    ambient="positive"
                    text="Invite"
                    icon="plus"
                />
            </ButtonWrapper>
        </BlockHeading>
        <p className="generic-text size-lg-12">
            If you invite a client to this {type}, they will be given access to each drawing it
            contains. To remove the client you will need to remove them from each drawing
            individually.
        </p>
    </div>
);

export default withRouter(ClientsInvite);
