import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';
import ToggleSelect from 'components/shared/generic/form/presentational/ToggleSelect';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import React from 'react';
import useStep2Options from './hooks/useStep2Options';

const CreatePinTaskStep2 = ({ handleChange, drawing, service, template, pins }) => {
    const {
        isFetching,
        fetchError,
        serviceOptions,
        templateOptions,
        pinOptions,
        pinOptionsFilter,
    } = useStep2Options(handleChange, drawing, service, template);

    return (
        <>
            {isFetching && <Loading />}
            {fetchError && !isFetching && <p className="fetch-error">{fetchError}</p>}
            <div className="size-lg-12 step-block">
                <Field name="service" sizeClasses="size-lg-12">
                    <Select
                        name="service"
                        value={service}
                        onChange={handleChange}
                        options={serviceOptions}
                        disabled={isFetching || fetchError}
                        search
                    />
                </Field>
                <Field name="template" sizeClasses="size-lg-12">
                    <Select
                        name="template"
                        value={template}
                        onChange={handleChange}
                        options={templateOptions}
                        disabled={isFetching || fetchError || service == null}
                        search
                    />
                </Field>
                <Field name="pins" sizeClasses="size-lg-12">
                    <p>Use the boxes below to select the pins relevant to this task.</p>
                    <p>Pins can be filtered by selecting a Service and a Template.</p>
                    <br />
                    <ToggleSelect
                        name="pins"
                        handleChange={handleChange}
                        options={pinOptions}
                        idleOptionsFilter={pinOptionsFilter}
                        selected={pins}
                        required
                    />
                </Field>
            </div>
        </>
    );
};

export default CreatePinTaskStep2;
