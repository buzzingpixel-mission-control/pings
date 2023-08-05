import React, { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    EditorShellFloating, EditorShellForm,
    FormInput, FormInputProjects,
    FormInputText,
} from 'buzzingpixel-mission-control-frontend-core';
import { Ping } from '../Pings';
import PingFormValues from '../PingFormValues';
import { useEditPingMutation } from '../PingData';

const EditPingOverlay = (
    {
        item,
        setIsOpen,
    }: {
        item: Ping;
        setIsOpen: Dispatch<SetStateAction<boolean>>;
    },
) => {
    const [
        isSaving,
        setIsSaving,
    ] = useState<boolean>(false);

    const {
        getValues,
        register,
        setValue,
    } = useForm<PingFormValues>({
        defaultValues: {
            title: item.title,
            expect_every: item.expectEvery,
            warn_after: item.warnAfter,
            project_id: item.projectId,
        },
    });

    const inputs = [
        {
            title: 'Title',
            name: 'title',
            placeholder: 'Example Ping',
            required: true,
            renderInput: FormInputText,
            setValue,
        },
        {
            title: 'Expect Every (minutes)',
            name: 'expect_every',
            placeholder: '1440',
            required: true,
            renderInput: FormInputText,
            setValue,
        },
        {
            title: 'Warn After (minutes)',
            name: 'warn_after',
            placeholder: '1500',
            required: true,
            renderInput: FormInputText,
            setValue,
        },
        {
            title: 'Project',
            name: 'project_id',
            renderInput: FormInputProjects,
            initialValue: item.projectId,
            setValue,
        },
    ] as Array<FormInput>;

    const [
        errorMessage,
        setErrorMessage,
    ] = useState<string>('');

    const mutation = useEditPingMutation(
        item.id,
        item.slug,
    );

    const saveHandler: SubmitHandler<PingFormValues> = (
        data,
    ) => {
        setIsSaving(true);

        if (errorMessage) {
            setErrorMessage('');
        }

        mutation.mutate(data, {
            onSuccess: () => setIsOpen(false),
            onError: (error) => {
                setErrorMessage(error.message || 'Unable to add monitored url');

                setIsSaving(false);
            },
        });
    };

    return (
        <EditorShellFloating
            title="Add New Monitored URL"
            isSaving={isSaving}
            submitButtonText="Submit"
            errorMessage={errorMessage}
            saveHandler={() => {
                saveHandler(getValues());
            }}
            setEditorIsOpen={setIsOpen}
        >
            <EditorShellForm
                inputs={inputs}
                register={register}
                onSubmit={() => {
                    saveHandler(getValues());
                }}
            />
        </EditorShellFloating>
    );
};

export default EditPingOverlay;
