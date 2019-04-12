import React from 'react';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import TemplateSection from './TemplateSection';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import { formatQuestions } from 'helpers/templates';

const SingleTemplate = ({ sections, questions, headers }) => (
    <>
        <PageHeading title="Template" />
        {sections.map(({ id, name, ...section }) => (
            <Block key={id}>
                <BlockHeading title={name} />
                <Table headers={headers}>
                    <TemplateSection
                        section={section}
                        questions={formatQuestions(questions[id])}
                    />
                </Table>
            </Block>
        ))}
    </>
);

export default SingleTemplate;
