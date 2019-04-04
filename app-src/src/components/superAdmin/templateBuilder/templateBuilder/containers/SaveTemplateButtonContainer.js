import React, { Component } from 'react';
import { connect } from 'react-redux';
import SaveTemplateButton from '../presentational/SaveTemplateButton';

class SaveTemplateButtonContainer extends Component {
    render() {
        return (
            <SaveTemplateButton
                saveRequired={true}
                promptMessage={() => 'Are you sure?'}
            />
        );
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleBeforeUnload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    handleBeforeUnload = e => {
        e.returnValue = '';
    };
}

const mapStateToProps = ({
    superAdmin: {
        templatesReducer: { saveRequired }
    }
}) => ({
    saveRequired
});

export default connect(mapStateToProps)(SaveTemplateButtonContainer);
