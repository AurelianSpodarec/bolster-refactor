import React from 'react';

const JobReferenceTableItem = ({ jobReference }) => (
    <tr>
        <td>{jobReference.name}</td>
        <td>{jobReference.description}</td>
        <td></td>
    </tr>
);

export default JobReferenceTableItem;
