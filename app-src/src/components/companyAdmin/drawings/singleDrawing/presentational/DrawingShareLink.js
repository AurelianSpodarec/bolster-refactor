import React from 'react';
import { Link } from 'react-router-dom';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const DrawingShareLink = ({ shareLink, postShareLink }) => (
    <BlockContainer heading="Share link">
        <div className="share-link size-lg-12">
            {!!shareLink && (
                <>
                    <p className="generic-text">
                        Here is your unique share code:{' '}
                        <Link
                            to={`/drawingShareLinks/${shareLink.shareKey}`}
                        >{`/drawingShareLinks/${shareLink.shareKey}`}</Link>
                    </p>
                </>
            )}

            <ButtonContainer handleClick={postShareLink}>Generate New Link</ButtonContainer>
        </div>
    </BlockContainer>
);

export default DrawingShareLink;
