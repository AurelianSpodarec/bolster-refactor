import React from 'react';
import TemplateListItem from './TemplateListItem';

const TemplatesList = ({ templates, onMobile, headers }) =>
    templates.map(template => (
        <TemplateListItem
            key={template.id}
            template={template}
            onMobile={onMobile}
            headers={headers}
        />
    ));

export default TemplatesList;
