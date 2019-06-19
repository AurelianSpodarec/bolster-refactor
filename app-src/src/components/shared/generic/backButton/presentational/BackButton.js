import React from 'react';

import ButtonContainer from '../../button/containers/ButtonContainer';

const BackButton = ({
    handleClick,
    classes = '',
    backFromForm,
    location,
    history
}) =>
    backFromForm ? (
        <button
            to={location.pathname.replace(
                backFromForm.urlToReplace,
                backFromForm.with
            )}
            onClick={() =>
                history.replace(
                    location.pathname.replace(
                        backFromForm.urlToReplace,
                        backFromForm.with
                    )
                )
            }
            className="button"
        >
            <i className="fa fa-chevron-double-left" /> Back
        </button>
    ) : (
        <ButtonContainer
            className={`button back ${classes}`}
            handleClick={handleClick}
        >
            <i className="fa fa-chevron-double-left" /> Back
        </ButtonContainer>
    );

export default BackButton;
