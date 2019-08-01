import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const DrawingShareLink = ({ shareLink }) => (
    <BlockContainer heading="Share link">
        {shareLink ? (
            <Field name="Your unique link is:">
                <a href={shareLink}>{shareLink}</a>
            </Field>
        ) : (
            <Field name="Generate unique share link">
                <ButtonContainer onClick={() => {}}>
                    Generate Link
                </ButtonContainer>
            </Field>
        )}
    </BlockContainer>
);

export default DrawingShareLink;
