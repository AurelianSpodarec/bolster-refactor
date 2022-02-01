import React from 'react';
import { Route } from 'react-router-dom';
import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllFaqsContainer from 'components/superAdmin/faqs/allFaqs/containers/AllFaqsContainer';
import CreateFaqsContainer from 'components/superAdmin/faqs/createFaqs/containers/CreateFaqsContainer';

const FaqsRoutes = ({ base = '/admin/faqs' }) => (
    <SwitchWith404>
        <Route exact path={base} component={AllFaqsContainer} />
        <Route exact path={`${base}/new`} component={CreateFaqsContainer} />
        {/* <Route exact path={`${base}/edit/:id`} component={UpdateLegalDocumentVersionContainer} />
        <Route exact path={`${base}/update/:id`} component={UpdateLegalDocumentVersionContainer} /> */}
    </SwitchWith404>
);

export default FaqsRoutes;
