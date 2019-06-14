import React from 'react';
import { withRouter } from 'react-router-dom';
import BackButton from '../presentational/BackButton';

const BackButtonContainer = ({
    history: { goBack },
    classes,
    backFromForm = '',
    location
}) => (
    <BackButton
        classes={classes}
        handleClick={goBack}
        backFromForm={backFromForm}
        location={location}
    />
);

export default withRouter(BackButtonContainer);
