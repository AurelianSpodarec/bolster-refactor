import React from 'react';

import ButtonContainer from '../../button/containers/ButtonContainer';
import ActionButton from '../../button/presentational/ActionButton';
import LinkButton from '../../button/presentational/LinkButton';

const BackButton = ({ handleClick, classes = '', backFromForm, location, history }) =>
    backFromForm ? (
        <LinkButton
            href={location.pathname.replace(backFromForm.urlToReplace, backFromForm.with)}
            text="Back"
            icon="fa fa-chevron-double-left"
            source="secondary"
            size="medium"
            onClick={() =>
                history.replace(
                    location.pathname.replace(backFromForm.urlToReplace, backFromForm.with),
                )
            }
            extraClasses="button back-button"
        />
    ) : (
        <ActionButton
            text="Back"
            icon="fa fa-chevron-double-left"
            source="secondary"
            size="medium"
            extraClasses="back-button"
            onClick={handleClick}
        />
    );

export default BackButton;
