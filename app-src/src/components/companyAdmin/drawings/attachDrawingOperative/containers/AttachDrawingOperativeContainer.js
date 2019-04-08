import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    HIERARCHY_IDS,
    COMPANY_USER_ROLE_TYPES
} from 'constants/companyAdmin/enums';
import fetchOperativesForDrawing from 'actions/companyAdmin/operatives/async/fetchOperativesForDrawing';

import AttachOperativesFormContainer from 'components/shared/operatives/containers/AttachOperativesFormContainer';

class AttachDrawingOperativeContainer extends Component {
    render() {
        const { operativeUsers, drawingUserIDs } = this.props;
        const operativeUsersOptions = operativeUsers.filter(
            user => !drawingUserIDs.includes(user.id)
        );
        return (
            <AttachOperativesFormContainer
                hierarchyType={HIERARCHY_IDS.DRAWING}
                operativeUsers={operativeUsersOptions}
            />
        );
    }

    componentDidMount = () => {
        const {
            fetchOperativesForDrawing,
            match: { params }
        } = this.props;

        fetchOperativesForDrawing(params.id);
    };
}

const { OPERATIVE } = COMPANY_USER_ROLE_TYPES;
const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { users },
        operativesReducer: { operatives }
    }
}) => ({
    operativeUsers: Object.values(users).filter(
        ({ type }) => type === OPERATIVE
    ),
    drawingUserIDs: Object.values(operatives).map(
        operative => operative.companyUserID
    )
});

const mapDispatchToProps = dispatch => ({
    fetchOperativesForDrawing: id => {
        dispatch(fetchOperativesForDrawing(id));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AttachDrawingOperativeContainer)
);
