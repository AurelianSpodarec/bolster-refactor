import React from 'react';
import { withRouter } from 'react-router-dom';
import BackButton from '../presentational/BackButton';

const BackButtonContainer = ({ history: { goBack }, classes }) => (
    <BackButton classes={classes} handleClick={goBack} />
);

export default withRouter(BackButtonContainer);
