import React from 'react';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const TemplateListItem = ({
    template: { name, serviceName, id },
    headers,
    onMobile
}) => (
    <tr>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[0]}</span>
            )}
            {name}
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[1]}</span>
            )}
            {serviceName}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">Actions</span>}
            <ButtonContainer to={`/company/tools/templates/${id}`}>
                View
            </ButtonContainer>
        </td>
    </tr>
);

export default TemplateListItem;
