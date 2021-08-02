import React, { useEffect } from 'react';
import Block from 'components/shared/generic/block/presentational/Block';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ENTER_DEMO_ACCESS_CODES } from 'constants/shared/modalTypes';
import { useDispatch, useSelector } from 'react-redux';
import video from '_content/videos/frontend/home1.mp4';

const DemoFullSite = () => {
    const dispatch = useDispatch();
    const showVideo = useSelector(({ frontEnd }) => frontEnd.demoFullSiteReducer.postSuccess);

    useEffect(() => {
        dispatch(showModal(ENTER_DEMO_ACCESS_CODES));
    }, []);

    return (
        <Block containerClass="demo-full-site-container" contentClass="">
            <h1 className="title">Demo - Full Site</h1>
            {showVideo && (
                <video controls autoPlay playsInline src={video} className="demo-video" />
            )}
        </Block>
    );
};

export default DemoFullSite;
