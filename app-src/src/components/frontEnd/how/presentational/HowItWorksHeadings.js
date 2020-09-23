import React from 'react';

import InspectIcon from '_content/images/frontend-new/how-it-works/inspect.png';
import LocateIcon from '_content/images/frontend-new/how-it-works/locate.png';
import DocumentIcon from '_content/images/frontend-new/how-it-works/document.png';
import ManageIcon from '_content/images/frontend-new/how-it-works/manage.png';

const HowItWorksHeadings = () => (
    <div className="section">
        <div className="headings-area">
            <div className="item">
                <div className="icon">
                    <img alt="Inspect" src={InspectIcon} />
                </div>
                <div className="text">
                    <h3>Inspect</h3>
                    <div className="divider" />
                    <p>Neque porro qui</p>
                </div>
            </div>
            <div className="item">
                <div className="icon">
                    <img alt="Locate" src={LocateIcon} />
                </div>
                <div className="text">
                    <h3>Locate</h3>
                    <div className="divider" />
                    <p>Neque porro qui</p>
                </div>
            </div>
            <div className="item">
                <div className="icon">
                    <img alt="Document" src={DocumentIcon} />
                </div>
                <div className="text">
                    <h3>Document</h3>
                    <div className="divider" />
                    <p>Neque porro qui</p>
                </div>
            </div>
            <div className="item">
                <div className="icon">
                    <img alt="Manage" src={ManageIcon} />
                </div>
                <div className="text">
                    <h3>Manage</h3>
                    <div className="divider" />
                    <p>Neque porro qui</p>
                </div>
            </div>
        </div>
    </div>
);

export default HowItWorksHeadings;
