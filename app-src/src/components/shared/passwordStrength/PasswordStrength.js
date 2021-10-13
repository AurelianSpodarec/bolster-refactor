import React from 'react';

import { isEmpty } from 'helpers/generic';

import useFetchPasswordRegex from './hooks/useFetchPasswordRegex';
import usePasswordStrength from './hooks/usePasswordStrength';

import {
    passwordStrengthNames,
    passwordStrengthValues,
    passwordStrengthColours,
} from 'constants/shared/passwordStrength';

import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';

const strengthValues = Object.keys(passwordStrengthValues);

const PasswordStrengh = ({ password }) => {
    const { passwordRegex, isFetching, error } = useFetchPasswordRegex();
    const strength = usePasswordStrength(password);

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
            <p>
                <span style={strength ? { color: passwordStrengthColours[strength] } : {}}>
                    {strength ? passwordStrengthNames[strength] : 'Strength'}
                </span>
                <TooltipContainer
                    side="left"
                    text="Password must contain at least one uppercase character, one number, and be 8 characters long."
                >
                    <i className="fa fa-info-circle"></i>
                </TooltipContainer>
            </p>
        </div>
    );
};

export default PasswordStrengh;
