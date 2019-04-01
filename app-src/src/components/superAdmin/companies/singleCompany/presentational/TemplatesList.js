import React from 'react';

import TemplatesListItem from './TemplatesListItem';

const TemplatesList = ({ templates }) =>
    templates.map(template => (
        <TemplatesListItem key={template.uuid} template={template} />
    ));

export default TemplatesList;
