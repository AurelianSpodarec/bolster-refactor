import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DemoAccessCodes from '../presentational/DemoAccessCodes';
import fetchAllDemoAccessCodes from 'actions/superAdmin/demoAccessCodes/async/fetchAllDemoAccessCodes';
import moment from 'moment';

const DemoAccessCodesContainer = () => {
    const dispatch = useDispatch();
    const { demoAccessCodes, isFetching } = useSelector(
        ({ superAdmin: { demoAccessCodesReducer } }) => demoAccessCodesReducer,
    );

    useEffect(() => {
        dispatch(fetchAllDemoAccessCodes());
    }, []);

    return (
        <DemoAccessCodes
            accessCodes={Object.values(demoAccessCodes).filter(({ expiresOn }) =>
                moment(expiresOn).isAfter(),
            )}
            isFetching={isFetching}
        />
    );
};

export default DemoAccessCodesContainer;
