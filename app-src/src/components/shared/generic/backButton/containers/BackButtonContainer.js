import React from 'react';
import { withRouter } from 'react-router-dom';
import BackButton from '../presentational/BackButton';

const BackButtonContainer = ({
    history: { goBack },
    classes,
    backFromForm = '',
    backURL = '',
    location
}) => (
    <BackButton
        classes={classes}
        handleClick={goBack}
        backFromForm={backFromForm}
        location={location}
        backURL={backURL}
    />
);

export default withRouter(BackButtonContainer);
