import React from 'react';
import Block from 'components_DEPRECATED/shared/generic/block/presentational/Block';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components_DEPRECATED/shared/generic/tables/presentational/Table';
import TemplateSection from './TemplateSection';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import { formatQuestions } from 'helpers/templates';
import TemplateSectionQuestionDetailsContainer from '../containers/TemplateSectionQuestionDetailsContainer';
import BackButtonContainer from 'components_DEPRECATED/shared/generic/backButton/containers/BackButtonContainer';
import TemplateDetailsContainer from '../containers/TemplateDetailsContainer';

const SingleTemplate = ({ sections, questions, headers, templateID }) => (
    <>
        <PageHeading leftChildren={true} title="Template ">
            <BackButtonContainer />
        </PageHeading>
        <div className="size-lg-8 size-md-12">
            {sections.map(({ id, name, ...section }) => (
                <Block key={id}>
                    <BlockHeading title={`Section: ${name}`} />
                    <Table headers={headers}>
                        <TemplateSection
                            section={section}
                            questions={formatQuestions(questions[id])}
                            headers={headers}
                        />
                    </Table>
                </Block>
            ))}
        </div>
        <div className="size-lg-4 size-md-12">
            <TemplateDetailsContainer templateID={templateID} />
            <TemplateSectionQuestionDetailsContainer questions={questions} />
        </div>
    </>
);

export default SingleTemplate;
