import React from 'react';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import TemplateSection from './TemplateSection';

const SingleTemplate = ({ sections, questions, headers }) => (
    <Block>
        <BlockHeading title="Template" />
        {sections.map(section => (
            <React.Fragment key={section.id}>
                <BlockHeading title={section.name} />
                <Table headers={headers}>
                    <TemplateSection
                        section={section}
                        questions={questions[section.id]}
                    />
                </Table>
            </React.Fragment>
        ))}
    </Block>
);

export default SingleTemplate;
