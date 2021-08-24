import React from 'react';
import ReactPieChart from 'react-minimal-pie-chart';
import { isIE } from 'react-device-detect';

import greenPin from '_content/images/map-markers/green-pin2x.png';
import redPin from '_content/images/map-markers/red-pin2x.png';
import bluePin from '_content/images/map-markers/blue-pin2x.png';
import yellowPin from '_content/images/map-markers/yellow-pin2x.png';
import purplePin from '_content/images/map-markers/purple-pin2x.png';
// import { FILE_STORAGE_URL } from 'config';
//todo: reference images with FILE_STORAGE_URL

import statsPieChartColours from 'constants/companyAdmin/statsPieColours';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const PieChart = ({
    stats,
    hierarchyType,
    sizeClasses = 'size-lg-6',
    wTitle = true,
    onMobile,
    isFiltered,
    serviceID,
    serviceOptions,
    companyID,
    companyOptions,
    handleChange,
    filteredStatsBool,
    // style
}) => {
    console.log('stats', stats);
    console.log('filteredStatsBool', filteredStatsBool);

    const statsToUse = filteredStatsBool
        ? stats.statuses
        : serviceID
        ? stats.statusesByService[serviceID] || {}
        : companyID
        ? stats.statusesByCompany[companyID] || {}
        : stats.statuses;

    console.log('statsToUse', statsToUse);
    const isStatsEmpty = !statsToUse || Object.values(statsToUse).every(stat => stat === 0);

    const total = Object.values(statsToUse).reduce((acc, val) => {
        return acc + val;
    }, 0);

    const pieStats = !isStatsEmpty
        ? Object.entries(statsToUse).map(([title, value]) => {
              return {
                  title,
                  value,
                  color: statsPieChartColours[title],
                  style: {
                      backgroundColor: '#000',
                  },
              };
          })
        : [{ title: 'Empty', value: 100, color: '#cecece' }];

    return (
        <div className={`history ${sizeClasses}`}>
            {wTitle && (
                <h4 className="heading heading-3 size-lg-12">
                    Latest Pin Histories
                    {isFiltered && <span className="filtered-flag"> - filtered</span>}
                </h4>
            )}
            {!!serviceOptions && (
                <Field name="Filter histories by service">
                    <DropdownContainer
                        handleChange={handleChange}
                        name="serviceID"
                        value={serviceOptions.find(opt => opt.value === +serviceID)}
                        options={serviceOptions}
                        placeholder="All Services"
                    />
                </Field>
            )}

            {!!serviceOptions && (
                <Field name="Filter histories by companies">
                    <DropdownContainer
                        handleChange={handleChange}
                        name="companyID"
                        value={companyOptions.find(opt => opt.value === companyID)}
                        options={companyOptions}
                        placeholder="All Companies"
                    />
                </Field>
            )}

            {isStatsEmpty ? (
                <p className="no-data size-lg-12">
                    There are currently no pins on this {hierarchyType}.
                </p>
            ) : (
                <div className="size-lg-12">
                    {onMobile && (
                        <div className="size-lg-12">
                            <div className="size-md-2" />

                            <ReactPieChart
                                className="size-md-8"
                                data={pieStats}
                                segmentsStyle={{
                                    transition: 'stroke .3s',
                                }}
                                animate
                            />
                            <div className="size-md-2" />
                        </div>
                    )}
                    <div className={`pin-key ${isIE ? 'size-lg-12 ' : 'size-lg-6 '}size-md-12`}>
                        <div className="pin">
                            <img src={redPin} alt="pin" />
                            <p>
                                Action Required: <span>{`${statsToUse['ActionRequired']}`}</span>
                            </p>
                        </div>
                        <div className="pin">
                            <img src={greenPin} alt="pin" />
                            <p>
                                Installed: <span>{`${statsToUse['Installed']}`}</span>
                            </p>
                        </div>
                        <div className="pin">
                            <img src={bluePin} alt="pin" />
                            <p>
                                Inspected: <span>{`${statsToUse['Inspected']}`}</span>
                            </p>
                        </div>
                        <div className="pin">
                            <img src={yellowPin} alt="pin" />
                            <p>
                                No Action: <span>{`${statsToUse['NoAction']}`}</span>
                            </p>
                        </div>
                        <div className="pin">
                            <img src={purplePin} alt="pin" />
                            <p>
                                Other: <span>{`${statsToUse['Other']}`}</span>
                            </p>
                        </div>
                        <div className="pin">
                            <p className="no-pin">
                                Total: <span>{`${total}`}</span>
                            </p>
                        </div>
                    </div>

                    {!onMobile && !isIE && (
                        <ReactPieChart
                            className="size-lg-5"
                            data={pieStats}
                            segmentsStyle={{
                                transition: 'stroke .3s',
                            }}
                            animate
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default PieChart;
