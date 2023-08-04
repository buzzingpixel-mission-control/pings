import React, { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    EditorShellForm,
    EditorShellInline,
    FormInput,
    FormInputProjects,
    FormInputText,
} from 'buzzingpixel-mission-control-frontend-core';
import { Ping } from './Pings';
import PingFormValues from './PingFormValues';
import { useEditPingMutation } from './PingData';

const PingListItemEditor = (
    {
        item,
        setEditorIsOpen,
    }: {
        item: Ping;
        setEditorIsOpen: Dispatch<SetStateAction<boolean>>;
    },
) => {
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

    const [
        isSaving,
        setIsSaving,
    ] = useState<boolean>(false);

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
            onSuccess: () => setEditorIsOpen(false),
            onError: (error) => {
                setErrorMessage(error.message || 'Unable to edit ping');

                setIsSaving(false);
            },
        });
    };

    return (
        <div style={{ paddingBottom: '1.5rem' }}>
            <div
                className="border border-gray-300 rounded-md shadow-md mx-auto p-4"
                style={{ maxWidth: '600px' }}
            >
                <EditorShellInline
                    isSaving={isSaving}
                    setEditorIsOpen={setEditorIsOpen}
                    errorMessage={errorMessage}
                    saveHandler={() => {
                        saveHandler(getValues());
                    }}
                >
                    <EditorShellForm
                        inputs={inputs}
                        register={register}
                        onSubmit={() => {
                            saveHandler(getValues());
                        }}
                    />
                </EditorShellInline>
            </div>
        </div>
    );
};

export default PingListItemEditor;
