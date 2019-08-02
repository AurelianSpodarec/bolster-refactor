import React from 'react';
import { Link } from 'react-router-dom';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const DrawingShareLink = ({ shareLink, postShareLink }) => (
    <BlockContainer heading="Share link">
        {!!shareLink && (
            <Field name="Your unique link is:">
                <Link
                    to={`/drawingShareLinks/${shareLink.shareKey}`}
                >{`/drawingShareLinks/${shareLink.shareKey}`}</Link>
            </Field>
        )}
        <Field name="Generate unique share link">
            <ButtonContainer handleClick={postShareLink}>
                Generate New Link
            </ButtonContainer>
        </Field>
    </BlockContainer>
);

export default DrawingShareLink;
