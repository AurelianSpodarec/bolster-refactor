import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { DATE_TIME_IDS, DATE_TIME_DEFAULTS } from 'constants/companyAdmin/enums';
import { FILE_STORAGE_URL } from 'config';
import { PIN_IMAGE } from 'constants/shared/modalTypes';

import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const DocumentVersionsList = ({ versions, dispatch }) => (
    <div>
        {versions
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((version, i) => (
                <div key={version.id} className="flex-row size-lg-12">
                    <FieldOutput
                        title={'Date Created'}
                        description={moment(version.createdAt).format(
                            DATE_TIME_DEFAULTS[DATE_TIME_IDS.DATETIME],
                        )}
                        sizeClass={'flex-row-item size-lg-4'}
                    />
                    <FieldOutput title={'Document Preview'} sizeClass={'flex-row-item size-lg-6'}>
                        <img
                            style={{ cursor: 'zoom-in' }}
                            alt=""
                            src={`${FILE_STORAGE_URL}/${version.fileS3Key}` + '?width=100'}
                            onClick={() =>
                                dispatch(
                                    showModal(PIN_IMAGE, {
                                        image:
                                            `${FILE_STORAGE_URL}/${version.fileS3Key}` +
                                            '?width=1500',
                                    }),
                                )
                            }
                        />
                    </FieldOutput>

                    <div className={'flex-row-item size-lg-2'}>
                        {!version.hasBeenUsed && (
                            <button className={'button red'}>
                                <i className={'far fa-trash'} />
                                {'Delete Version'}
                            </button>
                        )}
                    </div>
                </div>
            ))}
    </div>
);

export default connect()(DocumentVersionsList);
