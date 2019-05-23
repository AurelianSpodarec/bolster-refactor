import React from 'react';
import { Link } from 'react-router-dom';
import ButtonContainer from '../../button/containers/ButtonContainer';

const BackButton = ({ handleClick, classes = '', backFromForm, location }) =>
    backFromForm ? (
        <Link
            to={location.pathname.replace(
                backFromForm.urlToReplace,
                backFromForm.with
            )}
            className="button"
        >
            <i className="fa fa-chevron-double-left" /> Back
        </Link>
    ) : (
        <ButtonContainer
            className={`button back ${classes}`}
            handleClick={handleClick}
        >
            <i className="fa fa-chevron-double-left" /> Back
        </ButtonContainer>
    );

export default BackButton;
