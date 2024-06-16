import { HambergerMenu, LogoutCurve } from 'iconsax-react';
import Logo from '../Logo';
import PublicRepos from './PublicRepos';
import IconText from '../IconText';
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
            <header
                className={`w-full flex flex-col md:flex-row dark:bg-neutral-700 border-[1.5px] dark:border-neutral-600  border-neutral-200 bg-neutral-100 p-4 justify-between rounded-2xl items-center space-y-4 md:space-y-0 overflow-hidden transition-all md:h-auto ${
                    isExpanded ? 'h-[180px]' : 'h-[70px]'
                }`}
            >
                <div className="flex items-center justify-between md:w-auto w-full">
                    <Logo width={160} height={40} />
                    <HambergerMenu
                        size="32"
                        color="#A1A7B5"
                        className="md:hidden cursor-pointer"
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                </div>
                <PublicRepos />
                <div
                    className={`flex space-x-4 ${
                        isExpanded
                            ? 'opacity-1 pointer-events-auto'
                            : 'opacity-0 pointer-events-none'
                    } md:opacity-100 md:pointer-events-auto`}
                >
                    <IconText
                        text={props.username}
                        icon={<UserTick size="24" color="#A1A7B5" />}
                    />
                    <IconText
                        text="Sign out"
                        icon={<LogoutCurve size="24" color="#A1A7B5" />}
                        onClick={() => (window.location.href = '/signout')}
                    />
                </div>
            </header>
        </>
    );
}
