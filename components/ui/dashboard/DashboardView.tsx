'use client';

import { UserInterface } from '@/types/userTypes';
import { SearchNormal1 } from 'iconsax-react';
import Image from 'next/image';
import InputField from '../InputField';
import { useState } from 'react';

export interface DashboardProps {
    user: UserInterface;
}

/** Dashboard view component */
export default function DashboardView() {
    // Page state
    const [search, setSearch] = useState('');

    return (
        <>
            <section className="w-full mt-[72px] py-8 h-full flex flex-col items-center">
                <h2 className="font-extrabold text-3xl text-center mb-12">
                    Your Repos
                </h2>
                <InputField
                    name={'search'}
                    type={'text'}
                    id={'search-field'}
                    value={search}
                    placeholder={'Search your repos'}
                    required={false}
                    icon={
                        <SearchNormal1
                            size="24"
                            color="#A1A7B5"
                            variant="TwoTone"
                            className="absolute left-[16px] top-[50%] transform -translate-y-1/2 cursor-pointer"
                        />
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearch(e.target.value);
                    }}
                    style={{
                        paddingRight: '16px',
                        paddingLeft: '48px',
                        width: '100%',
                        minWidth: '100%',
                    }}
                />
                <div className="my-[24px] flex flex-col justify-center">
                    <div className="flex justify-center">
                        <Image
                            src={'/img/EmptyClip.svg'}
                            alt={'empty'}
                            width={160}
                            height={200}
                        />
                    </div>
                    <h4 className="font-bold text-2xl mt-8 text-neutral-300 text-center">
                        No Repositories Yet.
                    </h4>
                </div>
            </section>
        </>
    );
}
