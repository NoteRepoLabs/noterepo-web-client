/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import clsx from 'clsx';
import FilledButton from '../ui/FilledButton';
import Modal from '../ui/Modal';
import { useState } from 'react';
import InputField from '../ui/InputField';

interface DeleteUserAccountDialogProps {
    onConfirmAction: () => void;
    onCancelAction: () => void;
}

export default function DeleteUserAccountDialog(
    props: DeleteUserAccountDialogProps
) {
    const defaultConfirmationText = 'I want to delete my account';
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [confirmationText, setConfirmationText] = useState('');

    return (
        <>
            <Modal>
                <h3 className="text-2xl font-bold text-center dark:text-neutral-100 text-neutral-700">
                    Delete My Account
                </h3>
                <p className="my-2 text-neutral-500 dark:text-neutral-300">
                    To proceed with this action, type in the confirmation box: &quot;
                    <b>{defaultConfirmationText}</b>&quot;.
                </p>
                <InputField
                    name="confirmation-dialog"
                    type="text"
                    id="confirmation-dialog-box"
                    value={confirmationText}
                    placeholder={defaultConfirmationText}
                    required={true}
                    onChange={(e) => {
                        setConfirmationText(e.target.value);
                        setIsConfirmed(
                            e.target.value == defaultConfirmationText
                        );
                    }}
                    className="mt-2 !mb-0 !py-2 !rounded-md"
                />
                <FilledButton
                    text="Delete My Account"
                    onClick={isConfirmed ? props.onConfirmAction : () => {}}
                    className={clsx(
                        'w-full m-0 md:ml-0 mt-2 !py-2 !rounded-md',
                        !isConfirmed ? '!bg-opacity-10 opacity-50' : ''
                    )}
                    danger={true}
                    disabled={!isConfirmed}
                />
                <FilledButton
                    text="No, Keep It"
                    onClick={props.onCancelAction}
                    className="w-full m-0 md:ml-0 mt-2 !py-2 !rounded-md mb-4"
                />
            </Modal>
        </>
    );
}
