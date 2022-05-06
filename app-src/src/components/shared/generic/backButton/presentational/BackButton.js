import React from 'react';

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
            extraClasses="back-btn"
        />
    ) : (
        <ActionButton
            text="Back"
            icon="fa fa-chevron-double-left"
            source="secondary"
            size="medium"
            extraClasses="back-btn"
            onClick={handleClick}
        />
    );

export default BackButton;
