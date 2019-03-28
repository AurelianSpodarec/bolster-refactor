import React from 'react';
import PostingErrorModal from '../presentational/PostingErrorModal';

const PostingErrorModalContainer = ({
    message = 'An error occurred while processing your request, please try again later',
    title = 'Error'
}) => <PostingErrorModal message={message} title={title} />;

export default PostingErrorModalContainer;
