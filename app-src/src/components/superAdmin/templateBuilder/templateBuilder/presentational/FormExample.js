import React from 'react';

import SectionFormContainer from '../containers/SectionFormContainer';

const FormExample = ({ sections }) => (
    <>
        <div className="size-lg-12">
            {sections.map(section => (
                <SectionFormContainer key={section.uuid} section={section} />
            ))}
        </div>
    </>
);

export default FormExample;
