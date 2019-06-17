import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectPinScaleModal from '../presentational/SelectPinScaleModal';

class SelectPinScaleModalContainer extends Component {
    render() {
        const { drawing } = this.props;
        return <SelectPinScaleModal drawing={drawing} />;
    }
}
export default connect()(SelectPinScaleModalContainer);
