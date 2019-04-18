import React from 'react';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import TemplateSection from './TemplateSection';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import { formatQuestions } from 'helpers/templates';
import TemplateSectionQuestionDetailsContainer from '../containers/TemplateSectionQuestionDetailsContainer';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const SingleTemplate = ({ sections, questions, headers }) => (
    <>
        <PageHeading leftChildren={true} title="Template ">
            <BackButtonContainer />
        </PageHeading>
        <div className="size-lg-8">
            {sections.map(({ id, name, ...section }) => (
                <Block key={id}>
                    <BlockHeading title={`Section: ${name}`} />
                    <Table headers={headers}>
                        <TemplateSection
                            section={section}
                            questions={formatQuestions(questions[id])}
                        />
                    </Table>
                </Block>
            ))}
        </div>
        <div className="size-lg-4">
            <TemplateSectionQuestionDetailsContainer questions={questions} />
        </div>
    </>
);

export default SingleTemplate;
