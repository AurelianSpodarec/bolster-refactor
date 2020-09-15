import React from 'react';

import InspectIcon from '_content/images/frontend-new/how-it-works/inspect.png';
import LocateIcon from '_content/images/frontend-new/how-it-works/locate.png';
import DocumentIcon from '_content/images/frontend-new/how-it-works/document.png';
import ManageIcon from '_content/images/frontend-new/how-it-works/manage.png';

const HowItWorksHeadings = () => (
    <div className="section">
        <div className="headings-area">
            <div className="item">
                <img alt="Inspect" src={InspectIcon} />
                <div className="text">
                    <h3>Inspect</h3>
                    <div className="divider" />
                    <p>Neque porro qui</p>
                </div>
            </div>
            <div className="item">
                <img alt="Locate" src={LocateIcon} />
                <div className="text">
                    <h3>Inspect</h3>
                    <div className="divider" />
                    <p>Neque porro qui</p>
                </div>
            </div>
            <div className="item">
                <img alt="Document" src={DocumentIcon} />
                <div className="text">
                    <h3>Inspect</h3>
                    <div className="divider" />
                    <p>Neque porro qui</p>
                </div>
            </div>
            <div className="item">
                <img alt="Manage" src={ManageIcon} />
                <div className="text">
                    <h3>Inspect</h3>
                    <div className="divider" />
                    <p>Neque porro qui</p>
                </div>
            </div>
        </div>
    </div>
);

export default HowItWorksHeadings;
