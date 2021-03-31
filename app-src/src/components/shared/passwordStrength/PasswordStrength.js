import React from 'react';

import { isEmpty, reverseEnum } from 'helpers/generic';

import useFetchPasswordRegex from './hooks/useFetchPasswordRegex';
import usePasswordStrength from './hooks/usePasswordStrength';

import {
    passwordStrengthNames,
    passwordStrengthValues,
    passwordStrengthColours,
} from 'constants/shared/passwordStrength';

const strengthValues = Object.keys(passwordStrengthValues);

const PasswordStrengh = ({ password }) => {
    const { passwordRegex, isFetching, error } = useFetchPasswordRegex();
    const strength = usePasswordStrength(password);
    const strengthLookup = strength ? reverseEnum(passwordStrengthValues) : null;

    if (error) return null;

    if (isFetching && isEmpty(passwordRegex)) {
        return (
            <div className="loading-password-strength size-lg-12">
                <i className="fa fa-spinner fa-spin"></i>
            </div>
        );
    }

    return (
        <div className="password-strength size-lg-12">
            <div className="bar size-lg-12">
                {strengthValues.map(key => {
                    const curValue = passwordStrengthValues[key];
                    const isActive = strength >= curValue;

                    return (
                        <div
                            key={curValue}
                            className={`indicator ${key} ${isActive ? 'active' : ''}`}
                            style={
                                isActive
                                    ? { backgroundColor: passwordStrengthColours[curValue] }
                                    : {}
                            }
                        />
                    );
                })}
            </div>
            <p
                className={`size-lg-12 ${strength ? strengthLookup[strength].toLowerCase() : ''}`}
                style={strength ? { color: passwordStrengthColours[strength] } : {}}
            >
                {strength ? passwordStrengthNames[strength] : 'Strength'}
            </p>
        </div>
    );
};

export default PasswordStrengh;
