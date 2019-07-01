import React from 'react';

const SOSCodeList = ({ sosCodes }) =>
    sosCodes.map(code => (
        <tr key={code.id}>
            <td>{`${code.date}`}</td>
            <td>{code.code}</td>
            <td>{code.description}</td>
            <td>{code.hasSynced ? 'Yes' : 'No'}</td>
        </tr>
    ));
export default SOSCodeList;
