import React from 'react';
import ReactPieChart from 'react-minimal-pie-chart';

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
            <h4 className="heading heading-3 size-lg-6">
                Latest Pin Histories
            </h4>

            {isStatsEmpty ? (
                <p className="no-data size-lg-12">
                    There are currently no pins on this {hierarchyType}
                </p>
            ) : (
                <div className="size-lg-12">
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
                    <ReactPieChart
                        className="size-lg-5"
                        data={pieStats}
                        segmentsStyle={{ transition: 'stroke .3s' }}
                        animate
                    />
                </div>
            )}
        </div>
    );
};

export default PieChart;
