import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import TextEditor from 'components/superAdmin/frontendTextEdit/containers/TextEditorContainer';

const MergeToolRoutes = ({ base = '/admin/text-editor' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={TextEditor} />
    </SwitchWith404>
);

export default MergeToolRoutes;
