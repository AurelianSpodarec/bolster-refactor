import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockTableContainer from '../../blockTable/container/BlockTableContainer';
import { FAQS_PAGES } from 'constants/superAdmin/faqs';
import { reverseObj } from 'helpers/generic';
import { Link } from 'react-router-dom';

const AllFaqs = ({ faqs, isFetching }) => {
    const PAGES = reverseObj(FAQS_PAGES);

    return (
        <>
            <PageHeading title="FAQs" leftChildren={true}>
                <Link to="faqs/new" className="button right green">
                    <i className="fa fa-plus" /> New FAQs
                </Link>
            </PageHeading>
            {Object.keys(PAGES).map((item, index) => {
                return (
                    <BlockTableContainer
                        key={index}
                        faqs={faqs.filter(({ type }) => type === +PAGES[item])}
                        isFetching={isFetching}
                        title={item}
                    />
                );
            })}
        </>
    );
};

export default AllFaqs;
