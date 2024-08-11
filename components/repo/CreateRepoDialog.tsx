'use client';

import { ChangeEvent, useState } from 'react';
import InputField from '../ui/InputField';
import FilledButton from '../ui/FilledButton';
import { CloseCircle } from 'iconsax-react';

/* Create Repo Dialog Props */
interface CreateRepoDialogProps {
    onClick: () => void;
}

/* Create Repo Dialog Component */
export default function CreateRepoDialog(props: CreateRepoDialogProps) {
    const [repoName, setRepoName] = useState('');
    const [repoDescription, setRepoDescription] = useState('');

    return (
        <section className="w-full h-screen grid place-items-center fixed top-0 left-0 z-[995]">
            <div className="block fixed inset-0 bg-neutral-900 bg-opacity-50 backdrop-blur-sm"></div>
            <section className="w-[90%] mt-12 max-w-lg px-4 py-8 bg-neutral-100 border-[1px] border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 z-[1000] flex flex-col justify-center rounded-xl items-center text-center shadow-lg relative">
                <CloseCircle
                    size="24"
                    variant="Bold"
                    className="text-neutral-300 cursor-pointer absolute top-4 left-4 transition-colors hover:text-neutral-100"
                    onClick={props.onClick}
                />
                <h3 className="text-2xl font-bold text-center dark:text-neutral-100 text-neutral-700">
                    Create Your Repo
                </h3>
                <p className="mt-2 text-neutral-500 dark:text-neutral-300">
                    Once you&apos;ve created a repo, you can start uploading
                    files in them.
                </p>
                <form className="my-4 w-full">
                    <InputField
                        name="repo-name"
                        type="text"
                        id="repo-name"
                        value={repoName}
                        placeholder="Name"
                        required={true}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setRepoName(e.target.value);
                        }}
                    />
                    <InputField
                        name="repo-desc"
                        type="text"
                        id="repo-desc"
                        value={repoDescription}
                        placeholder="Description"
                        required={true}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setRepoDescription(e.target.value);
                        }}
                    />
                    <FilledButton
                        text="Create"
                        onClick={(e) => {
                            alert('Not Yet Implemented');
                        }}
                    />
                </form>
            </section>
        </section>
    );
}
