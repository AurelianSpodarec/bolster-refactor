import React, { Component } from 'react';
import { connect } from 'react-redux';

class DropdownListContainer extends Component {
    render() {
        return <div>hello</div>;
    }
}

// const mapDispatchToProps = dispatch => ({
//     fetchAllDropdownOptions: (type) => {
//         dispatch(fetchAllDropdownOptions(type))
//     }
// })

export default connect()(DropdownListContainer);
