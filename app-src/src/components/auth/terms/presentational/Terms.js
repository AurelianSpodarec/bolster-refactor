import React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import WysiwygBlock from 'components/shared/generic/wysiwyg/presentational/WysiwygBlock';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const Terms = () => (
    <>
        <PageHeading leftChildren={true} title="Terms & Conditions">
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <BlockHeading title="Standard Terms and Conditions of Business for Bolster System's Surveying Software"></BlockHeading>
            <WysiwygBlock>
                <ol>
                    <li>
                        <h4>Definitions</h4>

                        <p>
                            <strong>Administration Site</strong>:- the website from which the
                            Customer can access the Web Platform to manage and administer the
                            Licenced Product, currently{' '}
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://www.bolstersystems.com"
                            >
                                www.bolstersystems.com
                            </a>
                            .
                        </p>
                        <p>
                            <strong>Agreement</strong>:- the agreement for the purchase of the
                            Licensed Product in accordance with these terms and conditions.
                        </p>
                        <p>
                            <strong>App</strong>:- the Bolster Systems mobile surveying application
                            software, the data supplied with the software, and any associated media.
                        </p>
                        <p>
                            <strong>Authorised Users</strong>:- the Customer’s partners (if the
                            Customer is a partnership), members (if the Customer is a limited
                            liability partnership), officers (if the Customer is a corporate body)
                            and employees who are authorised to access and use the Licenced Product
                            in accordance with these terms and conditions.
                        </p>
                        <p>
                            <strong>Building Owner</strong>:- the owner or its authorised
                            representatives of the building, property or construction (or any part
                            therefore) which is the subject of any use of the Licensed Product.
                        </p>
                        <p>
                            <strong>Building Owner</strong>:- the owner or its authorised
                            representatives of the building, property or construction (or any part
                            therefore) which is the subject of any use of the Licensed Product.
                        </p>
                        <p>
                            <strong>Commencement Date</strong>:- the date the Customer purchases the
                            Licence Product and pays the Subscription Fee.
                        </p>
                        <p>
                            <strong>Content</strong>:- all documents, text, information, data,
                            software, executable code, access codes, images, audio or video material
                            in whatever medium or form comprised in or used with the Licensed
                            Product other than the Customer Data.{' '}
                        </p>
                        <p>
                            <strong>Contract Year</strong>:- the 12 month period from the
                            Commencement Date and each succeeding 12-month period.
                        </p>
                        <p>
                            <strong>Customer</strong>:- the customer specified in the Registration
                            Form who is purchasing the Licensed Product.
                        </p>

                        <p>
                            <strong>Customer Data</strong>:- the data inputted by the Customer,
                            Authorised Users, or Bolster on the Customer's behalf for the purpose of
                            using the Licensed Product or facilitating the Customer’s use of the
                            Licensed Product.
                        </p>
                        <p>
                            <strong>Initial Subscription Term</strong>:- the period set out in the
                            Registration Form.
                        </p>
                        <p>
                            <strong>Intellectual Property Rights</strong>:- patents, rights to
                            inventions, copyright and related rights, trade marks, business names
                            and domain names, rights in get-up, goodwill and the right to sue for
                            passing off, rights in designs, database rights, rights to use, and
                            protect the confidentiality of, confidential information (including
                            know-how), and all other intellectual property rights, in each case
                            whether registered or unregistered and including all applications and
                            rights to apply for and be granted, renewals or extensions of, and
                            rights to claim priority from, such rights and all similar or equivalent
                            rights or forms of protection which subsist or will subsist now or in
                            the future in any part of the world.
                        </p>
                        <p>
                            <strong>Licence</strong>:- the user subscription purchased by the
                            Customer that entitles Authorised Users to access and use the Licensed
                            Product, in accordance with these terms and conditions.{' '}
                        </p>
                        <p>
                            <strong>Licensed Product</strong>:- access to and use of the Web
                            Platform and/or the App together with any relevant Content, any error
                            corrections or updates that Bolster may provide or perform with respect
                            to the Web Platform and/or the App as specified in the Registration
                            Form.
                        </p>
                        <p>
                            <strong>Project</strong>:- a project to be undertaken by the Customer
                            using the Licensed Product for the Purpose.
                        </p>
                        <p>
                            <strong>Project Credits</strong>:- payment credits allowing the Customer
                            to upload Projects for the Purpose.
                        </p>
                        <p>
                            <strong>Project Credit Fee</strong>:- the fee payable by the Customer
                            for Project Credits as set out in the Registration Form.
                        </p>
                        <p>
                            <strong>Purpose</strong>:- fire safety surveying of buildings and
                            properties and the monitoring and administration of such surveys by the
                            Customer and Authorised Users.{' '}
                        </p>
                        <p>
                            <strong>Registration Form</strong>:- Bolster’s order form for the
                            Licensed Product on which the Customer registers for use of the Licensed
                            Product on the relevant product platform.{' '}
                        </p>
                        <p>
                            <strong>Subscription Fee</strong>:- the fee payable by the Customer for
                            the use of the Licenced Product as set out in the Registration Form.{' '}
                        </p>
                        <p>
                            <strong>Supplier</strong>:- Bolster Systems Limited (company number
                            09148744) whose registered office is at 7 The Schoolhouse Second Avenue,
                            Trafford Park, Manchester, Greater Manchester, England, M17 1DZ.{' '}
                        </p>
                        <p>
                            <strong>Web Platform</strong>:- the web based application software
                            accessed through the Administration Site for the managing and
                            administration of fire safety surveys and associated works.
                        </p>
                    </li>
                    <li>
                        <h4>Commencement and Duration</h4>
                        <p>
                            This Agreement shall, unless otherwise terminated as provided in clause
                            10, shall commence on the Commencement Date and shall continue for the
                            Initial Subscription Term and, thereafter shall be automatically renewed
                            for successive periods equal to the Initial Subscription Term (each a “
                            <strong>Renewal Period</strong>”), unless terminated on not less than 1
                            month's prior notice in writing to expire on or before the end of the
                            Initial Subscription Term or Renewal Period (as the case may be) and the
                            Initial Subscription Term together with any subsequent Renewal Periods
                            shall constitute the <strong>Subscription Term</strong>.
                        </p>
                        <p>
                            The Customer must not grant access to and use of the Licensed Product to
                            any third party other than an Authorised User.
                        </p>
                    </li>
                    <li>
                        <h4>Bolster’s Obligations</h4>
                        <p>
                            Subject to the compliance of the Customer with these terms and
                            conditions Bolster shall use all reasonable endeavours to:
                        </p>
                        <ol>
                            <li>
                                <p>
                                    provide the Licensed Product to the Customer on the terms of the
                                    Agreement in all material respects;
                                </p>
                            </li>
                            <li>
                                <p>
                                    provide such support to the Customer as is reasonably necessary
                                    to allow the Customer and the Authorised Users to use the
                                    Licensed Product in accordance with its support policy in effect
                                    at the time the Licensed Product is provided and as published on
                                    Bolster’s website www.bolstersystems.co.uk, or as otherwise
                                    notified to the Customer by Bolster in writing from time to
                                    time. Bolster may amend the support policy in its sole and
                                    absolute discretion from time to time;
                                </p>
                            </li>
                            <li>
                                <p>
                                    comply with all applicable laws and regulations, including those
                                    relating to anti-bribery and anti-corruption.
                                </p>
                            </li>
                        </ol>
                        <p>
                            On and from the Commencement Date Bolster will provide the Customer with
                            access to the Licensed Product as set out in the Registration Form.
                        </p>
                        <p>
                            Bolster does not warrant that (a) the Customer's use of the Licensed
                            Product will be uninterrupted or error-free and the Customer
                            acknowledges that the Licensed Product may be interrupted by planned or
                            unplanned maintenance including but not limited to App store provider
                            updates initiated by Apple; (b) the Licensed Product and/or the
                            information obtained by the Customer through the Licensed Product will
                            meet the Customer's requirements; and
                        </p>
                        <p>
                            Bolster will not be responsible for any delays, delivery failures, or
                            any other loss or damage resulting from the transfer of data over
                            communications networks and facilities, including the internet, and the
                            Customer acknowledges that the Licensed Product may be subject to
                            limitations, delays and other problems inherent in the use of such
                            communications facilities.
                        </p>
                        <p>
                            The Licensed Product is designed for use with authorised ancillary
                            products only. Bolster does not accept any liability for any loss or
                            damage caused by any use of the Licensed Product with any unauthorised
                            ancillary products. A current list of authorised ancillary products is
                            set out on the Administration Site
                        </p>
                    </li>
                    <li>
                        <h4>Customer’s Obligations</h4>
                        <p>The Customer shall:</p>
                        <ol>
                            <li>
                                <p>
                                    co-operate with Bolster in all matters relating to the Licensed
                                    Product;
                                </p>
                            </li>
                            <li>
                                <p>
                                    be responsible (at its own cost) for providing, configuring and
                                    maintaining in good working order the necessary equipment and
                                    computer networks in accordance with any technical
                                    specifications issued by Bolster from time to time for the use
                                    of the Licensed Product, including but not limited to the
                                    necessary equipment required by the Customer to access the
                                    Administration Site and App and the equipment required by the
                                    Authorised Users to enable them to use the Licensed Product for
                                    the Purpose;
                                </p>
                            </li>
                            <li>
                                <p>
                                    ensure each Authorised User keeps a secure password for his use
                                    of the Licensed Product and Content and that each Authorised
                                    User shall keep his password confidential;
                                </p>
                            </li>
                            <li>
                                <p>
                                    ensure that each Authorised User accepts and complies with
                                    Bolster’s end user licence agreement (“EULA”) for the Licensed
                                    Product from time to time;
                                </p>
                            </li>
                            <li>
                                <p>
                                    notify Bolster as soon as it becomes aware of any unauthorised
                                    use of the Licensed Product by any person;
                                </p>
                            </li>
                            <li>
                                <p>
                                    not (save as is necessary for the completion or use of the
                                    Licensed Product for the Purpose) download, store, reproduce,
                                    display, print, distribute, publish the Content whether in whole
                                    or part, and in any manner, form or media without the prior
                                    written consent of Bolster;
                                </p>
                            </li>
                            <li>
                                <p>
                                    the Customer will be responsible for setting up each Authorised
                                    User with access to the relevant Licensed Product. The Customer
                                    must ensure that each person having access to the Licensed
                                    Product is an Authorised User and uses the Licensed Product only
                                    in accordance with these terms and conditions;
                                </p>
                            </li>
                            <li>
                                <p>
                                    not use any information provided by Bolster or obtained by the
                                    Customer and Authorised Users by using the Licensed Product to
                                    create any software or product where the use is substantially
                                    similar to that of the Licensed Product;
                                </p>
                            </li>
                            <li>
                                <p>
                                    not access all or any part of the Licensed Product in order to
                                    create a product or service which competes with the Licensed
                                    Product;
                                </p>
                            </li>
                            <li>
                                <p>
                                    not use such information in any manner which would be restricted
                                    by any copyright subsisting in it;
                                </p>
                            </li>
                            <li>
                                <p>
                                    not use the Licensed Product to provide any similar or other
                                    services to third parties;
                                </p>
                            </li>
                            <li>
                                <p>
                                    not license, sell, rent, lease, transfer, assign, distribute,
                                    display, disclose, or otherwise commercially exploit, or
                                    otherwise make the Licensed Product available to any third party
                                    except the Authorised Users.
                                </p>
                            </li>
                        </ol>
                        <p>
                            If the Customer or any Authorised User breaches the terms of the EULA,
                            Bolster may, without liability to the Customer and not withstanding any
                            other rights or remedies available to it, disable the Customer's and/or
                            any Authorised User’s password, account and access to all or part of the
                            Licensed Product and Content and shall be under no obligation to provide
                            access to the Licensed Product and/or Content until such breach has been
                            remedied and the relevant parties have agreed in writing to comply with
                            the EULA.
                        </p>
                    </li>
                    <li>
                        <h4>Charges and Payments</h4>
                        <p>
                            In consideration for the provision of the Licensed Product the Customer
                            shall pay to Bolster the Subscription Fee as set out in the Registration
                            Form.
                        </p>
                        <p>
                            In consideration for the provision of the Licensed Product the Customer
                            shall pay to Bolster the Subscription Fee as set out in the Registration
                            Form.
                        </p>
                        <p>
                            The Subscription Fee for the Licensed Product and the Project Credit Fee
                            for Project Credits shall be reviewed annually, and any increase shall
                            be effective on the commencement of the next Renewal Period.
                        </p>
                        <p>
                            Bolster reserves the right to increase the Subscription Fee and the
                            Project Credit Fee following any review but in any event such annual
                            increase to the Subscription Fee shall not be greater than 5% in any
                            Contract Year.
                        </p>
                        <p>
                            Without prejudice to any other right or remedy that Bolster may have, if
                            the Customer fails to pay Bolster on the due date:
                        </p>
                        <ol>
                            <li>
                                <p>
                                    Bolster may, without liability to the Customer, disable the
                                    Customer's and/or any Authorised User’s password, account and
                                    access to all or part of the Licensed Product and Content and
                                    shall be under no obligation to provide access to the Licensed
                                    Product and/or Content while the invoice(s) concerned remain
                                    unpaid; and
                                </p>
                            </li>
                            <li>
                                <p>
                                    the Customer shall pay interest on the overdue amount at the
                                    rate of 4% per annum above Barclays Bank plc's base rate from
                                    time to time. Such interest shall accrue on a daily basis from
                                    the due date until actual payment of the overdue amount, whether
                                    before or after judgment.
                                </p>
                            </li>
                        </ol>
                    </li>
                    <li>
                        <h4>Project Credits</h4>
                        <p>
                            If the Customer intends to upload a Project, to enable the Customer to
                            upload a Project, the Customer must purchase Project Credits. Each
                            upload will require the Customer to utilise a Project Credit.
                        </p>
                        <p>
                            Project Credits can be purchased by the Customer at any point during the
                            term of this agreement and the Customer’s current Project Credit balance
                            available will display on the home screen of the Customer’s main
                            account.
                        </p>
                        <p>No refunds are given on Project Credits purchased by the Customer.</p>
                    </li>
                    <li>
                        <h4>Intellectual Property Rights and Customer Data</h4>
                        <p>
                            The Customer acknowledges that all Intellectual Property Rights in the
                            Licensed Products and the Content and in connection with the Licensed
                            Product belong to Bolster.
                        </p>
                        <p>
                            The Customer and its Authorised Users shall have no rights in or to the
                            Licensed Product other than the right to use it in accordance with these
                            terms and conditions.
                        </p>
                        <p>
                            The Customer will not itself, and will procure that no Authorised User,
                            claim any Intellectual Property Rights in the Licensed Product and/or
                            Content.
                        </p>
                        <p>
                            The Customer shall have sole responsibility for the legality,
                            reliability, integrity, accuracy and quality of the Customer Data.
                        </p>
                        <p>The Customer warrants, represents and undertakes that:</p>
                        <ol>
                            <li>any Customer Data provided to Bolster is owned by the Customer;</li>
                            <li>
                                it has received the necessary consents or permissions to use the
                                Customer Data in accordance with this Agreement from the applicable
                                owner(s);
                            </li>
                            <li>
                                the Customer Data does not include any material that is obscene,
                                indecent, pornographic, seditious, offensive, defamatory,
                                threatening, liable to incite racial hatred or acts of terrorism,
                                menacing, or blasphemous; or
                            </li>
                            <li>
                                the Customer Data does not infringe any third party Intellectual
                                Property Rights,
                            </li>
                        </ol>
                        <p>
                            and the Customer shall indemnify Bolster against all damages, losses and
                            expenses arising as a result of any action or claim that the Customer
                            Data breaches the warranties, representations or undertakings set out in
                            this paragraph.
                        </p>
                        <p>
                            The Customer shall have sole responsibility for the legality,
                            reliability, integrity, accuracy and quality of the Customer Data. The
                            Customer grants to Bolster a worldwide, non-exclusive, royalty free,
                            sub-licensable irrevocable licence to copy, use and modify the Customer
                            Data for the purpose of carrying out its obligations under this
                            Agreement.
                        </p>
                        <p>The Customer acknowledges and agrees that :</p>
                        <ol>
                            <li>
                                any Customer Data or content uploaded to the Licensed Product by the
                                Customer or its Authorised Users may be viewed and utilised by the
                                Building Owner if the Building Owner utilises any Licensed Product
                                for itself. The Customer grants to Bolster a worldwide,
                                non-exclusive, royalty free, sub-licensable, irrevocable licence to
                                allow the Building Owner to utilise any Customer Data or content
                                uploaded to the Licensed Product by the Customer.; and
                            </li>
                            <li>
                                to the extent that Customer Data or any content uploaded to the
                                Licensed Product is shared, edited and/or modified between the
                                Customer, Authorised Users and/or other authorised users of the
                                Licensed Product to which the Customer has granted permission (or
                                permission has been granted by another customer) to access a Project
                                or uploaded content, the Customer grants a non-exclusive licence to
                                copy, use and modify the Customer Data for the Purpose.
                            </li>
                        </ol>
                        <p>
                            If Bolster processes any personal data on the Customer's behalf when
                            performing its obligations under this Agreement, the parties record
                            their intention that the Customer shall be the data controller and
                            Bolster shall be a data processor and in any such case:
                        </p>
                        <ol>
                            <li>
                                the Customer acknowledges and agrees that the personal data may be
                                transferred or stored outside the EEA or the country where the
                                Customer and the Authorised Users are located in order to provide
                                the Licensed Product and Bolster's other obligations under this
                                Agreement;
                            </li>
                            <li>
                                the Customer shall ensure that the Customer is entitled to transfer
                                the relevant personal data to Bolster so that Bolster may lawfully
                                use, process and transfer the personal data in accordance with this
                                agreement on the Customer's behalf;
                            </li>
                            <li>
                                the Customer shall ensure that the relevant third parties have been
                                informed of, and have given their consent to, such use, processing,
                                and transfer as required by all applicable data protection
                                legislation;
                            </li>
                            <li>
                                Bolster shall process the personal data only in accordance with the
                                terms of this Agreement and any lawful instructions reasonably given
                                by the Customer from time to time; and
                            </li>
                            <li>
                                each party shall take appropriate technical and organisational
                                measures against unauthorised or unlawful processing of the personal
                                data or its accidental loss, destruction or damage.{' '}
                            </li>
                        </ol>
                    </li>
                    <li>
                        <h4>Template Requests</h4>
                        <p>
                            The Licensed Product allows for use of templates based on the Customer’s
                            requirements. If the Customer requires a template then it shall provide
                            Bolster with the details of such template in such detail as Bolster may
                            reasonably require.
                        </p>
                        <p>
                            Following receipt of the Customer’s requirements for a template, Bolster
                            will notify the Customer if it is able to provide such template within
                            the Licensed Product and in line with subscription fees associated with
                            this.
                        </p>
                        <p>
                            If Bolster is able and willing to provide the template, Bolster shall
                            give the customer a timeframe within which it intends to make the
                            template available through the Licensed Product (but it is acknowledged
                            that time of delivery is not of the essence).
                        </p>
                        <p>
                            Bolster will use reasonable skill and care in the creation of the
                            template.
                        </p>
                        <p>
                            The Customer warrants and undertakes that where it provides a template
                            or requirements for the creation of a template within the Licensed
                            Product that:
                        </p>
                        <ol>
                            <li>
                                the Customer owns such requirements or materials (or is authorised
                                to provide them to Bolster for such purposes;
                            </li>
                            <li>
                                the provision of such materials or requirements to Bolster and the
                                provision of a template based on such materials or requirements
                                within the Licensed Product shall not infringe the Intellectual
                                Property Rights of any third party.
                            </li>
                        </ol>
                        <p>
                            The Customer agrees that it will indemnify Bolster against all damages,
                            losses and expenses arising as a result of any action or claim that the
                            Customer Data breaches the undertakings set out in paragraphs a and b
                            above.
                        </p>
                        <p>
                            The Customer agrees that where Bolster creates a template pursuant to
                            the Customer’s request that Bolster shall be entitled (and the Customer
                            hereby grants Bolster a worldwide, non-exclusive, royalty free,
                            sub-licensable, irrevocable licence) to reuse any template created (or
                            to create and use derivative templates) with other customers of Bolster
                            (whether as an integral part of the Licensed Product or in relation to
                            requests from other customers).
                        </p>
                    </li>
                    <li>
                        <h4>Limitation of Liability</h4>
                        <p>
                            This paragraph sets out the entire financial liability of Bolster
                            (including any liability for the acts or omissions of its employees,
                            agents and sub-contractors) to the Customer:
                        </p>
                        <ol>
                            <li>arising under or in connection with this Agreement;</li>
                            <li>
                                in respect of any use made by the Customer of the Licensed Products
                                and Content or any part of them; and
                            </li>
                            <li>
                                in respect of any use made by the Customer of the Licensed Products
                                and Content or any part of them; and
                            </li>
                        </ol>
                        <p>Except as expressly and specifically provided in this Agreement:</p>
                        <ol>
                            <li>
                                the Customer assumes sole responsibility for results obtained from
                                the use of the Licensed Products and the Content by the Customer,
                                and for conclusions drawn from such use. Bolster shall have no
                                liability for any damage caused by errors or omissions in any
                                information, instructions or scripts provided to Bolster by the
                                Customer in connection with the provision of the Licensed Products,
                                or any actions taken by Bolster at the Customer's direction;
                            </li>
                            <li>
                                all warranties, representations, conditions and all other terms of
                                any kind whatsoever implied by statute or common law are, to the
                                fullest extent permitted by applicable law, excluded from this
                                Agreement; and
                            </li>
                            <li>
                                all warranties, representations, conditions and all other terms of
                                any kind whatsoever implied by statute or common law are, to the
                                fullest extent permitted by applicable law, excluded from this
                                Agreement; and
                            </li>
                        </ol>
                        <p>Nothing in this Agreement excludes the liability of Bolster:</p>
                        <ol>
                            <li>
                                <p>
                                    for death or personal injury caused by Bolster's negligence; or
                                </p>
                            </li>
                            <li>
                                <p>for fraud or fraudulent misrepresentation.</p>
                            </li>
                        </ol>
                        <p>Subject to the above terms:</p>
                        <ol>
                            <li>
                                <p>
                                    Bolster shall not be liable whether in tort (including for
                                    breach of statutory duty), contract, misrepresentation,
                                    restitution or otherwise for any loss of profits, loss of
                                    business, depletion of goodwill and/or similar losses or loss or
                                    corruption of data or information, or pure economic loss, or for
                                    any special, indirect or consequential loss, costs, damages,
                                    charges or expenses however arising under this agreement; and
                                </p>
                            </li>
                            <li>
                                <p>
                                    Bolster's total aggregate liability in contract, tort (including
                                    negligence or breach of statutory duty), misrepresentation,
                                    restitution or otherwise, arising in connection with the
                                    performance or contemplated performance of this Agreement shall
                                    be limited to the 1.5 times the total Subscription Fees paid
                                    during the 12 months immediately preceding the date on which the
                                    claim arose.
                                </p>
                            </li>
                        </ol>
                    </li>
                    <li>
                        <h4>Termination</h4>
                        <p>
                            Without affecting any other right or remedy available to Bolster or the
                            Customer either party may terminate the Agreement with immediate effect
                            by giving written notice to the other party if:
                        </p>
                        <ol>
                            <li>
                                <p>
                                    the other party fails to pay any amount due under the Agreement
                                    on the due date for payment and remains in default not less than
                                    30 days after being notified in writing to make such payment;
                                </p>
                            </li>
                            <li>
                                <p>
                                    the other party commits a material breach of any other term of
                                    the Agreement which breach is irremediable or (if such breach is
                                    remediable) fails to remedy that breach within a period of 30
                                    days after being notified in writing to do so;
                                </p>
                            </li>
                            <li>
                                <p>
                                    the other party repeatedly breaches any of the terms of this
                                    agreement in such a manner as to reasonably justify the opinion
                                    that its conduct is inconsistent with it having the intention or
                                    ability to give effect to the terms of this agreement; or
                                </p>
                            </li>
                            <li>
                                <p>
                                    the other party suspends, or threatens to suspend, payment of
                                    its debts or is unable to pay its debts; or goes into
                                    administration or liquidation either compulsorily or voluntarily
                                    (save for the purposes of solvent reconstruction or
                                    amalgamation); or the other party (being an individual) is the
                                    subject of a bankruptcy petition or order; of if a receiver or
                                    administrative receiver is appointed in respect of the whole or
                                    any part of its assets; or if either party makes an assignment
                                    for the benefit of or composition with its creditors generally;
                                    or if its ceases to trade; or threatens to do any of the
                                    aforementioned things; or if any analogous events occur with
                                    respect to either party in any jurisdiction to which it is
                                    subject.
                                </p>
                            </li>
                        </ol>
                        <p>On termination of this Agreement for any reason:</p>
                        <ol>
                            <li>
                                <p>
                                    all licences granted under this agreement shall immediately
                                    terminate;
                                </p>
                            </li>
                            <li>
                                <p>
                                    the Customer shall (and shall procure that all Authorised Users
                                    shall) make no further use of the Licensed Products and Content;
                                </p>
                            </li>
                            <li>
                                <p>
                                    any rights, remedies, obligations or liabilities of the parties
                                    that have accrued up to the date of termination, including the
                                    right to claim damages in respect of any breach of the agreement
                                    which existed at or before the date of termination shall not be
                                    affected or prejudiced; and
                                </p>
                            </li>
                            <li>
                                <p>
                                    clauses which expressly or by implication survive termination
                                    shall continue in full force and effect.
                                </p>
                            </li>
                        </ol>
                    </li>
                    <li>
                        <h4>Force Majeure</h4>
                        <p>
                            Neither party shall be in breach of the Agreement nor liable for delay
                            in performing, or failure to perform, any of its obligations under the
                            Agreement if such delay or failure result from events, circumstances or
                            causes beyond its reasonable control. In such circumstances the affected
                            party shall be entitled to a reasonable extension of the time for
                            performing such obligations. If the period of delay or non-performance
                            continues for 3 months, the party not affected may terminate this
                            agreement by giving 1 month’s written notice to the affected party.
                        </p>
                    </li>
                    <li>
                        <h4>Notices</h4>
                        <p>
                            Any notice given under the Agreement shall be in writing and shall be
                            deemed to have been received (a) if delivered by hand on the date of
                            delivery (b) if sent by pre-paid first class post or other next working
                            day delivery service at 9.00 a.m. on the second day after posting or at
                            the time recorded by the delivery service (c) if sent by fax at 9.00
                            a.m. on the next day after transmission.
                        </p>
                    </li>
                    <li>
                        <h4>Governing Law and Jurisdiction</h4>
                        <p>
                            The Agreement and any dispute or claim arising out of or in connection
                            with it or its subject matter or formation (including non-contractual
                            disputes or claims) shall be governed by and construed in accordance
                            with the law of England and Wales.
                        </p>
                        <p>
                            Each party irrevocably agrees that the courts of England and Wales shall
                            have exclusive jurisdiction to settle any dispute or claim arising out
                            of or in connection with the Agreement or its subject matter or
                            formation (including non-contractual disputes or claims).
                        </p>
                    </li>
                </ol>
            </WysiwygBlock>

            <p className="generic"></p>
        </BlockContainer>
        <BlockContainer>
            <BlockHeading title="End User Licence Agreement for Bolster System's Surveying Software"></BlockHeading>
            <WysiwygBlock>
                <ol>
                    <li>
                        <h4>
                            This end-user licence agreement (“EULA”) is a legal agreement between
                            you (“End-user” or “you”) and Bolster Systems Limited (company number
                            09148744) whose registered office is at The Studio, The Schoolhouse,
                            Second Avenue, Trafford Park, Manchester M17 1DZ (“Bolster”, “us” or
                            “we”) for the access to and use of:
                        </h4>
                        <ol>
                            <li>
                                Bolster Systems mobile application software once you have downloaded
                                or streamed a copy of the application onto your mobile telephone or
                                handheld device, the data supplied with the software, and the
                                associated media (the “<strong>App</strong>”);
                            </li>
                            <li>
                                the web based platform software accessible through our website{' '}
                                <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href="https://www.bolstersystems.com"
                                >
                                    www.bolstersystems.com
                                </a>{' '}
                                (“<strong>Website</strong>”) (the “<strong>Web Platform</strong>”);
                                and
                            </li>
                            <li>
                                all documents, text, information, data, software, executable code,
                                access codes, images, audio or video material in whatever medium or
                                form comprised in or used with the App and/or the Web Platform other
                                than the Customer Data (defined below) (“<strong>Content</strong>”),
                            </li>
                        </ol>
                        <p>
                            together with any error corrections or updates that Bolster may provide
                            or perform with respect to the Web Platform and/or the App from time to
                            time (the “<strong>Licensed Product</strong>”).
                        </p>
                    </li>
                    <li>
                        <h4>Operating System Requirements</h4>
                        <p>
                            The App requires an iPhone device with a minimum of [amount] of memory.
                            Internet access and the [type of operating system] operating system
                            [version of operating system]. [any further requirements].
                        </p>
                        <p>
                            The Web Platform requires internet access and the [type of operating
                            system] operating system [version of operating system] [amount] of
                            memory] [any further requirements].
                        </p>
                    </li>
                    <li>
                        <h4>Important Notice</h4>
                        <p>
                            By downloading the App or using the Licensed Product from the Website or
                            clicking on the "accept" button below you agree to the terms of the
                            licence which will bind you. The terms of the licence include, in
                            particular, the privacy policy defined in condition 5 and limitations on
                            liability in condition 10.
                        </p>
                        <p>
                            If you do not agree to the terms of this licence, Bolster will not
                            license the use of the Licensed Product to you and you must stop the
                            downloading or streaming process now by clicking on the "cancel" button
                            below. In this case the downloading or streaming process will terminate.
                        </p>
                    </li>
                    <li>
                        <h4>Definitions</h4>
                        <p>
                            <strong>Authorised Users</strong>:- the Licensee’s partners (if the
                            Customer is a partnership), members (if the Customer is a limited
                            liability partnership), officers (if the Customer is a corporate body)
                            and employees who are authorised to access and use the Licenced Product
                            in accordance with these terms and conditions.
                        </p>
                        <p>
                            <strong>Building Owner</strong>:- the owner or its authorised
                            representatives of the building, property or construction (or any part
                            therefore) which is the subject of any use of the Licensed Product.
                        </p>
                        <p>
                            <strong>Customer Data</strong>:- the data inputted by you, any other
                            Authorised User or Bolster on your behalf for the purpose of using the
                            Licensed Product or facilitating your use of the Licensed Product.
                        </p>
                        <p>
                            <strong>Licensee</strong>:- the customer specified in the Registration
                            Form who purchased the subscription for the Licensed Product for your
                            use as an Authorised User.
                        </p>
                        <p>
                            <strong>Overarching Licence Agreement</strong>:- the agreement for the
                            purchase of the subscription for the Licensed Product by the Licensee
                            under which you are authorised to use the Licensed Product as an
                            Authorised User.
                        </p>
                        <p>
                            <strong>Registration Form</strong>:- Bolster’s order form for the
                            Licensed Product on which the Licensee registers for use of the Licensed
                            Product on the relevant product platform.
                        </p>
                    </li>
                    <li>
                        <h4>Licence</h4>
                        <p>
                            On completion of the purchase of the Licenced Product by the Licensee
                            and in consideration of you agreeing to abide by the terms of this EULA,
                            as an Authorised User, we grant you a non- transferable, non-exclusive
                            licence to use the Licensed Product, for the subscription term as set
                            out in the Overarching Licence Agreement, subject to these terms, the
                            Privacy Policy and any Appstore Rules (as defined below) (as the case
                            may be), incorporated into this EULA by reference. We reserve all other
                            rights.
                        </p>
                        <p>
                            In consideration of you agreeing to abide by the terms of this EULA, you
                            may:
                        </p>
                        <ol>
                            <li>
                                if you are downloading or streaming the App, download or stream a
                                copy of the App onto your Device (as defined in this clause 5 below)
                                and view, use and display the App on your Device for your business
                                purposes only;
                            </li>
                            <li>
                                if you are using the Web Platform, you may use the Web Platform for
                                your own business purposes as set out in the EULA; and
                            </li>
                            <li>use the Content for your own business purposes only.</li>
                        </ol>
                        <p>
                            We license use of the Licensed Product to you on the basis of this EULA
                            and subject to any rules or policies applied by any provider of a
                            service allowing the download of the App (“
                            <strong>Apple App Store & Google Play Store</strong>”) where, the
                            End-user downloaded the App (“<strong>Appstore Rules</strong>”). We do
                            not sell the Licensed Product (or any part of it) to you. We remain the
                            owners of the Licensed Product at all times.
                        </p>
                        <p>
                            We may change these terms at any time by sending you an SMS with details
                            of the change or notifying you of a change when you next start the
                            Licensed Product. The new terms may be displayed on-screen and you may
                            be required to read and accept them to continue your use of the Licensed
                            Product.
                        </p>
                        <p>
                            From time to time updates to the App may be issued through the Appstore
                            or to our Web Platform through our Website. Depending on the update, you
                            may not be able to use the Licensed Product until you have downloaded or
                            streamed the latest version of the Licensed Product and/or accepted any
                            new terms.
                        </p>
                        <p>
                            You will be assumed to have obtained permission from the owners of the
                            mobile telephone or handheld devices that are controlled, but not owned
                            by you to use the Licensed Product (“<strong>Devices</strong>”) and to
                            download or stream a copy of the App onto the Devices. You and they may
                            be charged by your and their service providers for internet access on
                            the Devices. You accept responsibility in accordance with the terms of
                            this EULA for the use of the Licensed Product in relation to any Device
                            or the Web Platform, whether or not it is owned by you.
                        </p>
                        <p>
                            The terms of our privacy policy from time to time, available at{' '}
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://www.bolstersystems.com"
                            >
                                www.bolstersystems.com
                            </a>{' '}
                            (“<strong>Privacy Policy</strong>”) are incorporated into this EULA by
                            reference and apply to your use of the Licensed Product. Additionally,
                            by using the Licensed Product, you acknowledge and agree that internet
                            transmissions are never completely private or secure. You understand
                            that any message or information you send using the Licensed Product may
                            be read or intercepted by others, even if there is a special notice that
                            a particular transmission is encrypted.
                        </p>
                        <p>
                            By using the Licensed Product, you consent to us collecting and using
                            technical information about the Devices and related software, hardware
                            and peripherals that are internet-based or wireless to improve our
                            products and to provide any services to you.
                        </p>
                        <p>
                            The Licensed Product may contain links to other independent third- party
                            websites (“<strong>Third-party Sites</strong>”). Third-party Sites are
                            not under our control, and we are not responsible for and do not endorse
                            their content or their privacy policies (if any). You will need to make
                            your own independent judgement regarding your interaction with any
                            Third-party Sites, including the purchase and use of any products or
                            services accessible through them.
                        </p>
                    </li>
                    <li>
                        <h4>Acceptable Use</h4>
                        <p>
                            You agree to only use the Licensed Product if you are an Authorised User
                            as allocated by the Licensee under the terms of the Overarching Licence
                            Agreement.
                        </p>
                        <p>You must:</p>
                        <ol>
                            <li>
                                not use the Licensed Product in any unlawful manner, for any
                                unlawful purpose, or in any manner inconsistent with this EULA, or
                                act fraudulently or maliciously, for example, by hacking into or
                                inserting malicious code, including viruses, or harmful data, into
                                the Licensed Product or any operating system;
                            </li>
                            <li>
                                not infringe our intellectual property rights or those of any third
                                party in relation to your use of the Licensed Product, including the
                                submission of any material (to the extent that such use is not
                                licensed by this EULA);
                            </li>
                            <li>
                                not transmit any material that is defamatory, offensive or otherwise
                                objectionable in relation to your use of the Licensed Product;
                            </li>
                            <li>
                                not use the licensed Product in a way that could damage, disable,
                                overburden, impair or compromise our systems or security or
                                interfere with other users; and
                            </li>
                            <li>
                                not collect or harvest any information or data from the Licensed
                                Product or any service or our systems or attempt to decipher any
                                transmissions to or from the servers running any Licensed Product.
                            </li>
                        </ol>
                    </li>
                    <li>
                        <h4>Bolster’s Obligations</h4>
                        <p>
                            Subject to your compliance with this EULA Bolster shall use all
                            reasonable endeavours to:
                        </p>
                        <ol>
                            <li>
                                provide the Licensed Product on the terms of this EULA in all
                                material respects;
                            </li>
                            <li>
                                provide such support to you as is reasonably necessary to allow you
                                as an Authorised User to use the Licensed Product in accordance with
                                its support policy in effect at the time the Licensed Product is
                                provided and as published on Bolster’s website{' '}
                                <a href="/">www.bolstersystems.co.uk</a>, or as otherwise notified
                                to you or the Licensee by Bolster in writing from time to time.
                                Bolster may amend the support policy in its sole and absolute
                                discretion from time to time;
                            </li>
                            <li>
                                comply with all applicable laws and regulations, including those
                                relating to anti-bribery and anti-corruption.
                            </li>
                        </ol>
                        <p>
                            Bolster does not warrant that (a) your use of the Licensed Product will
                            be uninterrupted or error-free and you acknowledge that the Licensed
                            Product may be interrupted by planned or unplanned maintenance; (b) the
                            Licensed Product and/or the information obtained by you through the
                            Licensed Product will meet your requirements.
                        </p>
                    </li>
                    <li>
                        <h4>Your Obligations</h4>
                        <p>You shall:</p>
                        <ol>
                            <li>
                                co-operate with Bolster in all matters relating to the Licensed
                                Product;
                            </li>
                            <li>
                                keep a secure password for your use of the Licensed Product and
                                shall keep your password confidential;
                            </li>
                            <li>
                                notify Bolster as soon as you become aware of any unauthorised use
                                of the Licensed Product by any person;
                            </li>
                            <li>
                                not use any information provided by Bolster or obtained by the
                                Licensee or any Authorised Users by using the Licensed Product to
                                create any software or product where the use is substantially
                                similar to that of the Licensed Product;
                            </li>
                            <li>
                                not access all or any part of the Licensed Product in order to
                                create a product or service which competes with the Licensed
                                Product;
                            </li>
                            <li>
                                not use such information in any manner which would be restricted by
                                any copyright subsisting in it;
                            </li>
                            <li>
                                not copy the Licensed Product except where such copying is
                                incidental to normal use of the Licensed Product, or where it is
                                necessary for the purpose of back-up or operational security;
                            </li>
                            <li>
                                not make alterations to, or modifications of, the whole or any part
                                of the Licensed Product, or permit the Licensed Product or any part
                                of them to be combined with, or become incorporated in, any other
                                programs;
                            </li>
                            <li>
                                not use the Licensed Product to provide any similar or other
                                services to third parties; and
                            </li>
                            <li>
                                not license, sell, rent, lease, transfer, assign, distribute,
                                display, disclose, or otherwise commercially exploit, or otherwise
                                make the Licensed Product available to any third party.
                            </li>
                        </ol>
                        <p>
                            If you breach the terms of the EULA, Bolster may, without liability to
                            you or the Licensee and not withstanding any other rights or remedies
                            available to it, disable your password, account and access to all or
                            part of the Licensed Product and shall be under no obligation to provide
                            access to the Licensed Product until such breach has been remedied and
                            you have agreed in writing to comply with the EULA.
                        </p>
                    </li>
                    <li>
                        <h4>Intellectual Property Rights and Customer Data</h4>
                        <p>
                            For the purpose of this clause Intellectual Property Rights means
                            patents, rights to inventions, copyright and related rights, trade
                            marks, business names and domain names, rights in get-up, goodwill and
                            the right to sue for passing off, rights in designs, database rights,
                            rights to use, and protect the confidentiality of, confidential
                            information (including know-how), and all other intellectual property
                            rights, in each case whether registered or unregistered and including
                            all applications and rights to apply for and be granted, renewals or
                            extensions of, and rights to claim priority from, such rights and all
                            similar or equivalent rights or forms of protection which subsist or
                            will subsist now or in the future in any part of the world (“
                            <strong>Intellectual Property Rights</strong>”).
                        </p>
                        <p>
                            You acknowledge that all Intellectual Property Rights in the Licensed
                            Products and the Content and in connection with the Licensed Product
                            belong to Bolster and that you shall have no rights in or to the
                            Licensed Product other than the right to use it in accordance with this
                            EULA.
                        </p>
                        <p>
                            You will not claim any Intellectual Property Rights in the Licensed
                            Product and/or Content.
                        </p>
                        <p>
                            You and or the Licensee (as the case may be) own all Intellectual
                            Property Rights in and to all of the Customer Data and shall have sole
                            responsibility for the legality, reliability, integrity, accuracy and
                            quality of the Customer Data.
                        </p>
                        <p>
                            You grant to Bolster a worldwide, non-exclusive, royalty free, sub-
                            licensable irrevocable licence to copy, use and modify the Customer Data
                            owned by you for the purpose of carrying out its obligations under this
                            EULA.
                        </p>
                        <p>You acknowledge and agree that:</p>
                        <ol>
                            <li>
                                any Customer Data or content uploaded to the Licensed Product by you
                                may be viewed by the Building Owner if the Building Owner utilises
                                any Licensed Product for itself. You grant to Bolster a worldwide,
                                non-exclusive, royalty free, sub-licensable, irrevocable licence to
                                allow the Building Owner to utilise any Customer Data or content
                                uploaded to the Licensed Product by you.
                            </li>
                            <li>
                                where Bolster creates a template pursuant to Your request Bolster
                                shall be entitled (and You hereby grant Bolster a worldwide,
                                non-exclusive, royalty free, sub-licensable, irrevocable licence) to
                                reuse any template created (or to create and use derivative
                                templates) with other customers of Bolster (whether as an integral
                                part of the Licensed Product or in relation to requests from other
                                customers).
                            </li>
                        </ol>
                    </li>
                    <li>
                        <h4>Limitation of Liability</h4>
                        <p>
                            This paragraph sets out the entire financial liability of Bolster
                            (including any liability for the acts or omissions of its employees,
                            agents and sub-contractors) to you:
                        </p>
                        <ol>
                            <li>arising under or in connection with this EULA;</li>
                            <li>
                                in respect of any use made by you of the Licensed Products and
                                Content or any part of them; and
                            </li>
                            <li>
                                in respect of any representation, statement or tortious act or
                                omission (including negligence) arising under or in connection with
                                this EULA.
                            </li>
                        </ol>
                        <p>Except as expressly and specifically provided in this EULA:</p>
                        <ol>
                            <li>
                                you assume sole responsibility for results obtained from the use of
                                the Licensed Products and the Content by you, and for conclusions
                                drawn from such use. Bolster shall have no liability for any damage
                                caused by errors or omissions in any information, instructions or
                                scripts provided to Bolster by you in connection with the provision
                                of the Licensed Products, or any actions taken by Bolster at your
                                direction;
                            </li>
                            <li>
                                all warranties, representations, conditions and all other terms of
                                any kind whatsoever implied by statute or common law are, to the
                                fullest extent permitted by applicable law, excluded from this EULA;
                            </li>
                            <li>
                                the Licensed Products and the Content are provided to you on an "as
                                is" basis; and
                            </li>
                            <li>
                                we will not be liable to you for your use of the Licensed Product as
                                our total liability for the provision of the Licensed Product to you
                                is to the Licensee in accordance with the Overarching Licence
                                Agreement.
                            </li>
                        </ol>
                        <p>Nothing in this Agreement excludes the liability of Bolster:</p>
                        <ol>
                            <li>for death or personal injury caused by Bolster's negligence; or</li>
                            <li>for fraud or fraudulent misrepresentation; or</li>
                            <li>any other liability that cannot be excluded or limited by law.</li>
                        </ol>
                        <p>
                            Subject to the above terms Bolster shall not be liable whether in tort
                            (including for breach of statutory duty), contract, misrepresentation,
                            restitution or otherwise for any loss of profits, loss of business,
                            depletion of goodwill and/or similar losses or loss or corruption of
                            data or information, or pure economic loss, or for any special, indirect
                            or consequential loss, costs, damages, charges or expenses however
                            arising under this agreement.
                        </p>
                    </li>
                    <li>
                        <h4>Termination</h4>
                        <p>
                            Without affecting any other right or remedy available to Bolster,
                            Bolster may terminate this EULA immediately by written notice to you if:
                        </p>
                        <ol>
                            <li>
                                if you commit a material or persistent breach of this EULA which you
                                fail to remedy (if remediable) within 14 days after the service of
                                written notice requiring you to do so;
                            </li>
                            <li>
                                the Overarching Licence Agreement expires or is terminated in
                                accordance with the terms of the Overarching Licence Agreement; and
                            </li>
                            <li>
                                you are no longer an Authorised User of the Licensed Product; and
                            </li>
                            <li>if you cease to work for the Licensee for whatever reason.</li>
                        </ol>
                        <p>On termination of this Agreement for any reason:</p>
                        <ol>
                            <li>
                                all licences granted under this EULA shall immediately terminate;
                            </li>
                            <li>
                                you shall make no further use of the Licensed Products and you must
                                immediately cease all activities authorised by this EULA;
                            </li>
                            <li>
                                if applicable you must immediately delete or remove the App from all
                                Devices, and immediately destroy all copies of the App and Content
                                then in your possession, custody or control and certify to us that
                                you have done so;
                            </li>
                            <li>
                                we may remotely access the Devices and remove the App from all of
                                them and cease providing you with access to the App and Web
                                Platform.
                            </li>
                            <li>
                                any rights, remedies, obligations or liabilities of the parties that
                                have accrued up to the date of termination, including the right to
                                claim damages in respect of any breach of the agreement which
                                existed at or before the date of termination shall not be affected
                                or prejudiced; and
                            </li>
                            <li>
                                clauses which expressly or by implication survive termination shall
                                continue in full force and effect.
                            </li>
                        </ol>
                    </li>
                    <li>
                        <h4>Force Majeure</h4>
                        <p>
                            Neither party shall be in breach of the Agreement nor liable for delay
                            in performing, or failure to perform, any of its obligations under the
                            Agreement if such delay or failure result from events, circumstances or
                            causes beyond its reasonable control. In such circumstances the affected
                            party shall be entitled to a reasonable extension of the time for
                            performing such obligations. If the period of delay or non- performance
                            continues for 3 months, the party not affected may terminate this
                            agreement by giving 1 month’s written notice to the affected party.
                        </p>
                    </li>
                    <li>
                        <h4>Notices</h4>
                        <p>
                            If you wish to contact us in writing, or if any condition in this EULA
                            requires you to give us notice in writing, you can send this to us by
                            e-mail or by prepaid post to Bolster Systems Limited at 7 The School
                            House, Second Avenue, Trafford Park, Manchester M17 1DZ and [E-MAIL
                            ADDRESS]. We will confirm receipt of this by contacting you in writing,
                            normally by e-mail.
                        </p>
                        <p>
                            If we have to contact you or give you notice in writing, we will do so
                            by e-mail or by pre-paid post to the address you provide to us in your
                            request for the Licensed Product.
                        </p>
                    </li>
                    <li>
                        <h4>Other Important Terms</h4>
                        <p>
                            We may transfer our rights and obligations under this EULA to another
                            organisation, but this will not affect your rights or our obligations
                            under this EULA.
                        </p>
                        <p>
                            You may only transfer your rights or obligations under this EULA to
                            another person if we agree in writing.
                        </p>
                        <p>
                            If we fail to insist that you perform any of your obligations under this
                            EULA, or if we do not enforce our rights against you, or if we delay in
                            doing so, that will not mean that we have waived our rights against you
                            and will not mean that you do not have to comply with those obligations.
                            If we do waive a default by you, we will only do so in writing, and that
                            will not mean that we will automatically waive any later default by you.
                        </p>
                        <p>
                            Each of the conditions of this EULA operates separately. If any court or
                            competent authority decides that any of them are unlawful or
                            unenforceable, the remaining conditions will remain in full force and
                            effect.
                        </p>
                    </li>
                    <li>
                        <h4>Governing Law and Jurisdiction</h4>
                        <p>
                            The Agreement and any dispute or claim arising out of or in connection
                            with it or its subject matter or formation (including non- contractual
                            disputes or claims) shall be governed by and construed in accordance
                            with the law of England and Wales.
                        </p>
                        <p>
                            Each party irrevocably agrees that the courts of England and Wales shall
                            have exclusive jurisdiction to settle any dispute or claim arising out
                            of or in connection with the Agreement or its subject matter or
                            formation (including non-contractual disputes or claims).
                        </p>
                    </li>
                </ol>
            </WysiwygBlock>
        </BlockContainer>
        <BlockContainer>
            <BlockHeading title="Privacy Policy"></BlockHeading>
            <WysiwygBlock>
                <h4>Introduction</h4>
                <p>
                    Bolster Systems Limited respects your privacy and is committed to protecting
                    your personal data. This privacy notice will tell you about your privacy rights
                    and how the law protects you and will inform you as to how we look after your
                    personal data when you visit or use:
                </p>
                <ul>
                    <li>
                        <p>
                            the Bolster Systems mobile application software (“<strong>App</strong>”)
                            hosted on{' '}
                            <a href="https://www.bolstersystems.com">www.bolstersystems.com</a> (“
                            <strong>Website</strong>”) once you have downloaded or streamed a copy
                            of the App onto your mobile telephone or handheld device (“
                            <strong>Device</strong>”) and any services accessible through the App;
                            and
                        </p>
                    </li>
                    <li>
                        <p>
                            our Website and any of the services accessible through the Website
                            including the web portal access (“<strong>Services</strong>”) that are
                            available on the Website or other sites of ours (“
                            <strong>Services Sites</strong>”).
                        </p>
                    </li>
                </ul>
                <p>
                    Please use the Glossary to understand the meaning of some of the terms used in
                    this privacy notice.
                </p>
                <ol>
                    <li>
                        <NavHashLink to="/auth/terms#important">
                            IMPORTANT INFORMATION AND WHO WE ARE
                        </NavHashLink>
                    </li>
                    <li>
                        <NavHashLink to="/auth/terms#data">
                            THE DATA WE COLLECT ABOUT YOU
                        </NavHashLink>
                    </li>
                    <li>
                        <NavHashLink to="/auth/terms#personalCollected">
                            HOW IS YOUR PERSONAL DATA COLLECTED
                        </NavHashLink>
                    </li>
                    <li>
                        <NavHashLink to="/auth/terms#personalUse">
                            HOW WE USE YOUR PERSONAL DATA
                        </NavHashLink>
                    </li>
                    <li>
                        <NavHashLink to="/auth/terms#disclosure">
                            DISCLOSURES OF YOUR PERSONAL DATA
                        </NavHashLink>
                    </li>
                    <li>
                        <NavHashLink to="/auth/terms#transfers">
                            INTERNATIONAL TRANSFERS
                        </NavHashLink>
                    </li>
                    <li>
                        <NavHashLink to="/auth/terms#security">DATA SECURITY</NavHashLink>
                    </li>
                    <li>
                        <NavHashLink to="/auth/terms#retention">DATA RETENTION</NavHashLink>
                    </li>
                    <li>
                        <NavHashLink to="/auth/terms#rights">YOUR LEGAL RIGHTS</NavHashLink>
                    </li>
                    <li>
                        <NavHashLink to="/auth/terms#glossary">GLOSSARY</NavHashLink>
                    </li>
                </ol>
                <ol>
                    <li id="important">
                        <h4>Important information and who we are</h4>
                        <h4>Purpose of this privacy notice</h4>
                        <p>
                            This privacy notice aims to give you information on how Bolster Systems
                            Limited collects and processes your personal data through your use of
                            the Website, App or Service Sites including any data you may provide
                            through the Website, App or Service Sites when you sign up to our
                            newsletter, request a demo or purchase a service from us.
                        </p>
                        <p>
                            The Website, App or Service Sites are not intended for children and we
                            do not knowingly collect data relating to children.
                        </p>
                        <p>
                            It is important that you read this privacy notice together with any
                            other privacy notice or fair processing notice we may provide on
                            specific occasions when we are collecting or processing personal data
                            about you so that you are fully aware of how and why we are using your
                            data. This privacy notice supplements the other notices and is not
                            intended to override them.
                        </p>
                        <h4>Controller</h4>
                        <p>
                            Bolster Systems Limited is the controller and responsible for your
                            personal data ("we", "us" or "our").
                        </p>
                        <p>
                            We have appointed a data privacy manager who is responsible for
                            overseeing questions in relation to this privacy notice. If you have any
                            questions about this privacy notice, including any requests to exercise
                            your legal rights, please contact the data privacy manager using the
                            details set out below.
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
                            Postal address: 7 The Schoolhouse Second Avenue, Trafford Park,
                            Manchester, Greater Manchester M17 1DZ
                        </p>
                        <p>
                            You have the right to make a complaint at any time to the Information
                            Commissioner's Office (ICO), the UK supervisory authority for data
                            protection issues{' '}
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://www.ico.org.uk"
                            >
                                (www.ico.org.uk)
                            </a>
                            . We would, however, appreciate the chance to deal with your concerns
                            before you approach the ICO so please contact us in the first instance.
                        </p>
                        <h4>Changes to the privacy notice and your duty to inform us of changes</h4>
                        <p>
                            This version was last updated on [11/04/2019] and historic versions can
                            be obtained by contacting us.
                        </p>
                        <p>
                            It is important that the personal data we hold about you is accurate and
                            current. Please keep us informed if your personal data changes during
                            your relationship with us.
                        </p>
                        <h4>Third-party links</h4>
                        <p>
                            This website may include links to third-party websites, plug-ins and
                            applications. Clicking on those links or enabling those connections may
                            allow third parties to collect or share data about you. We do not
                            control these third-party websites and are not responsible for their
                            privacy statements. When you leave our website, we encourage you to read
                            the privacy notice of every website you visit.
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
                                    <strong>Financial Data</strong> includes bank account and
                                    payment card details.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>Transaction Data</strong> includes details about
                                    payments to and from you and other details of products and
                                    services you have purchased from us.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>Technical Data</strong> includes internet protocol (IP)
                                    address, your login data, browser type and version, time zone
                                    setting and location, browser plug-in types and versions,
                                    operating system and platform and other technology on the
                                    devices you use to access this website.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>Profile Data</strong> includes your username and
                                    password, purchases or orders made by you, your interests,
                                    preferences, feedback and survey responses.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>Usage Data</strong> includes information about how you
                                    use our Website, App, Service Sites, products and services.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>Marketing and Communications Data</strong> includes your
                                    preferences in receiving marketing from us and our third parties
                                    and your communication preferences.
                                </p>
                            </li>
                        </ul>
                        <p>
                            We also collect, use and share <strong>Aggregated Data</strong> such as
                            statistical or demographic data for any purpose. Aggregated Data may be
                            derived from your personal data but is not considered personal data in
                            law as this data does <strong>not</strong> directly or indirectly reveal
                            your identity. For example, we may aggregate your Usage Data to
                            calculate the percentage of users accessing a specific website feature.
                            However, if we combine or connect Aggregated Data with your personal
                            data so that it can directly or indirectly identify you, we treat the
                            combined data as personal data which will be used in accordance with
                            this privacy notice.
                        </p>
                        <p>
                            We do not collect any{' '}
                            <strong>Special Categories of Personal Data</strong> about you (this
                            includes details about your race or ethnicity, religious or
                            philosophical beliefs, sex life, sexual orientation, political opinions,
                            trade union membership, information about your health and genetic and
                            biometric data). Nor do we collect any information about criminal
                            convictions and offences.
                        </p>
                        <h4>If you fail to provide personal data</h4>
                        <p>
                            Where we need to collect personal data by law, or under the terms of a
                            contract we have with you and you fail to provide that data when
                            requested, we may not be able to perform the contract we have or are
                            trying to enter into with you (for example, to provide you with goods or
                            services). In this case, we may have to cancel a product or service you
                            have with us, but we will notify you if this is the case at the time.
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
                                    <strong>Direct interactions</strong>. You may give us your
                                    Identity, Contact [and Financial Data] by filling in forms or by
                                    corresponding with us by post, phone, email or otherwise. This
                                    includes personal data you provide when you:
                                </p>
                                <ul>
                                    <li>
                                        <p> apply for our services;</p>
                                    </li>
                                    <li>
                                        <p>request a demo; </p>
                                    </li>
                                    <li>
                                        <p>
                                            create an account on our Website, App or Service Sites;
                                        </p>
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
                                    interact with our website, we may automatically collect
                                    Technical Data about your equipment, browsing actions and
                                    patterns. We collect this personal data by using cookies, server
                                    logs and other similar technologies. We may also receive
                                    Technical Data about you if you visit other websites employing
                                    our cookies.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>Third parties or publicly available sources</strong>. We
                                    may receive personal data about you from various third parties
                                    and public sources as set out below:
                                </p>
                                <ul>
                                    <li>
                                        <p>Technical Data from the following parties:</p>
                                        <ol>
                                            <li>
                                                analytics providers such as Google based outside the
                                                EU;
                                            </li>
                                            <li>
                                                advertising networks [such as [NAME] based [inside{' '}
                                                <strong>OR</strong> outside] the EU]; and
                                            </li>
                                            <li>
                                                search information providers [such as [NAME] based
                                                [inside <strong>OR</strong> outside] the EU].
                                            </li>
                                        </ol>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <p>
                                    Contact, Financial and Transaction Data from providers of
                                    technical, payment and delivery services [such as [NAME] based
                                    [inside <strong>OR</strong> outside] the EU].
                                </p>
                            </li>
                            <li>
                                <p>
                                    Identity and Contact Data from publicly availably sources such
                                    as Companies House and the Electoral Register based inside the
                                    EU.
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
                                Where we need to perform the contract we are about to enter into or
                                have entered into with you.
                            </li>
                            <li>
                                Where it is necessary for our legitimate interests (or those of a
                                third party) and your interests and fundamental rights do not
                                override those interests.
                            </li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ol>
                        <p>
                            Generally we do not rely on consent as a legal basis for processing your
                            personal data other than in relation to sending third party direct
                            marketing communications to you via email or text message. You have the
                            right to withdraw consent to marketing at any time by contacting us.
                        </p>
                        <h4>Purposes for which we will use your personal data</h4>
                        <p>
                            We have set out below, in a table format, a description of all the ways
                            we plan to use your personal data, and which of the legal bases we rely
                            on to do so. We have also identified what our legitimate interests are
                            where appropriate.
                        </p>
                        <p>
                            Note that we may process your personal data for more than one lawful
                            ground depending on the specific purpose for which we are using your
                            data. Please contact us if you need details about the specific legal
                            ground we are relying on to process your personal data where more than
                            one ground has been set out in the table below.
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
                                        (b) Necessary for our legitimate interests (to recover debts
                                        due to us)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To manage our relationship with you which will include:{' '}
                                        <br />
                                        (a) Notifying you about changes to our terms or privacy
                                        policy <br />
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
                                        (c) Necessary for our legitimate interests (to keep our
                                        records updated and to study how customers use our
                                        products/services)
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
                                        customers use our products/services, to develop them and
                                        grow our business)
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
                                        business, provision of administration and IT services,
                                        network security, to prevent fraud and in the context of a
                                        business reorganisation or group restructuring exercise)
                                        <br />
                                        (b) Necessary to comply with a legal obligation
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To deliver relevant website content and advertisements to
                                        you and measure or understand the effectiveness of the
                                        advertising we serve to you
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
                                        Necessary for our legitimate interests (to study how
                                        customers use our products/services, to develop them, to
                                        grow our business and to inform our marketing strategy)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To use data analytics to improve our website,
                                        products/services, marketing, customer relationships and
                                        experiences
                                    </td>
                                    <td>
                                        (a) Technical <br />
                                        (b) Usage
                                    </td>
                                    <td>
                                        Necessary for our legitimate interests (to define types of
                                        customers for our products and services, to keep our website
                                        updated and relevant, to develop our business and to inform
                                        our marketing strategy)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To make suggestions and recommendations to you about goods
                                        or services that may be of interest to you
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
                            We strive to provide you with choices regarding certain personal data
                            uses, particularly around marketing and advertising.
                        </p>
                        <h4>Promotional offers from us</h4>
                        <p>
                            We may use your Identity, Contact, Technical, Usage and Profile Data to
                            form a view on what we think you may want or need, or what may be of
                            interest to you. This is how we decide which products, services and
                            offers may be relevant for you (we call this marketing).
                        </p>
                        <p>
                            You will receive marketing communications from us if you have requested
                            information from us or purchased goods or services from us and, in each
                            case, you have not opted out of receiving that marketing.
                        </p>
                        <h4>Third-party marketing</h4>
                        <p>
                            We will get your express opt-in consent before we share your personal
                            data with third party for marketing purposes.
                        </p>
                        <h4>Opting out</h4>
                        <p>
                            You can ask us or third parties to stop sending you marketing messages
                            at any time by following the opt-out links on any marketing message sent
                            to you or by contacting us at any time.
                        </p>
                        <p>
                            Where you opt out of receiving these marketing messages, this will not
                            apply to personal data provided to us as a result of a product/service
                            purchase, warranty registration, product/service experience or other
                            transactions.
                        </p>
                        <h4>Cookies</h4>
                        <p>
                            Our Website, Services Sites and App use "cookies", which are small text
                            files that are stored on your computer and can be retrieved by us to
                            assist us in customising your experience with our online services. These
                            cookies allow us to distinguish you from other users of our services and
                            help us improve our Services Sites and App. The information saved
                            supports the functionality of the Website, Services Sites and App.
                            During some processes, data is temporarily stored as you move from step
                            to step. This improves your experience, and data is only stored for as
                            long as is necessary for you to complete the process. All other cookies
                            will expire <strong>in 7 days</strong>.
                        </p>
                        <p>
                            You can set your browser to refuse all or some browser cookies, or to
                            alert you when websites set or access cookies. If you disable or refuse
                            cookies, please note that some parts of this website may become
                            inaccessible or not function properly.
                        </p>
                        <h4>Change of purpose</h4>
                        <p>
                            We will only use your personal data for the purposes for which we
                            collected it, unless we reasonably consider that we need to use it for
                            another reason and that reason is compatible with the original purpose.
                            If you wish to get an explanation as to how the processing for the new
                            purpose is compatible with the original purpose, please contact us.
                        </p>
                        <p>
                            If we need to use your personal data for an unrelated purpose, we will
                            notify you and we will explain the legal basis which allows us to do so.
                        </p>
                        <p>
                            Please note that we may process your personal data without your
                            knowledge or consent, in compliance with the above rules, where this is
                            required or permitted by law.
                        </p>
                    </li>
                    <li id="disclosure">
                        <h4>Disclosures of your personal data</h4>
                        <p>
                            We may have to share your personal data with the parties set out below
                            for the purposes set out in the table in paragraph 4 above.
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
                                    parts of our business or our assets. Alternatively, we may seek
                                    to acquire other businesses or merge with them. If a change
                                    happens to our business, then the new owners may use your
                                    personal data in the same way as set out in this privacy notice.{' '}
                                </p>
                            </li>
                        </ul>
                        <p>
                            <p>
                                We require all third parties to respect the security of your
                                personal data and to treat it in accordance with the law. We do not
                                allow our third-party service providers to use your personal data
                                for their own purposes and only permit them to process your personal
                                data for specified purposes and in accordance with our instructions.
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
                            We have put in place appropriate security measures to prevent your
                            personal data from being accidentally lost, used or accessed in an
                            unauthorised way, altered or disclosed. In addition, we limit access to
                            your personal data to those employees, agents, contractors and other
                            third parties who have a business need to know. They will only process
                            your personal data on our instructions and they are subject to a duty of
                            confidentiality.
                        </p>
                        <p>
                            We have put in place procedures to deal with any suspected personal data
                            breach and will notify you and any applicable regulator of a breach
                            where we are legally required to do so.
                        </p>
                    </li>
                    <li id="retention">
                        <h4>Data retention</h4>
                        <h4>How long will you use my personal data for?</h4>
                        <p>
                            We will only retain your personal data for as long as necessary to
                            fulfil the purposes we collected it for, including for the purposes of
                            satisfying any legal, accounting, or reporting requirements.
                        </p>
                        <p>
                            To determine the appropriate retention period for personal data, we
                            consider the amount, nature, and sensitivity of the personal data, the
                            potential risk of harm from unauthorised use or disclosure of your
                            personal data, the purposes for which we process your personal data and
                            whether we can achieve those purposes through other means, and the
                            applicable legal requirements.
                        </p>
                        <p>
                            Details of retention periods for different aspects of your personal data
                            are available in our retention policy which you can request from us by
                            contacting us.
                        </p>
                        <p>
                            In some circumstances you can ask us to delete your data: see Request
                            erasure below for further information.
                        </p>
                        <p>
                            In some circumstances we may anonymise your personal data (so that it
                            can no longer be associated with you) for research or statistical
                            purposes in which case we may use this information indefinitely without
                            further notice to you.
                        </p>
                    </li>
                    <li id="rights">
                        <h4>Your legal rights</h4>
                        <p>
                            Under certain circumstances, you have rights under data protection laws
                            in relation to your personal data. Please click on the links below to
                            find out more about these rights:
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
                            If you wish to exercise any of the rights set out above, please contact
                            us.
                        </p>
                        <h4>No fee usually required</h4>
                        <p>
                            You will not have to pay a fee to access your personal data (or to
                            exercise any of the other rights). However, we may charge a reasonable
                            fee if your request is clearly unfounded, repetitive or excessive.
                            Alternatively, we may refuse to comply with your request in these
                            circumstances.
                        </p>
                        <h4>What we may need from you</h4>
                        <p>
                            We may need to request specific information from you to help us confirm
                            your identity and ensure your right to access your personal data (or to
                            exercise any of your other rights). This is a security measure to ensure
                            that personal data is not disclosed to any person who has no right to
                            receive it. We may also contact you to ask you for further information
                            in relation to your request to speed up our response.
                        </p>
                        <h4>Time limit to respond</h4>
                        <p>
                            We try to respond to all legitimate requests within one month.
                            Occasionally it may take us longer than a month if your request is
                            particularly complex or you have made a number of requests. In this
                            case, we will notify you and keep you updated.
                        </p>
                    </li>
                    <li id="glossary">
                        <h4>Glossary</h4>
                        <h4>LAWFUL BASIS</h4>
                        <p>
                            <strong>Legitimate Interest</strong> means the interest of our business
                            in conducting and managing our business to enable us to give you the
                            best service/product and the best and most secure experience. We make
                            sure we consider and balance any potential impact on you (both positive
                            and negative) and your rights before we process your personal data for
                            our legitimate interests. We do not use your personal data for
                            activities where our interests are overridden by the impact on you
                            (unless we have your consent or are otherwise required or permitted to
                            by law). You can obtain further information about how we assess our
                            legitimate interests against any potential impact on you in respect of
                            specific activities by contacting us{' '}
                            <a href="mailto:info@bolstersystems.com">info@bolstersystems.com</a>
                        </p>
                        <p>
                            <strong>Performance of Contract</strong> means processing your data
                            where it is necessary for the performance of a contract to which you are
                            a party or to take steps at your request before entering into such a
                            contract.
                        </p>
                        <p>
                            <strong>Comply with a legal or regulatory obligation</strong> means
                            processing your personal data where it is necessary for compliance with
                            a legal or regulatory obligation that we are subject to.
                        </p>
                        <h4>THIRD PARTIES</h4>
                        <h4>External Third Parties</h4>
                        <ul>
                            <li>
                                <p>
                                    {' '}
                                    Bolster Systems using Amazon Web Services for processing data{' '}
                                </p>
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
                                    processors based in the United Kingdom who may require reporting
                                    of processing activities in certain circumstances.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Instant VAT Number (256 bit encryption) Validation & EU VAT
                                    Rates API by VATLAYER Amazon Europe Core S.A.R.L{' '}
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
                            <strong>Request access</strong> to your personal data (commonly known as
                            a "data subject access request"). This enables you to receive a copy of
                            the personal data we hold about you and to check that we are lawfully
                            processing it.
                        </p>
                        <p>
                            <strong>Request correction</strong> of the personal data that we hold
                            about you. This enables you to have any incomplete or inaccurate data we
                            hold about you corrected, though we may need to verify the accuracy of
                            the new data you provide to us.
                        </p>
                        <p>
                            <strong>Request erasure</strong> of your personal data. This enables you
                            to ask us to delete or remove personal data where there is no good
                            reason for us continuing to process it. You also have the right to ask
                            us to delete or remove your personal data where you have successfully
                            exercised your right to object to processing (see below), where we may
                            have processed your information unlawfully or where we are required to
                            erase your personal data to comply with local law. Note, however, that
                            we may not always be able to comply with your request of erasure for
                            specific legal reasons which will be notified to you, if applicable, at
                            the time of your request.
                        </p>
                        <p>
                            <strong>Object to processing</strong> of your personal data where we are
                            relying on a legitimate interest (or those of a third party) and there
                            is something about your particular situation which makes you want to
                            object to processing on this ground as you feel it impacts on your
                            fundamental rights and freedoms. You also have the right to object where
                            we are processing your personal data for direct marketing purposes. In
                            some cases, we may demonstrate that we have compelling legitimate
                            grounds to process your information which override your rights and
                            freedoms.
                        </p>
                        <p>
                            <strong>Request restriction of processing</strong> of your personal
                            data. This enables you to ask us to suspend the processing of your
                            personal data in the following scenarios: (a) if you want us to
                            establish the data's accuracy; (b) where our use of the data is unlawful
                            but you do not want us to erase it; (c) where you need us to hold the
                            data even if we no longer require it as you need it to establish,
                            exercise or defend legal claims; or (d) you have objected to our use of
                            your data but we need to verify whether we have overriding legitimate
                            grounds to use it.
                        </p>
                        <p>
                            <strong>Request the transfer</strong> of your personal data to you or to
                            a third party. We will provide to you, or a third party you have chosen,
                            your personal data in a structured, commonly used, machine-readable
                            format. Note that this right only applies to automated information which
                            you initially provided consent for us to use or where we used the
                            information to perform a contract with you.
                        </p>
                        <p>
                            <strong>Withdraw consent at any time</strong> where we are relying on
                            consent to process your personal data. However, this will not affect the
                            lawfulness of any processing carried out before you withdraw your
                            consent. If you withdraw your consent, we may not be able to provide
                            certain products or services to you. We will advise you if this is the
                            case at the time you withdraw your consent.
                        </p>
                    </li>
                </ol>
            </WysiwygBlock>
        </BlockContainer>
    </>
);

export default Terms;
