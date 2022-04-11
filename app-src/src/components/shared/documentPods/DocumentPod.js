import React from 'react';
import moment from 'moment';

import MockImage from '_content/images/previews/light-theme-preview.jpg';

import { DATE_TIME } from 'constants/shared/dateFormats';

import ActionMenu from '../actionMenu/ActionMenu';
import FlexWrapper from '../generic/flexWrapper/FlexWrapper';

const DocumentPod = ({ name, lastUpdated, actionMenuItems }) => (
    <a className="document-pod" href="#">
        <div className="image-wrapper">
            <img alt="Document preview" src={MockImage} />
        </div>

        <FlexWrapper direction="row" justify="between" extraClasses="info-wrapper">
            <div className="text">
                <p className="title">{name}</p>
                <p className="last-updated">Updated {moment(lastUpdated).format(DATE_TIME)}</p>
            </div>

            {!!actionMenuItems && <ActionMenu>{actionMenuItems}</ActionMenu>}
        </FlexWrapper>
    </a>
);

export default DocumentPod;
