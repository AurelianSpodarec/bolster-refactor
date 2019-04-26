import React from 'react';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const TemplateListItem = ({ template: { name, serviceName, id } }) => (
    <tr>
        <td>{name}</td>
        <td>{serviceName}</td>
        <td>
            <ButtonContainer to={`/company/tools/templates/${id}`}>
                View
            </ButtonContainer>
        </td>
    </tr>
);

export default TemplateListItem;
