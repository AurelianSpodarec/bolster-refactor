import React from 'react';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import TemplateSection from './TemplateSection';

const SingleTemplate = ({ version, sections, questions, headers }) => (
    <Block>
        <BlockHeading title="Template" />
        {sections.map(section => (
            <>
                <BlockHeading title={section.name} />
                <Table key={section.id} headers={headers}>
                    <TemplateSection
                        section={section}
                        questions={questions[section.id]}
                    />
                </Table>
            </>
        ))}
    </Block>
);

export default SingleTemplate;
