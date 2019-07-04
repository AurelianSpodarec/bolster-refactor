import React from 'react';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const SOSCodeList = ({ sosCodes }) =>
    sosCodes.map(code => (
        <tr key={code.id}>
            <td> <DateTimeContainer date={code.timestamp} /></td>
            <td>{code.code}</td>
            <td>{code.description}</td>
            <td>{code.hasUserSynced ? 'Yes' : 'No'}</td>
        </tr>
    ));
export default SOSCodeList;
