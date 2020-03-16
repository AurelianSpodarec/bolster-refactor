import React from 'react';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ZoneSelect from './ZoneSelect';

const ZoneSelector = ({
    excluded,
    included,
    handleExclude,
    handleInclude,
    error
}) => {
    return (
        <>
            <BlockHeading title="Zones" />

            <p className="generic-text intro-text size-lg-12">
                Using either of the boxes below, select which zones you would
                like to be included in your report.
            </p>
            <div className="form-field size-lg-12">
                <div className="pin-selector size-lg-12">
                    <ZoneSelect
                        title="Excluded"
                        options={excluded}
                        onSubmit={handleInclude}
                    />

                    <ZoneSelect
                        title="Included"
                        options={included}
                        onSubmit={handleExclude}
                    />

                    {error && (
                        <div className="size-lg-12">
                            <p className="error red-text text-accent-4">
                                {error}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ZoneSelector;
