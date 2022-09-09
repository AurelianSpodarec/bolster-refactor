import React from 'react';

import InspectIcon from 'assets/images/frontend-new/how-it-works/inspect2.png';
import LocateIcon from 'assets/images/frontend-new/how-it-works/locate2.png';
import DocumentIcon from 'assets/images/frontend-new/how-it-works/document2.png';
import ManageIcon from 'assets/images/frontend-new/how-it-works/manage2.png';

const HowItWorksHeadings = () => (
    <div className="section how-it-works-headings">
        <div className="headings-area">
            <div className="item">
                <div className="icon">
                    <img alt="Inspect" src={InspectIcon} />
                </div>
            </div>
            <div className="item">
                <div className="icon">
                    <img alt="Locate" src={LocateIcon} />
                </div>
            </div>
            <div className="item">
                <div className="icon">
                    <img alt="Document" src={DocumentIcon} />
                </div>
            </div>
            <div className="item">
                <div className="icon">
                    <img alt="Manage" src={ManageIcon} />
                </div>
            </div>
        </div>
    </div>
);

export default HowItWorksHeadings;
