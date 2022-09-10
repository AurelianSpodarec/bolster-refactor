import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import DrawingUploadLog from 'pages/dashboard/superAdmin/drawingUploadLog/DrawingUploadLog';

const DrawingUploadLogRoutes = ({ base = '/admin/drawing-upload-log' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={DrawingUploadLog} />
    </SwitchWith404>
);

export default DrawingUploadLogRoutes;
