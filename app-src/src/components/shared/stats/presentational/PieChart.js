import React from 'react';
import ReactPieChart from 'react-minimal-pie-chart';
import moment from 'moment';

import greenPin from '_content/images/pins/green-pin.png';
import redPin from '_content/images/pins/red-pin.png';
import bluePin from '_content/images/pins/blue-pin.png';
import yellowPin from '_content/images/pins/yellow-pin.png';
import purplePin from '_content/images/pins/purple-pin.png';

import statsPieChartColours from 'constants/companyAdmin/statsPieColours';

const PieChart = ({ stats, hierarchyType }) => {
    const isStatsEmpty = Object.values(stats.statuses).every(
        stat => stat === 0
    );

    const pieStats = !isStatsEmpty
        ? Object.entries(stats.statuses).map(([title, value]) => {
              return {
                  title,
                  value,
                  color: statsPieChartColours[title]
              };
          })
        : [{ title: 'Empty', value: 100, color: '#cecece' }];
    return (
        <div className="history size-lg-6">
            <ReactPieChart
                className="size-lg-5"
                data={pieStats}
                segmentsStyle={{ transition: 'stroke .3s' }}
                animate
            />
            <div className="pin-key size-lg-6">
                <div className="pin">
                    <img src={redPin} alt="pin" />
                    <p>Action Required</p>
                </div>
                <div className="pin">
                    <img src={bluePin} alt="pin" />
                    <p>Inspected</p>
                </div>
                <div className="pin">
                    <img src={greenPin} alt="pin" />
                    <p>Installed</p>
                </div>
                <div className="pin">
                    <img src={yellowPin} alt="pin" />
                    <p>No Action</p>
                </div>
                <div className="pin">
                    <img src={purplePin} alt="pin" />
                    <p>Other</p>
                </div>
            </div>
            <label className="size-lg-12">
                {isStatsEmpty
                    ? `There are currently no pins for this ${hierarchyType}.`
                    : `Last Update: ${moment(stats.lastUpdatedOn).format(
                          'DD/MM/YYYY hh:mm a'
                      )}`}
            </label>
        </div>
    );
};

export default PieChart;
