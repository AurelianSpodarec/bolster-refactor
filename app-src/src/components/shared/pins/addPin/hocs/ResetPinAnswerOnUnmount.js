import React, { useEffect } from 'react';

const resetPinAnswerOnUnmount = WrappedComponent => {
    class ResetPinAnswerOnUnmount extends React.Component {
        render = () => <WrappedComponent {...this.props} />;

        componentWillUnmount = () => {
            const { resetPinAnswer, question } = this.props;
            resetPinAnswer(question.id);
        };
    }

    // const ResetPinAnswerOnUnmount = props => {
    //     useEffect(() => {
    //         return function cleanup() {
    //             props.resetPinAnswer(props.question.id);
    //         };
    //     }, [1]);
    //     return <WrappedComponent {...props} />;
    // };

    return ResetPinAnswerOnUnmount;
};

export default resetPinAnswerOnUnmount;
