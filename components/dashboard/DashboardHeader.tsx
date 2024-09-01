/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import { HambergerMenu, LogoutCurve } from 'iconsax-react';
import Logo from '../ui/Logo';
import PublicRepos from './PublicRepos';
import IconText from '../ui/IconText';
import { UserTick } from 'iconsax-react';
import { useState } from 'react';
import { Cancel01Icon, Menu09Icon, Settings02Icon } from 'hugeicons-react';

export interface DashboardHeaderProps {
    username: string;
}

/**
 * Universal header UI for the dashboard page.
 * @param props used for modifying dashboard header behaviour
 * @returns a dashboard header component
 */
export default function DashboardHeader(props: DashboardHeaderProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div className="overflow-x-hidden z-[9999]">
                <header
                    className={`flex flex-col md:flex-row dark:bg-neutral-700 bg-neutral-100 p-4 justify-center border-b-[1.5px] dark:border-b-neutral-800 border-b-neutral-200 md:items-center space-y-4 md:space-y-0 overflow-hidden transition-all md:h-auto fixed z-[999] left-0 right-0 top-0  ${
                        isExpanded ? 'h-[200px]' : 'h-[70px]'
                    }`}
                >
                    <div className="w-full max-w-3xl flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 gap-2">
                        <div className=" md:w-auto w-full flex justify-between items-center">
                            <Logo width={160} height={40} />
                            <div
                                className="md:hidden cursor-pointer"
                                onClick={() => {
                                    const body =
                                        document.querySelector('body')!;
                                    if (!isExpanded) {
                                        body.style.overflow = 'hidden';
                                    } else {
                                        body.style.overflow = 'auto';
                                    }
                                    setIsExpanded(!isExpanded);
                                }}
                            >
                                {isExpanded ? (
                                    <Cancel01Icon size={24} color="#A1A7B5" />
                                ) : (
                                    <Menu09Icon size={24} color="#A1A7B5" />
                                )}
                            </div>
                        </div>
                        <div
                            className={`${
                                isExpanded ? 'flex' : 'hidden'
                            } md:flex items-center`}
                        >
                            <PublicRepos />
                        </div>
                        <div
                            className={`space-x-4 ${
                                isExpanded
                                    ? 'flex flex-col space-y-4 md:space-y-0'
                                    : 'hidden'
                            } md:flex md:flex-row md:items-center`}
                        >
                            <IconText
                                text={props.username}
                                icon={<UserTick size={24} />}
                                styles={{
                                    marginRight: '16px'
                                }}
                            />
                            <IconText
                                text="Settings"
                                icon={<Settings02Icon size={24} />}
                                onClick={() =>
                                    (window.location.href = '/settings')
                                }
                                styles={{
                                    marginLeft: '0px'
                                }}
                            />
                        </div>
                    </div>
                </header>
                {isExpanded && (
                    <div
                        className={`sm:hidden block fixed inset-0 bg-neutral-900 bg-opacity-50 backdrop-blur-sm z-[20]`}
                    ></div>
                )}
            </div>
        </>
    );
}
