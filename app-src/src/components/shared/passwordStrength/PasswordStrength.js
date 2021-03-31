import React from 'react';

import useFetchPasswordRegex from './hooks/useFetchPasswordRegex';
import usePasswordStrength from './hooks/usePasswordStrength';

import { passwordStrengthNames, passwordStrengthValues } from 'constants/shared/passwordStrength';

const strengthValues = Object.values(passwordStrengthValues);

const PasswordStrengh = ({ password }) => {
    const { isFetching, error } = useFetchPasswordRegex();
    const strength = usePasswordStrength(password);

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
                {strengthValues.map(value => {
                    const isActive = strength >= value;

                    return (
                        <div
                            key={value}
                            className={`indicator ${passwordStrengthNames[value].toLowerCase()} ${
                                isActive ? 'active' : ''
                            }`}
                        />
                    );
                })}
            </div>
            <p
                className={`size-lg-12 ${
                    strength ? passwordStrengthNames[strength].toLowerCase() : ''
                }`}
            >
                {strength ? passwordStrengthNames[strength] : 'Strength'}
            </p>
        </div>
    );
};

export default PasswordStrengh;
