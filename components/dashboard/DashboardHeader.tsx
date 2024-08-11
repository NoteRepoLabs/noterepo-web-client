import { HambergerMenu, LogoutCurve } from 'iconsax-react';
import Logo from '../ui/Logo';
import PublicRepos from './PublicRepos';
import IconText from '../ui/IconText';
import { UserTick } from 'iconsax-react';
import { useState } from 'react';

/** Dashboard header props  */
export interface DashboardHeaderProps {
    username: string;
}

/** Dashboard header component */
export default function DashboardHeader(props: DashboardHeaderProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div className="overflow-x-hidden">
                <header
                    className={`flex flex-col md:flex-row dark:bg-neutral-700 bg-neutral-100 p-4 justify-center border-b-[1.5px] dark:border-b-neutral-800 border-b-neutral-200 md:items-center space-y-4 md:space-y-0 overflow-hidden transition-all md:h-auto fixed z-[999] left-0 right-0 top-0  ${
                        isExpanded ? 'h-[180px]' : 'h-[70px]'
                    }`}
                >
                    <div className="w-full max-w-3xl flex flex-col md:flex-row md:justify-between space-y-6 md:space-y-0 items-center">
                        <div className=" md:w-auto w-full flex justify-between">
                            <Logo width={160} height={40} />
                            <HambergerMenu
                                size="32"
                                color="#A1A7B5"
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
                            />
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
                                isExpanded ? 'flex' : 'hidden'
                            } md:flex items-center`}
                        >
                            <IconText
                                text={props.username}
                                icon={<UserTick size="24" color="#A1A7B5" />}
                            />
                            <IconText
                                text="Sign out"
                                icon={<LogoutCurve size="24" color="#A1A7B5" />}
                                onClick={() =>
                                    (window.location.href = '/signout')
                                }
                            />
                        </div>
                    </div>
                </header>
                {isExpanded && (
                    <div
                        className={`absolute w-full h-[1000px] bg-neutral-900 left-0 top-0 z-[997] opacity-70 md:hidden`}
                    ></div>
                )}
            </div>
        </>
    );
}
