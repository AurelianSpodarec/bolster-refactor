import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from '../SwitchWith404';
import AllMessagesContainer from 'components/companyAdmin/messages/allMessages/containers/AllMessagesContainer';

const MessagesRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={AllMessagesContainer} />
    </SwitchWith404>
);

export default MessagesRoutes;
