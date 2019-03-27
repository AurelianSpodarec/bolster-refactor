import React from 'react';
import moment from 'moment';

const EnquiryDetails = ({
    enquiry: { companyName, name, createdOn, contactNumber, email, message }
}) => {
    return (
        <>
            <div className="size-lg-6">
                {!!name && <p className="size-lg-12">Name: {name}</p>}
                {!!companyName && (
                    <p className="size-lg-12">Company: {companyName}</p>
                )}
                {!!email && <p className="size-lg-12">Email: {email}</p>}
                {!!contactNumber && (
                    <p className="size-lg-12">
                        Contact Number: {contactNumber}
                    </p>
                )}
                {!!createdOn && (
                    <p className="size-lg-12">
                        Sent On:{' '}
                        {moment(createdOn).format('DD-MM-YYYY hh:mm a')}
                    </p>
                )}
            </div>
            <div className="size-lg-12">
                {!!message && (
                    <p>
                        {message} ##Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Voluptate a cumque culpa voluptates
                        quam sed, quasi porro molestias optio necessitatibus,
                        nostrum dolorem accusantium. Dolorem quidem ipsum esse
                        deleniti neque deserunt. Nisi eos consectetur impedit
                        magni ex at dolorem odio expedita maiores facilis
                        recusandae, nesciunt delectus fuga atque suscipit
                        repellat adipisci aspernatur consequuntur assumenda
                        cumque ipsam animi. Dolorum laboriosam aperiam libero
                        at, sint vel dolor esse quasi deleniti amet natus id
                        pariatur. Cum culpa, laborum labore fugit quae aut
                        temporibus. Voluptates ex nam, unde expedita dolore
                        officiis aut at tempora nihil consequatur
                        necessitatibus, perspiciatis autem fuga, qui deleniti
                        dolores quos dicta vitae debitis. Dolorem corporis
                        recusandae veniam! Laudantium ipsum, molestias eos
                        distinctio nemo earum temporibus quae facere officiis
                        quia voluptates quas aspernatur similique. Corporis,
                        autem. Temporibus officia autem quasi, accusantium ipsa
                        molestiae. Ab laudantium, odit tenetur culpa consectetur
                        explicabo maiores autem, eos nobis quibusdam eligendi
                        voluptatum modi praesentium reprehenderit ducimus
                        consequuntur debitis odio amet magnam quod id! Accusamus
                        veniam ipsum ullam quasi, sequi vero culpa cumque,
                        aliquam laboriosam, ipsam earum blanditiis eius.
                        Corporis, totam? Nesciunt sunt perferendis veniam
                        laborum! Reprehenderit minus itaque sunt unde nemo vel
                        laudantium amet, sequi, veritatis ducimus natus qui quis
                        excepturi architecto distinctio soluta. Amet quae
                        distinctio animi inventore modi ullam dolores optio
                        molestias excepturi recusandae. Dolorem, error vitae
                        fugiat blanditiis eum similique commodi quis, tempora
                        repellat cumque provident hic velit facere enim animi
                        dignissimos eius ullam, dicta voluptates cupiditate.
                        Nostrum, dolores nam provident aliquid optio accusamus
                        quod suscipit quas commodi ipsa alias animi illo dolor
                        quaerat doloremque nisi maxime asperiores dolorem
                        aspernatur delectus debitis iusto dolorum a. Nemo,
                        harum. Quae magnam, omnis atque inventore voluptatem
                        tenetur laborum sunt autem.##
                    </p>
                )}
            </div>
        </>
    );
};

export default EnquiryDetails;
