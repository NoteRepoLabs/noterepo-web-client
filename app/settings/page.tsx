/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import DropDown from '@/components/ui/DropDown';
import Footer from '@/components/ui/Footer';
import BottomBorderContainer from '@/layout/BottomBorderContainer';
import Container from '@/layout/Container';
import shared from '@/shared/constants';
import { ArrowLeft02Icon, LinkSquare01Icon } from 'hugeicons-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

/*
    Responsible for displaying and managing user preferences.
*/
export default function Page() {
    const { setTheme } = useTheme();

    const [selectedDefaultView, setSelectedDefaultView] = useState(
        localStorage.getItem(shared.keys.REPO_VIEW) ?? 'list'
    );

    const [selectedAppTheme, setSelectedAppTheme] = useState(
        localStorage.getItem('theme') ?? 'dark'
    );

    const handleSetDefaultView = (view: 'list' | 'grid') => {
        localStorage.setItem(shared.keys.REPO_VIEW, view);
        setSelectedDefaultView(view);
    };

    const handleSetAppTheme = (theme: 'light' | 'dark') => {
        setTheme(theme);
        setSelectedAppTheme(theme);
    };

    return (
        <Container>
            <a
                href="/"
                className="flex gap-2 items-center px-2 md:px-0 mt-2 opacity-80 hover:opacity-100 transition-opacity"
            >
                <ArrowLeft02Icon />
                <span>Back</span>
            </a>
            <header className="mt-2 py-2 border-b dark:border-b-highlight border-neutral-300 mb-4">
                <h1 className="text-3xl mb-2 font-bold">Settings</h1>
            </header>

            <BottomBorderContainer>
                <div className="py-4">
                    <h3 className="text-xl mb-1 font-bold">General</h3>
                    <p className="dark:text-neutral-300 text-neutral-500">
                        Customizations for this device.
                    </p>

                    {/* OPTIONS */}
                    <section>
                        {/* REPO VIEW */}
                        <section className="ml-4">
                            <h3 className="mt-4 font-bold">
                                Default Repo View
                            </h3>
                            <section className="m-2">
                                <DropDown
                                    label="List"
                                    onClick={() => handleSetDefaultView('list')}
                                    isSelected={selectedDefaultView == 'list'}
                                />
                                <DropDown
                                    label="Grid"
                                    onClick={() => handleSetDefaultView('grid')}
                                    isSelected={selectedDefaultView == 'grid'}
                                />
                            </section>
                        </section>

                        {/* APP THEME */}
                        <section className="ml-4">
                            <h3 className="mt-4 font-bold">App Theme</h3>
                            <section className="m-2">
                                <DropDown
                                    label="Light"
                                    onClick={() => handleSetAppTheme('light')}
                                    isSelected={selectedAppTheme == 'light'}
                                />
                                <DropDown
                                    label="Dark"
                                    onClick={() => handleSetAppTheme('dark')}
                                    isSelected={selectedAppTheme == 'dark'}
                                />
                            </section>
                        </section>
                    </section>
                </div>
            </BottomBorderContainer>

            <BottomBorderContainer>
                <div className="py-4">
                    <h3 className="text-xl mb-1 font-bold">FAQs</h3>
                    <p className="dark:text-neutral-300 text-neutral-500">
                        Frequently asked questions regarding NoteRepo&apos;s
                        services.
                    </p>

                    <ol className="list-decimal mt-2">
                        <li className="ml-4  dark:text-neutral-300 text-neutral-500 mb-1">
                            <h3 className="font-bold dark:text-neutral-200">
                                I&apos;m unable to sign in!
                            </h3>
                            <p>
                                This is usually an issue with the browser cache.
                                If a full refresh doesn&apos;t do the trick, try
                                clearing your cache and cookies.
                            </p>
                        </li>
                        <li className="ml-4 dark:text-neutral-300 text-neutral-500 mb-1">
                            <h3 className="font-bold dark:text-neutral-200">
                                Some of my repos or files don&apos;t show up
                            </h3>
                            <p>
                                One possible cause is creating or deleting a
                                repo or file on one device and trying to access
                                them on another. We automatically sync
                                out-of-date repos every 5 minutes to improve
                                performance.
                            </p>
                        </li>
                        <li className="ml-4 dark:text-neutral-300 text-neutral-500 mb-1">
                            <h3 className="font-bold dark:text-neutral-200">
                                I&apos;m unable to upload some file types
                            </h3>
                            <p>
                                NoteRepo limits the kinds of files you can
                                upload to our servers to improve security,
                                they&apos;re limited to only word, powerpoint,
                                pdf and image files.
                            </p>
                        </li>
                        <li className="ml-4 dark:text-neutral-300 text-neutral-500 mb-1">
                            <h3 className="font-bold dark:text-neutral-200">
                                Keep getting an error when I upload a valid
                                file!
                            </h3>
                            <p>
                                We limit the file size of any repo to 10MB since
                                most study materials don&apos;t exceed this
                                threshold...and our BLOB store won&apos;t allow
                                it either for the free plan. :)
                            </p>
                        </li>
                        <li className="ml-4 dark:text-neutral-300 text-neutral-500 mb-1">
                            <h3 className="font-bold dark:text-neutral-200">
                                How safe are my files? Can anyone else view
                                them?
                            </h3>
                            <p>
                                Security is our top priority when developing
                                NoteRepo, by default the server encrypts some of
                                your user and file information and no other
                                entity knows about what you upload unless you
                                compromise your account password. Never share it
                                with anyone by the way.
                            </p>
                        </li>
                        <li className="ml-4 dark:text-neutral-300 text-neutral-500 mb-1">
                            <h3 className="font-bold dark:text-neutral-200">
                                How do I delete my account?
                            </h3>
                            <p>
                                It&apos;s sad to see you want to go, but you can
                                delete your account and everything else
                                associated with it by going to the{' '}
                                <a
                                    href="/account"
                                    className="dark:hover:text-neutral-200 hover:text-neutral-900 transition-colors underline underline-offset-4"
                                >
                                    accounts page.
                                </a>
                            </p>
                        </li>
                    </ol>
                </div>
            </BottomBorderContainer>

            <BottomBorderContainer>
                <div className="py-4">
                    <h3 className="text-xl mb-1 font-bold">
                        Issues & Feature Requests
                    </h3>
                    <p className="dark:text-neutral-300 text-neutral-500">
                        Found a bug or something&apos;s not working right?
                        Report them to our engineers.
                    </p>

                    <p className="dark:text-neutral-300 text-neutral-500 mt-2">
                        You can also make a feature request by opening an issue
                        on our GitHub Repo.
                    </p>

                    <p className="dark:text-neutral-300 text-neutral-500 mt-2">
                        <a
                            href="https://github.com/NoteRepoLabs/issues-and-feature-requests"
                            target="_blank"
                            className="flex items-center gap-2 dark:hover:text-neutral-100 hover:text-neutral-900 transition-colors"
                        >
                            <span>Make an issue or feature request</span>
                            <LinkSquare01Icon size={16} />
                        </a>
                    </p>
                </div>
            </BottomBorderContainer>

            <BottomBorderContainer>
                <div className="py-4">
                    <h3 className="text-xl mb-1 font-bold">Credits</h3>
                    <p className="dark:text-neutral-300 text-neutral-500">
                        NoteRepo is the cumulative effort of two passionate
                        Computer Science students who&apos;ve worked tirelessly
                        for months to bring their idea into fruition, made
                        completely free and open source for everyone to use!
                    </p>

                    <h3 className="my-1 font-bold">Maintainers</h3>
                    <ul className="list-disc">
                        <li className="ml-4 dark:text-neutral-300 text-neutral-500 dark:hover:text-neutral-100 transition-colors">
                            <a
                                href="https://github.com/dev-xero"
                                target="_blank"
                            >
                                @dev-xero (frontend)
                            </a>
                        </li>
                        <li className="ml-4 dark:text-neutral-300 text-neutral-500 dark:hover:text-neutral-100 transition-colors">
                            <a
                                href="https://github.com/Anuolu-2020"
                                target="_blank"
                            >
                                @Anuolu-2020 (backend)
                            </a>
                        </li>
                    </ul>

                    <p className="mt-2 dark:text-neutral-300 text-neutral-500">
                        Huge thanks to everyone that participated in the beta
                        release testing for their immensely valuable feedback.
                    </p>
                </div>
            </BottomBorderContainer>

            <div className="mt-8">
                <Footer />
            </div>
        </Container>
    );
}
