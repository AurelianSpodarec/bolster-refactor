import React, { useState } from 'react';

import RegisterForm from '../presentational/RegisterForm';

const RegisterFormContainer = () => {
    const [page, setPage] = useState(2);
    return <RegisterForm activePage={page} />;
};

export default RegisterFormContainer;
