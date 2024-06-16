import { LogoutCurve } from 'iconsax-react';
import Logo from '../Logo';
import PublicRepos from './PublicRepos';
import IconText from '../IconText';
import { UserTick } from 'iconsax-react';

/** Dashboard header props  */
export interface DashboardHeaderProps {
    username: string;
}

/** Dashboard header component */
export default function DashboardHeader(props: DashboardHeaderProps) {
    return (
        <>
            <header className="w-full flex dark:bg-neutral-700 border-[1.5px] dark:border-neutral-600  border-neutral-200 bg-neutral-100 p-4 justify-between rounded-2xl items-center">
                <Logo width={160} height={40} />
                <PublicRepos />
                <div className="flex space-x-4">
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
