import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import MessageCentre from 'components/companyAdmin/messages/messageCentre/MessageCentre';

const MessagesRoutes = ({ base = '/company/message-centre' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={MessageCentre} />
    </SwitchWith404>
);

export default MessagesRoutes;
