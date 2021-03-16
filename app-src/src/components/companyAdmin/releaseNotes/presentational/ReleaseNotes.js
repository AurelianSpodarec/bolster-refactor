import React from 'react';
import moment from 'moment';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import { RAW_S3_STORAGE_URL } from 'config';

const ReleaseNotes = ({ releaseNotes }) => {
    return (
        <>
            <PageHeading title="Release Notes" withBackButton />

            {releaseNotes
                .sort((a, b) => moment(b.publishDate) - moment(a.publishDate))
                .map(
                    ({
                        id,
                        fullDescription,
                        title,
                        image,
                        youTubeLink,
                        vimeoLink,
                        publishDate,
                    }) => {
                        const isMedia = image || youTubeLink || vimeoLink;

                        return (
                            <BlockContainer key={id} containerClass="release-notes">
                                <div
                                    className={`text-section size-lg-${
                                        isMedia ? '6' : '12'
                                    } size-md-12`}
                                >
                                    <BlockHeading
                                        title={title}
                                        subTitle={moment(publishDate).format('dddd, MMMM Do YYYY')}
                                        classes="heading heading-2 underline-full half-margin"
                                        subTitleClasses="small"
                                    />
                                    <div
                                        className="generic-text"
                                        dangerouslySetInnerHTML={{ __html: fullDescription }}
                                    />
                                </div>
                                {image && (
                                    <div className="size-lg-6 size-md-12">
                                        <img
                                            className="size-lg-12"
                                            src={`${RAW_S3_STORAGE_URL}/${image}`}
                                            alt=""
                                        />
                                    </div>
                                )}
                                {youTubeLink ? (
                                    <div className=" size-lg-6 size-md-12">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${youTubeLink}`}
                                            height="360"
                                            frameBorder="0"
                                            allow="autoplay; fullscreen"
                                            allowFullScreen
                                            className="size-lg-12"
                                            title="yt-iframe"
                                        ></iframe>
                                    </div>
                                ) : (
                                    vimeoLink && (
                                        <div className=" size-lg-6 size-md-12">
                                            <iframe
                                                src={`https://player.vimeo.com/video/${vimeoLink}`}
                                                height="360"
                                                frameBorder="0"
                                                allow="autoplay; fullscreen"
                                                allowFullScreen
                                                className="size-lg-12"
                                                title="vimeo-iframe"
                                            ></iframe>
                                        </div>
                                    )
                                )}
                            </BlockContainer>
                        );
                    },
                )}
        </>
    );
};

export default ReleaseNotes;
