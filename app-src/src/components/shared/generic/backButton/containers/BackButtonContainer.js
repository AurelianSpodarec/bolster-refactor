import React from 'react';
import { withRouter } from 'react-router-dom';
import BackButton from '../presentational/BackButton';

const BackButtonContainer = ({
    history: { goBack },
    history,
    classes,
    backFromForm = '',
    location
}) => (
    <BackButton
        classes={classes}
        handleClick={goBack}
        backFromForm={backFromForm}
        location={location}
        history={history}
    />
);

export default withRouter(BackButtonContainer);
