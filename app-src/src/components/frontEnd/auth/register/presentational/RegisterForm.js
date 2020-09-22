import React from 'react';

import RegisterPageContainer from '../containers/RegisterPageContainer';

const RegisterForm = ({ handleSubmit, handleChange, activePage }) => {
    return (
        <RegisterPageContainer
            activePage={activePage}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default RegisterForm;
