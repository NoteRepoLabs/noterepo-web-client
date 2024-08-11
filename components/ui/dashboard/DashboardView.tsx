'use client';

import { UserInterface } from '@/types/userTypes';
import { SearchNormal1 } from 'iconsax-react';
import Image from 'next/image';
import InputField from '../InputField';
import { useState } from 'react';
import IconButton from './IconButton';
import CreateRepoDialog from '../repo/CreateRepoDialog';

export interface DashboardProps {
    user: UserInterface;
}

/** Dashboard view component */
export default function DashboardView() {
    // Page state
    const [search, setSearch] = useState('');
    const [showCreateDialog, setShowCreateDialog] = useState(false);

    return (
        <>
            {showCreateDialog && (
                <CreateRepoDialog onClick={() => setShowCreateDialog(false)} />
            )}
            <section className="w-full mt-[72px] py-8 h-full flex flex-col items-center">
                <h2 className="font-bold text-3xl text-center mb-12">
                    Your Repositories
                </h2>
                <div className="flex items-center w-full max-w-[1200px] px-4 gap-2">
                    <div className="flex-grow">
                        {/* SEARCH BOX */}
                        <InputField
                            name={'search'}
                            type={'text'}
                            id={'search-field'}
                            value={search}
                            placeholder={'Search your repos'}
                            required={false}
                            iconPos="left"
                            noMargin={true}
                            icon={
                                <SearchNormal1
                                    size="24"
                                    color="#A1A7B5"
                                    variant="TwoTone"
                                    className="absolute left-[16px] top-[50%] transform -translate-y-1/2 cursor-pointer"
                                />
                            }
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setSearch(e.target.value);
                            }}
                            style={{
                                paddingRight: '16px',
                                paddingLeft: '48px',
                                width: '100%',
                                marginBottom: '0px',
                            }}
                        />
                    </div>

                    {/* NEW REPO BUTTON */}
                    <IconButton
                        text="New Repo"
                        style={{ padding: '14px 8px' }}
                        onClick={() => setShowCreateDialog(true)}
                    />
                </div>
                {/* CLIPBOARD */}
                <div className="mt-12 flex flex-col justify-center">
                    <div className="flex justify-center ml-8">
                        <Image
                            src={'/img/EmptyClip.svg'}
                            alt={'empty'}
                            width={160}
                            height={200}
                            priority={true}
                        />
                    </div>
                    <h4 className="font-medium text-2xl mt-8 text-neutral-300 text-center">
                        Nothing Here Yet.
                    </h4>
                </div>
            </section>
        </>
    );
}
