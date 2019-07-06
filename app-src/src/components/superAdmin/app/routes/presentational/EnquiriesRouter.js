import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllEnquiriesContainer from 'components/superAdmin/enquiries/shared/containers/AllEnquiriesContainer';
import SingleEnquiryContainer from 'components/superAdmin/enquiries/singleEnquiry/containers/SingleEnquiryContainer';

const EnquiriesRoutes = ({ base = '/admin/enquiries' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={AllEnquiriesContainer} />
        <Route path={`${base}/:id`} component={SingleEnquiryContainer} />
    </SwitchWith404>
);

export default EnquiriesRoutes;
