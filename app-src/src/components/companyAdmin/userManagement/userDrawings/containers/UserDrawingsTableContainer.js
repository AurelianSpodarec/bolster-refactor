import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchUserDrawings from 'actions/companyAdmin/userManagement/async/fetchUserDrawings';
import UserDrawingsTable from '../presentational/UserDrawingsTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

class UserDrawingsTableContainer extends Component {
    state = {
        drawingIDs: []
    };

    render() {
        const { drawingIDs } = this.state;
        const { drawings, isFetching, showModal, id } = this.props;

        return (
            <UserDrawingsTable
                headers={['Drawing', 'Remove access']}
                handleDrawingIDs={this.handleDrawingIDs}
                selectAll={this._selectAll}
                checkedDrawings={drawingIDs}
                drawings={drawings}
                isFetching={isFetching}
                showModal={showModal}
                userID={id}
            />
        );
    }

    componentDidMount = () => {
        const { id, fetchUserDrawings } = this.props;

        fetchUserDrawings(id);
    };

    componentDidUpdate = prevProps => {
        const { removeSuccess, hideModal, fetchUserDrawings, id } = this.props;
        if (removeSuccess && !prevProps.removeSuccess) {
            fetchUserDrawings(id);
            hideModal();
        }
    };

    handleDrawingIDs = e => {
        const { drawingIDs } = this.state;
        this.setState({
            drawingIDs: drawingIDs.includes(e.target.value)
                ? drawingIDs.filter(val => e.target.value !== val)
                : [...drawingIDs, e.target.value]
        });
    };

    _selectAll = () => {
        const { drawings } = this.props;
        //get all drawing
        let allDrawingIDs = [];
        drawings.forEach(drawing => {
            allDrawingIDs.push(String(drawing.id));
        });
        this.setState({
            drawingIDs: [...allDrawingIDs]
        });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            userDrawingsReducer: { userDrawings, error, isFetching, removeSuccess }
        }
    },
    {
        match: {
            params: { id }
        }
    }
) => ({
    drawings: Object.values(userDrawings) || [],
    error,
    isFetching,
    id,
    removeSuccess
});

const mapDispatchToProps = dispatch => ({
    fetchUserDrawings: id => dispatch(fetchUserDrawings(id)),
    showModal: (type, modalProps) => dispatch(showModal(type, modalProps)),
    hideModal: () => dispatch(hideModal())
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(UserDrawingsTableContainer)
);
