import React from 'react';
import { withRouter } from 'react-router-dom';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const OperativesAdd = ({ type, location, unavailable }) => (
    <div className="size-lg-12">
        <BlockHeading title="Attach Operative">
            <ButtonWrapper alignment="right">
                <LinkButton
                    disabled={unavailable}
                    href={`${location.pathname}/add-operative`}
                    icon="plus"
                    ambient="positive"
                    text="Attach"
                />
            </ButtonWrapper>
        </BlockHeading>
        <p className="generic-text size-lg-12">
            If you attach an operative to this {type}, they will be given access to each drawing it
            contains. To remove the operative you will need to remove them from each drawing
            individually.
        </p>
    </div>
);

export default withRouter(OperativesAdd);
