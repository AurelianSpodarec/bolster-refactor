import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { passwordStrengthValues } from 'constants/shared/passwordStrength';
import { isEmpty } from 'helpers/generic';

const { weak, okay, strong } = passwordStrengthValues;

const usePasswordStrength = password => {
    const [strength, setStrength] = useState(null);
    const { passwordRegex } = useSelector(mapStateToProps);

    useEffect(() => {
        if (isEmpty(passwordRegex)) return;
        getStrength();
    }, [password, passwordRegex]);

    return strength;

    function getStrength() {
        const { minimumStrength, targetStrength } = passwordRegex;
        const target = new RegExp(targetStrength);
        const minimum = new RegExp(minimumStrength);

        if (!password) {
            if (strength) setStrength(null);
            return;
        }

        if (target.test(password)) {
            if (strength !== strong) setStrength(strong);
            return;
        }

        if (minimum.test(password)) {
            if (strength !== okay) setStrength(okay);
            return;
        }

        if (strength !== weak) setStrength(weak);
    }
};

const mapStateToProps = ({
    shared: {
        passwordRegexReducer: { passwordRegex },
    },
}) => ({
    passwordRegex,
});

export default usePasswordStrength;
