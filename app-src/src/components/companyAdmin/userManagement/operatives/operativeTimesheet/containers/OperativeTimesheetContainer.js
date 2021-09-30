import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import OperativeTimesheet from '../presentational/OperativeTimesheet';

const OperativeTimesheetContainer = () => {
    return <OperativeTimesheet operativeName="##User Name##" />;
};

export default withRouter(connect(null)(OperativeTimesheetContainer));
