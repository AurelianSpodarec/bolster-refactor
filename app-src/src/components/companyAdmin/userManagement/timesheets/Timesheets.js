import React from 'react';

import TimesheetsComingSoon from '_content/images/timesheets-coming-soon.jpg';

import Block from 'components/shared/generic/block/presentational/Block';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const Timesheets = () => (
    <>
        <PageHeading title="Timesheets" withBackButton />

        <Block>
            <BlockHeading title="Timesheets" />

            <div className="wysiwyg">
                <p>
                    Our new timesheets feature is edging closer to release. Timesheets will allow
                    all users to log their time worked and breaks taken daily. It will also allow
                    you to track pin histories created throughout each shift. Timesheets will make
                    payroll or invoicing billable time much more accurate, quicker, and easier.
                </p>

                <p>
                    If you would like more information on timesheets, feel free to call our office
                    on <a href="tel:01618737679">0161 873 7679</a> or email{' '}
                    <a href="mailto:info@bolstersystems.com">info@bolstersystems.com</a>.
                </p>

                <p>
                    <img
                        className="image"
                        style={{ width: '100%', marginTop: '10px' }}
                        alt="Timesheets coming soon"
                        src={TimesheetsComingSoon}
                    />
                </p>
            </div>
        </Block>
    </>
);

export default Timesheets;
