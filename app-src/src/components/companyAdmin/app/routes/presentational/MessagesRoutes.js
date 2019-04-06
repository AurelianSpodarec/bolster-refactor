import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllMessagesContainer from 'components/companyAdmin/messages/allMessages/containers/AllMessagesContainer';

const MessagesRoutes = ({ base = '/company/message-centre' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={AllMessagesContainer} />
    </SwitchWith404>
);

export default MessagesRoutes;
