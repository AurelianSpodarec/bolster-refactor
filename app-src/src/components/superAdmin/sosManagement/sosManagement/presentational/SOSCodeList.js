import React from 'react';
import moment from 'moment';
import { DATE_TIMES } from 'constants/companyAdmin/enums';

const SOSCodeList = ({ sosCodes }) =>
    sosCodes.map(code => (
        <tr key={code.id}>
            <td>{`${moment(code.timestamp).format(DATE_TIMES[1])}`}</td>
            <td>{code.code}</td>
            <td>{code.description}</td>
            <td>{code.hasUserSynced ? 'Yes' : 'No'}</td>
        </tr>
    ));
export default SOSCodeList;
