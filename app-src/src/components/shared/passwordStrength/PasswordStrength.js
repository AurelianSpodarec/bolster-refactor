import React from 'react';

import useFetchPasswordRegex from './hooks/useFetchPasswordRegex';

const PasswordStrengh = () => {
    const { isFetching, error } = useFetchPasswordRegex();

    if (error) return null;

    if (isFetching) {
        return (
            <div className="loading-password-strength size-lg-12">
                <i className="fa fa-spinner fa-spin"></i>
            </div>
        );
    }

    return (
        <div className="password-strength size-lg-12">
            <div className="bar size-lg-12">
                <div className="indicator weak" />
                <div className="indicator fair" />
                <div className="indicator strong" />
            </div>
            <p className="size-lg-12">Strengh</p>
        </div>
    );
};

export default PasswordStrengh;
