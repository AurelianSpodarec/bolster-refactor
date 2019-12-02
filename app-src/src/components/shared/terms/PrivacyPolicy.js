import React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import WysiwygBlock from 'components/shared/generic/wysiwyg/presentational/WysiwygBlock';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const PrivacyPolicy = () => (
    <BlockContainer>
        <BlockHeading title="Privacy Policy"></BlockHeading>
        <WysiwygBlock>
            <h4>Introduction</h4>
            <p>Welcome to the Bolster Systems’ privacy notice. </p>
            <p>
                Bolster Systems Limited respects your privacy and is committed to protecting your
                personal data. This privacy notice will tell you about your privacy rights and how
                the law protects you and will inform you as to how we look after your personal data
                when you visit or use:
            </p>
            <ul>
                <li>
                    <p>
                        the Bolster Systems mobile application software (“<strong>App</strong>”)
                        hosted on{' '}
                        <a href="https://www.bolstersystems.com">www.bolstersystems.com</a> (“
                        <strong>Website</strong>”) once you have downloaded or streamed a copy of
                        the App onto your mobile telephone or handheld device (“
                        <strong>Device</strong>”) and any services accessible through the App; and
                    </p>
                </li>
                <li>
                    <p>
                        our Website and any of the services accessible through the Website including
                        the web portal access (“<strong>Services</strong>”) that are available on
                        the Website or other sites of ours (“
                        <strong>Services Sites</strong>”).
                    </p>
                </li>
            </ul>
            <p>
                Please use the Glossary to understand the meaning of some of the terms used in this
                privacy notice.
            </p>
            <ol>
                <li>
                    <NavHashLink to="/company/terms#important">
                        IMPORTANT INFORMATION AND WHO WE ARE
                    </NavHashLink>
                </li>
                <li>
                    <NavHashLink to="/company/terms#data">
                        THE DATA WE COLLECT ABOUT YOU
                    </NavHashLink>
                </li>
                <li>
                    <NavHashLink to="/company/terms#personalCollected">
                        HOW IS YOUR PERSONAL DATA COLLECTED
                    </NavHashLink>
                </li>
                <li>
                    <NavHashLink to="/company/terms#personalUse">
                        HOW WE USE YOUR PERSONAL DATA
                    </NavHashLink>
                </li>
                <li>
                    <NavHashLink to="/company/terms#disclosure">
                        DISCLOSURES OF YOUR PERSONAL DATA
                    </NavHashLink>
                </li>
                <li>
                    <NavHashLink to="/company/terms#transfers">INTERNATIONAL TRANSFERS</NavHashLink>
                </li>
                <li>
                    <NavHashLink to="/company/terms#security">DATA SECURITY</NavHashLink>
                </li>
                <li>
                    <NavHashLink to="/company/terms#retention">DATA RETENTION</NavHashLink>
                </li>
                <li>
                    <NavHashLink to="/company/terms#rights">YOUR LEGAL RIGHTS</NavHashLink>
                </li>
                <li>
                    <NavHashLink to="/company/terms#glossary">GLOSSARY</NavHashLink>
                </li>
            </ol>
            <ol>
                <li id="important">
                    <h4>Important information and who we are</h4>
                    <h4>Purpose of this privacy notice</h4>
                    <p>
                        This privacy notice aims to give you information on how Bolster Systems
                        Limited collects and processes your personal data through your use of the
                        Website, App or Service Sites including any data you may provide through the
                        Website, App or Service Sites when you sign up to our newsletter, request a
                        demo or purchase a service from us.
                    </p>
                    <p>
                        The Website, App or Service Sites are not intended for children and we do
                        not knowingly collect data relating to children.
                    </p>
                    <p>
                        It is important that you read this privacy notice together with any other
                        privacy notice or fair processing notice we may provide on specific
                        occasions when we are collecting or processing personal data about you so
                        that you are fully aware of how and why we are using your data. This privacy
                        notice supplements the other notices and is not intended to override them.
                    </p>
                    <h4>Controller</h4>
                    <p>
                        Bolster Systems Limited is the controller and responsible for your personal
                        data ("we", "us" or "our").
                    </p>
                    <p>
                        We have appointed a data privacy manager who is responsible for overseeing
                        questions in relation to this privacy notice. If you have any questions
                        about this privacy notice, including any requests to exercise your legal
                        rights, please contact the data privacy manager using the details set out
                        below.
                    </p>
                    <h4>Contact details</h4>
                    <p>Our full details are:</p>
                    <p>Full name of legal entity: Bolster Systems Limited</p>
                    <p>Name or title of data privacy manager: Wesley Donlon</p>
                    <p>
                        Email address:{' '}
                        <a href="mailto:info@bolstersystems.com">info@bolstersystems.com</a>
                    </p>
                    <p>
                        Postal address: 7 The Schoolhouse Second Avenue, Trafford Park, Manchester,
                        Greater Manchester M17 1DZ
                    </p>
                    <p>
                        You have the right to make a complaint at any time to the Information
                        Commissioner's Office (ICO), the UK supervisory authority for data
                        protection issues{' '}
                        <a rel="noopener noreferrer" target="_blank" href="https://www.ico.org.uk">
                            (www.ico.org.uk)
                        </a>
                        . We would, however, appreciate the chance to deal with your concerns before
                        you approach the ICO so please contact us in the first instance.
                    </p>
                    <h4>Changes to the privacy notice and your duty to inform us of changes</h4>
                    <p>
                        This version was last updated on [11/04/2019] and historic versions can be
                        obtained by contacting us.
                    </p>
                    <p>
                        It is important that the personal data we hold about you is accurate and
                        current. Please keep us informed if your personal data changes during your
                        relationship with us.
                    </p>
                    <h4>Third-party links</h4>
                    <p>
                        This website may include links to third-party websites, plug-ins and
                        applications. Clicking on those links or enabling those connections may
                        allow third parties to collect or share data about you. We do not control
                        these third-party websites and are not responsible for their privacy
                        statements. When you leave our website, we encourage you to read the privacy
                        notice of every website you visit.
                    </p>
                </li>
                <li id="data">
                    <h4>The data we collect about you</h4>
                    <p>
                        Personal data, or personal information, means any information about an
                        individual from which that person can be identified. It does not include
                        data where the identity has been removed (anonymous data).
                    </p>
                    <p>
                        We may collect, use, store and transfer different kinds of personal data
                        about you which we have grouped together follows:
                    </p>
                    <ul>
                        <li>
                            <p>
                                <strong>Identity Data</strong> includes first name, last name,
                                username or similar identifier.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Contact Data</strong> includes billing address, delivery
                                address, email address and telephone numbers.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Financial Data</strong> includes bank account and payment
                                card details.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Transaction Data</strong> includes details about payments to
                                and from you and other details of products and services you have
                                purchased from us.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Technical Data</strong> includes internet protocol (IP)
                                address, your login data, browser type and version, time zone
                                setting and location, browser plug-in types and versions, operating
                                system and platform and other technology on the devices you use to
                                access this website.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Profile Data</strong> includes your username and password,
                                purchases or orders made by you, your interests, preferences,
                                feedback and survey responses.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Usage Data</strong> includes information about how you use
                                our Website, App, Service Sites, products and services.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Marketing and Communications Data</strong> includes your
                                preferences in receiving marketing from us and our third parties and
                                your communication preferences.
                            </p>
                        </li>
                    </ul>
                    <p>
                        We also collect, use and share <strong>Aggregated Data</strong> such as
                        statistical or demographic data for any purpose. Aggregated Data may be
                        derived from your personal data but is not considered personal data in law
                        as this data does <strong>not</strong> directly or indirectly reveal your
                        identity. For example, we may aggregate your Usage Data to calculate the
                        percentage of users accessing a specific website feature. However, if we
                        combine or connect Aggregated Data with your personal data so that it can
                        directly or indirectly identify you, we treat the combined data as personal
                        data which will be used in accordance with this privacy notice.
                    </p>
                    <p>
                        We do not collect any <strong>Special Categories of Personal Data</strong>{' '}
                        about you (this includes details about your race or ethnicity, religious or
                        philosophical beliefs, sex life, sexual orientation, political opinions,
                        trade union membership, information about your health and genetic and
                        biometric data). Nor do we collect any information about criminal
                        convictions and offences.
                    </p>
                    <h4>If you fail to provide personal data</h4>
                    <p>
                        Where we need to collect personal data by law, or under the terms of a
                        contract we have with you and you fail to provide that data when requested,
                        we may not be able to perform the contract we have or are trying to enter
                        into with you (for example, to provide you with goods or services). In this
                        case, we may have to cancel a product or service you have with us, but we
                        will notify you if this is the case at the time.
                    </p>
                </li>
                <li id="personalCollected">
                    <h4>How is your personal data collected?</h4>
                    <p>
                        We use different methods to collect data from and about you including
                        through:
                    </p>
                    <ul>
                        <li>
                            <p>
                                <strong>Direct interactions</strong>. You may give us your Identity,
                                Contact [and Financial Data] by filling in forms or by corresponding
                                with us by post, phone, email or otherwise. This includes personal
                                data you provide when you:
                            </p>
                            <ul>
                                <li>
                                    <p> apply for our services;</p>
                                </li>
                                <li>
                                    <p>request a demo; </p>
                                </li>
                                <li>
                                    <p>create an account on our Website, App or Service Sites;</p>
                                </li>
                                <li>
                                    <p>subscribe to our service or publications;</p>
                                </li>
                                <li>
                                    <p>request marketing to be sent to you;</p>
                                </li>
                                <li>
                                    <p>give us some feedback. </p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p>
                                <strong>Automated technologies or interactions.</strong> As you
                                interact with our website, we may automatically collect Technical
                                Data about your equipment, browsing actions and patterns. We collect
                                this personal data by using cookies, server logs and other similar
                                technologies. We may also receive Technical Data about you if you
                                visit other websites employing our cookies.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Third parties or publicly available sources</strong>. We may
                                receive personal data about you from various third parties and
                                public sources as set out below:
                            </p>
                            <ul>
                                <li>
                                    <p>Technical Data from the following parties:</p>
                                    <ol>
                                        <li>
                                            analytics providers such as Google based outside the EU;
                                        </li>
                                        <li>
                                            advertising networksbased inside <strong>OR</strong>{' '}
                                            outside the EU; and
                                        </li>
                                        <li>
                                            search information providers based inside{' '}
                                            <strong>OR</strong> outside the EU.
                                        </li>
                                    </ol>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p>
                                Contact, Financial and Transaction Data from providers of technical,
                                payment and delivery services based inside <strong>OR</strong>{' '}
                                outside the EU.
                            </p>
                        </li>
                        <li>
                            <p>
                                Identity and Contact Data from publicly availably sources such as
                                Companies House and the Electoral Register based inside the EU.
                            </p>
                        </li>
                    </ul>
                </li>
                <li id="personalUse">
                    <h4>How we use your personal data</h4>
                    <p>
                        We will only use your personal data when the law allows us to. Most
                        commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ol>
                        <li>
                            Where we need to perform the contract we are about to enter into or have
                            entered into with you.
                        </li>
                        <li>
                            Where it is necessary for our legitimate interests (or those of a third
                            party) and your interests and fundamental rights do not override those
                            interests.
                        </li>
                        <li>Where we need to comply with a legal or regulatory obligation.</li>
                    </ol>
                    <p>
                        Generally we do not rely on consent as a legal basis for processing your
                        personal data other than in relation to sending third party direct marketing
                        communications to you via email or text message. You have the right to
                        withdraw consent to marketing at any time by contacting us.
                    </p>
                    <h4>Purposes for which we will use your personal data</h4>
                    <p>
                        We have set out below, in a table format, a description of all the ways we
                        plan to use your personal data, and which of the legal bases we rely on to
                        do so. We have also identified what our legitimate interests are where
                        appropriate.
                    </p>
                    <p>
                        Note that we may process your personal data for more than one lawful ground
                        depending on the specific purpose for which we are using your data. Please
                        contact us if you need details about the specific legal ground we are
                        relying on to process your personal data where more than one ground has been
                        set out in the table below.
                    </p>
                    <table className="generic-table">
                        <thead>
                            <tr>
                                <th>Purpose/Activity</th>
                                <th>Type of data</th>
                                <th>
                                    Lawful basis for processing including basis of legitimate
                                    interest
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>To register you as a new customer/ user</td>
                                <td>
                                    (a) Identity <br />
                                    (b) Contact
                                </td>
                                <td>Performance of a contract with you</td>
                            </tr>
                            <tr>
                                <td>
                                    To process and manage your order including: <br />
                                    (a) Manage payments, fees and charges <br />
                                    (b) Collect and recover money owed to us
                                </td>
                                <td>
                                    (a) Identity <br />
                                    (b) Contact <br />
                                    (c) Financial <br />
                                    (d) Transaction <br />
                                    (e) Marketing and Communications
                                </td>
                                <td>
                                    (a) Performance of a contract with you <br />
                                    (b) Necessary for our legitimate interests (to recover debts due
                                    to us)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    To manage our relationship with you which will include: <br />
                                    (a) Notifying you about changes to our terms or privacy policy{' '}
                                    <br />
                                    (b) Asking you to leave a review or take a survey
                                </td>
                                <td>
                                    (a) Identity <br />
                                    (b) Contact <br />
                                    (c) Profile <br />
                                    (d) Marketing and Communications
                                </td>
                                <td>
                                    (a) Performance of a contract with you <br />
                                    (b) Necessary to comply with a legal obligation <br />
                                    (c) Necessary for our legitimate interests (to keep our records
                                    updated and to study how customers use our products/services)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    To enable you to partake in a prize draw, competition or
                                    complete a survey
                                </td>
                                <td>
                                    (a) Identity <br />
                                    (b) Contact <br />
                                    (c) Profile <br />
                                    (d) Usage <br />
                                    (e) Marketing and Communications
                                </td>
                                <td>
                                    (a) Performance of a contract with you <br />
                                    (b) Necessary for our legitimate interests (to study how
                                    customers use our products/services, to develop them and grow
                                    our business)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    To administer and protect our business and this website
                                    (including troubleshooting, data analysis, testing, system
                                    maintenance, support, reporting and hosting of data)
                                </td>
                                <td>
                                    (a) Identity
                                    <br />
                                    (b) Contact
                                    <br />
                                    (c) Technical
                                </td>
                                <td>
                                    (a) Necessary for our legitimate interests (for running our
                                    business, provision of administration and IT services, network
                                    security, to prevent fraud and in the context of a business
                                    reorganisation or group restructuring exercise)
                                    <br />
                                    (b) Necessary to comply with a legal obligation
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    To deliver relevant website content and advertisements to you
                                    and measure or understand the effectiveness of the advertising
                                    we serve to you
                                </td>
                                <td>
                                    (a) Identity <br />
                                    (b) Contact <br />
                                    (c) Profile <br />
                                    (d) Usage <br />
                                    (e) Marketing and Communications
                                    <br />
                                    (f) Technical
                                </td>
                                <td>
                                    Necessary for our legitimate interests (to study how customers
                                    use our products/services, to develop them, to grow our business
                                    and to inform our marketing strategy)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    To use data analytics to improve our website, products/services,
                                    marketing, customer relationships and experiences
                                </td>
                                <td>
                                    (a) Technical <br />
                                    (b) Usage
                                </td>
                                <td>
                                    Necessary for our legitimate interests (to define types of
                                    customers for our products and services, to keep our website
                                    updated and relevant, to develop our business and to inform our
                                    marketing strategy)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    To make suggestions and recommendations to you about goods or
                                    services that may be of interest to you
                                </td>
                                <td>
                                    (a) Identity <br />
                                    (b) Contact <br />
                                    (c) Technical <br />
                                    (d) Usage <br />
                                    (e) Profile
                                </td>
                                <td>
                                    Necessary for our legitimate interests (to develop our
                                    products/services and grow our business)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h4>Marketing</h4>
                    <p>
                        We strive to provide you with choices regarding certain personal data uses,
                        particularly around marketing and advertising.
                    </p>
                    <h4>Promotional offers from us</h4>
                    <p>
                        We may use your Identity, Contact, Technical, Usage and Profile Data to form
                        a view on what we think you may want or need, or what may be of interest to
                        you. This is how we decide which products, services and offers may be
                        relevant for you (we call this marketing).
                    </p>
                    <p>
                        You will receive marketing communications from us if you have requested
                        information from us or purchased goods or services from us and, in each
                        case, you have not opted out of receiving that marketing.
                    </p>
                    <h4>Third-party marketing</h4>
                    <p>
                        We will get your express opt-in consent before we share your personal data
                        with third party for marketing purposes.
                    </p>
                    <h4>Opting out</h4>
                    <p>
                        You can ask us or third parties to stop sending you marketing messages at
                        any time by following the opt-out links on any marketing message sent to you
                        or by contacting us at any time.
                    </p>
                    <p>
                        Where you opt out of receiving these marketing messages, this will not apply
                        to personal data provided to us as a result of a product/service purchase,
                        warranty registration, product/service experience or other transactions.
                    </p>
                    <h4>Cookies</h4>
                    <p>
                        Our Website, Services Sites and App use "cookies", which are small text
                        files that are stored on your computer and can be retrieved by us to assist
                        us in customising your experience with our online services. These cookies
                        allow us to distinguish you from other users of our services and help us
                        improve our Services Sites and App. The information saved supports the
                        functionality of the Website, Services Sites and App. During some processes,
                        data is temporarily stored as you move from step to step. This improves your
                        experience, and data is only stored for as long as is necessary for you to
                        complete the process. All other cookies will expire{' '}
                        <strong>in 7 days</strong>.
                    </p>
                    <p>
                        You can set your browser to refuse all or some browser cookies, or to alert
                        you when websites set or access cookies. If you disable or refuse cookies,
                        please note that some parts of this website may become inaccessible or not
                        function properly.
                    </p>
                    <h4>Change of purpose</h4>
                    <p>
                        We will only use your personal data for the purposes for which we collected
                        it, unless we reasonably consider that we need to use it for another reason
                        and that reason is compatible with the original purpose. If you wish to get
                        an explanation as to how the processing for the new purpose is compatible
                        with the original purpose, please contact us.
                    </p>
                    <p>
                        If we need to use your personal data for an unrelated purpose, we will
                        notify you and we will explain the legal basis which allows us to do so.
                    </p>
                    <p>
                        Please note that we may process your personal data without your knowledge or
                        consent, in compliance with the above rules, where this is required or
                        permitted by law.
                    </p>
                </li>
                <li id="disclosure">
                    <h4>Disclosures of your personal data</h4>
                    <p>
                        We may have to share your personal data with the parties set out below for
                        the purposes set out in the table in paragraph 4 above.
                    </p>
                    <ul>
                        <li>
                            <p>
                                Internal development team <em>Glossary</em>.{' '}
                            </p>
                        </li>
                        <li>
                            <p>
                                External Development team <em>Glossary</em>.
                            </p>
                        </li>
                        <li>
                            <p>Specific third parties such as [Amazon Web Services].</p>
                        </li>
                        <li>
                            <p>
                                Third parties to whom we may choose to sell, transfer, or merge
                                parts of our business or our assets. Alternatively, we may seek to
                                acquire other businesses or merge with them. If a change happens to
                                our business, then the new owners may use your personal data in the
                                same way as set out in this privacy notice.{' '}
                            </p>
                        </li>
                    </ul>
                    <p>
                        <p>
                            We require all third parties to respect the security of your personal
                            data and to treat it in accordance with the law. We do not allow our
                            third-party service providers to use your personal data for their own
                            purposes and only permit them to process your personal data for
                            specified purposes and in accordance with our instructions.
                        </p>
                    </p>
                </li>
                <li id="transfers">
                    <h4>International transfers</h4>
                    <p>
                        We may transfer your personal data outside the European Economic Area (
                        <strong>EEA</strong>).
                    </p>
                </li>
                <li id="security">
                    <h4>Data security</h4>
                    <p>
                        We have put in place appropriate security measures to prevent your personal
                        data from being accidentally lost, used or accessed in an unauthorised way,
                        altered or disclosed. In addition, we limit access to your personal data to
                        those employees, agents, contractors and other third parties who have a
                        business need to know. They will only process your personal data on our
                        instructions and they are subject to a duty of confidentiality.
                    </p>
                    <p>
                        We have put in place procedures to deal with any suspected personal data
                        breach and will notify you and any applicable regulator of a breach where we
                        are legally required to do so.
                    </p>
                </li>
                <li id="retention">
                    <h4>Data retention</h4>
                    <h4>How long will you use my personal data for?</h4>
                    <p>
                        We will only retain your personal data for as long as necessary to fulfil
                        the purposes we collected it for, including for the purposes of satisfying
                        any legal, accounting, or reporting requirements.
                    </p>
                    <p>
                        To determine the appropriate retention period for personal data, we consider
                        the amount, nature, and sensitivity of the personal data, the potential risk
                        of harm from unauthorised use or disclosure of your personal data, the
                        purposes for which we process your personal data and whether we can achieve
                        those purposes through other means, and the applicable legal requirements.
                    </p>
                    <p>
                        Details of retention periods for different aspects of your personal data are
                        available in our retention policy which you can request from us by
                        contacting us.
                    </p>
                    <p>
                        In some circumstances you can ask us to delete your data: see Request
                        erasure below for further information.
                    </p>
                    <p>
                        In some circumstances we may anonymise your personal data (so that it can no
                        longer be associated with you) for research or statistical purposes in which
                        case we may use this information indefinitely without further notice to you.
                    </p>
                </li>
                <li id="rights">
                    <h4>Your legal rights</h4>
                    <p>
                        Under certain circumstances, you have rights under data protection laws in
                        relation to your personal data. Please click on the links below to find out
                        more about these rights:
                    </p>
                    <ul>
                        <li>
                            <p>
                                {' '}
                                <em>Request access to your personal data.</em>
                            </p>
                        </li>
                        <li>
                            <p>
                                {' '}
                                <em>Request correction of your personal data.</em>
                            </p>
                        </li>
                        <li>
                            <p>
                                {' '}
                                <em>Request erasure of your personal data.</em>
                            </p>
                        </li>
                        <li>
                            <p>
                                {' '}
                                <em>Object to processing of your personal data.</em>
                            </p>
                        </li>
                        <li>
                            <p>
                                {' '}
                                <em>Request restriction of processing your personal data.</em>
                            </p>
                        </li>
                        <li>
                            <p>
                                <em>Request transfer of your personal data.</em>
                            </p>
                        </li>
                        <li>
                            <p>
                                <em>Right to withdraw consent.</em>
                            </p>
                        </li>
                    </ul>
                    <p>
                        If you wish to exercise any of the rights set out above, please contact us.
                    </p>
                    <h4>No fee usually required</h4>
                    <p>
                        You will not have to pay a fee to access your personal data (or to exercise
                        any of the other rights). However, we may charge a reasonable fee if your
                        request is clearly unfounded, repetitive or excessive. Alternatively, we may
                        refuse to comply with your request in these circumstances.
                    </p>
                    <h4>What we may need from you</h4>
                    <p>
                        We may need to request specific information from you to help us confirm your
                        identity and ensure your right to access your personal data (or to exercise
                        any of your other rights). This is a security measure to ensure that
                        personal data is not disclosed to any person who has no right to receive it.
                        We may also contact you to ask you for further information in relation to
                        your request to speed up our response.
                    </p>
                    <h4>Time limit to respond</h4>
                    <p>
                        We try to respond to all legitimate requests within one month. Occasionally
                        it may take us longer than a month if your request is particularly complex
                        or you have made a number of requests. In this case, we will notify you and
                        keep you updated.
                    </p>
                </li>
                <li id="glossary">
                    <h4>Glossary</h4>
                    <h4>LAWFUL BASIS</h4>
                    <p>
                        <strong>Legitimate Interest</strong> means the interest of our business in
                        conducting and managing our business to enable us to give you the best
                        service/product and the best and most secure experience. We make sure we
                        consider and balance any potential impact on you (both positive and
                        negative) and your rights before we process your personal data for our
                        legitimate interests. We do not use your personal data for activities where
                        our interests are overridden by the impact on you (unless we have your
                        consent or are otherwise required or permitted to by law). You can obtain
                        further information about how we assess our legitimate interests against any
                        potential impact on you in respect of specific activities by contacting us{' '}
                        <a href="mailto:info@bolstersystems.com">info@bolstersystems.com</a>
                    </p>
                    <p>
                        <strong>Performance of Contract</strong> means processing your data where it
                        is necessary for the performance of a contract to which you are a party or
                        to take steps at your request before entering into such a contract.
                    </p>
                    <p>
                        <strong>Comply with a legal or regulatory obligation</strong> means
                        processing your personal data where it is necessary for compliance with a
                        legal or regulatory obligation that we are subject to.
                    </p>
                    <h4>THIRD PARTIES</h4>
                    <h4>External Third Parties</h4>
                    <ul>
                        <li>
                            <p> Bolster Systems using Amazon Web Services for processing data </p>
                        </li>
                    </ul>
                    <p>Professional advisers acting as processors including</p>
                    <ul>
                        <li>
                            <p>Accountants: Hull Jady 41 Bridgeman Terrace, Wigan WN1 1TT</p>
                        </li>
                        <li>
                            <p>Insurance: The Insurance Centre 8 China St, Lancaster LA1 1EX</p>
                        </li>
                        <li>
                            <p>Legals: JMW Solicitors LLP 1 Byrom Place, Manchester, M3 3HG</p>
                        </li>
                        <li>
                            <p>
                                HM Revenue & Customs, regulators and other authorities acting as
                                processors based in the United Kingdom who may require reporting of
                                processing activities in certain circumstances.
                            </p>
                        </li>
                        <li>
                            <p>
                                Instant VAT Number (256 bit encryption) Validation & EU VAT Rates
                                API by VATLAYER Amazon Europe Core S.A.R.L{' '}
                                <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href="https://vatlayer.com"
                                >
                                    https://vatlayer.com
                                </a>
                            </p>
                        </li>
                    </ul>
                    <h4>YOUR LEGAL RIGHTS</h4>
                    <p>You have the right to:</p>
                    <p>
                        <strong>Request access</strong> to your personal data (commonly known as a
                        "data subject access request"). This enables you to receive a copy of the
                        personal data we hold about you and to check that we are lawfully processing
                        it.
                    </p>
                    <p>
                        <strong>Request correction</strong> of the personal data that we hold about
                        you. This enables you to have any incomplete or inaccurate data we hold
                        about you corrected, though we may need to verify the accuracy of the new
                        data you provide to us.
                    </p>
                    <p>
                        <strong>Request erasure</strong> of your personal data. This enables you to
                        ask us to delete or remove personal data where there is no good reason for
                        us continuing to process it. You also have the right to ask us to delete or
                        remove your personal data where you have successfully exercised your right
                        to object to processing (see below), where we may have processed your
                        information unlawfully or where we are required to erase your personal data
                        to comply with local law. Note, however, that we may not always be able to
                        comply with your request of erasure for specific legal reasons which will be
                        notified to you, if applicable, at the time of your request.
                    </p>
                    <p>
                        <strong>Object to processing</strong> of your personal data where we are
                        relying on a legitimate interest (or those of a third party) and there is
                        something about your particular situation which makes you want to object to
                        processing on this ground as you feel it impacts on your fundamental rights
                        and freedoms. You also have the right to object where we are processing your
                        personal data for direct marketing purposes. In some cases, we may
                        demonstrate that we have compelling legitimate grounds to process your
                        information which override your rights and freedoms.
                    </p>
                    <p>
                        <strong>Request restriction of processing</strong> of your personal data.
                        This enables you to ask us to suspend the processing of your personal data
                        in the following scenarios: (a) if you want us to establish the data's
                        accuracy; (b) where our use of the data is unlawful but you do not want us
                        to erase it; (c) where you need us to hold the data even if we no longer
                        require it as you need it to establish, exercise or defend legal claims; or
                        (d) you have objected to our use of your data but we need to verify whether
                        we have overriding legitimate grounds to use it.
                    </p>
                    <p>
                        <strong>Request the transfer</strong> of your personal data to you or to a
                        third party. We will provide to you, or a third party you have chosen, your
                        personal data in a structured, commonly used, machine-readable format. Note
                        that this right only applies to automated information which you initially
                        provided consent for us to use or where we used the information to perform a
                        contract with you.
                    </p>
                    <p>
                        <strong>Withdraw consent at any time</strong> where we are relying on
                        consent to process your personal data. However, this will not affect the
                        lawfulness of any processing carried out before you withdraw your consent.
                        If you withdraw your consent, we may not be able to provide certain products
                        or services to you. We will advise you if this is the case at the time you
                        withdraw your consent.
                    </p>
                </li>
            </ol>
        </WysiwygBlock>
    </BlockContainer>
);

export default PrivacyPolicy;
