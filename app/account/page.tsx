/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import spinningAnimation from '@/animated/spinner.json';
import ProtectedRoute from '@/components/ProtectedRoute';
import BioField from '@/components/account/BioField';
import DeleteUserAccountDialog from '@/components/account/DeleteUserAccountDialog';
import ErrorText from '@/components/ui/ErrorText';
import FilledButton from '@/components/ui/FilledButton';
import Footer from '@/components/ui/Footer';
import { SERVER_URL } from '@/config/constants';
import NetworkConfig from '@/config/network';
import BottomBorderContainer from '@/layout/BottomBorderContainer';
import Container from '@/layout/Container';
import Metadata from '@/metadata/seo';
import shared from '@/shared/constants';
import ServerResponse from '@/types/serverTypes';
import { IUser } from '@/types/userTypes';
import { decrypt, encrypt } from '@/util/encryption';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { CookieValueTypes, getCookie, setCookie } from 'cookies-next';
import { ArrowLeft02Icon } from 'hugeicons-react';
import Lottie from 'lottie-react';
import { useState } from 'react';

interface IUpdateBioDTO {
    accessToken: CookieValueTypes;
    bio: string;
}

interface IDeleteUserDTO {
    accessToken: CookieValueTypes;
    id: string;
}

export default function Page() {
    const loggedInUser = localStorage.getItem(shared.keys.USER);
    if (!loggedInUser) window.location.href = '/signout';
    const currentUser: IUser = decrypt(loggedInUser);

    const [thisBio, setThisBio] = useState(currentUser.bio);
    const [errorMsg, setErrorMsg] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [showAccountDeletionDialog, setShowAccountDeletionDialog] =
        useState(false);

    /**
     * Mutation query for updating user bio then caching.
     */
    const updateBioMutation = useMutation({
        mutationFn: (dto: IUpdateBioDTO) => {
            return axios.patch(
                `${SERVER_URL}/users/${currentUser.id}/bio`,
                { bio: dto.bio },
                {
                    headers: {
                        ...NetworkConfig.headers,
                        Authorization: `Bearer ${dto.accessToken}`,
                    },
                }
            );
        },
        onSuccess: () => {
            currentUser.bio = thisBio;
            const encryptedUpdatedUser = encrypt(currentUser);
            localStorage.setItem(shared.keys.USER, encryptedUpdatedUser);
            // Refresh
            window.location.reload();
        },
        onError: (err: AxiosError) => {
            console.error('An error occurred.', err);
            const serverErr = err.response?.data as ServerResponse;

            err.code == 'ERR_NETWORK'
                ? showErrorState('Could not sign up, check your connection.')
                : showErrorState(serverErr.message ?? 'An error occurred.');
        },
    });

    const deleteUserAccountMutation = useMutation({
        mutationFn: (dto: IDeleteUserDTO) => {
            return axios.delete(`${SERVER_URL}/users/${dto.id}`, {
                headers: {
                    ...NetworkConfig.headers,
                    Authorization: `Bearer ${dto.accessToken}`,
                },
            });
        },
        onSuccess: () => {
            localStorage.clear();
            window.location.href = '/signup';
        },
        onError: (err: AxiosError) => {
            console.error('An error occurred.', err);
            const serverErr = err.response?.data as ServerResponse;

            err.code == 'ERR_NETWORK'
                ? showErrorState('Could not sign up, check your connection.')
                : showErrorState(serverErr.message ?? 'An error occurred.');
        },
    });

    // Error related state
    const showErrorState = (msg: string) => {
        setErrorMsg(msg);
        setIsDisabled(false);
    };

    const clearErrorState = (isDisabled: boolean) => {
        setErrorMsg('');
        setIsDisabled(isDisabled);
    };

    const fetchAccessToken = async (): Promise<CookieValueTypes> => {
        try {
            const refreshToken = getCookie(shared.keys.REFRESH_TOKEN);
            let accessToken = getCookie(shared.keys.ACCESS_TOKEN);

            if (!accessToken) {
                const { data: tokenData } = await axios.get(
                    `${SERVER_URL}/auth/refreshToken/${currentUser.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                );

                accessToken = tokenData.payload['access_token'];
                setCookie(shared.keys.ACCESS_TOKEN, accessToken, {
                    maxAge: 20 * 60,
                    sameSite: 'strict',
                }); // 20 mins
            }

            return accessToken;
        } catch (err) {
            throw err;
        }
    };

    const handleUpdateBioClick = async () => {
        clearErrorState(true);

        // Cannot be empty or null
        if (!thisBio || thisBio.trim() == '') {
            showErrorState('Type in your bio to update it');
            return;
        }

        // Must be different
        if (thisBio == currentUser.bio) {
            showErrorState("It's the same as your current bio.");
            return;
        }

        try {
            const accessToken = await fetchAccessToken();
            updateBioMutation.mutate({
                accessToken,
                bio: thisBio,
            });
        } catch {
            setErrorMsg('Could not update your bio at this time.');
        } finally {
            setIsDisabled(false);
        }
    };

    const handleAccountDeletionClick = async () => {
        try {
            const accessToken = await fetchAccessToken();
            deleteUserAccountMutation.mutate({
                accessToken,
                id: currentUser.id,
            });
        } catch {
            setErrorMsg(
                'Something went wrong on our end, contact the engineers.'
            );
        } finally {
            setIsDisabled(false);
        }
    };

    return (
        <>
            <Metadata
                title="My Account"
                description="My account related settings."
            />
            <ProtectedRoute>
                {/* ACCOUNT DELETION DIALOG */}
                {showAccountDeletionDialog && (
                    <DeleteUserAccountDialog
                        onConfirmAction={() => {
                            setShowAccountDeletionDialog(false);
                            alert('CONFIRMED: WILL DELETE SHORTLY');
                        }}
                        onCancelAction={() =>
                            setShowAccountDeletionDialog(false)
                        }
                    />
                )}

                <Container>
                    <a
                        href="/"
                        className="flex gap-2 items-center px-2 md:px-0 mt-2 opacity-80 hover:opacity-100 transition-opacity"
                    >
                        <ArrowLeft02Icon />
                        <span>Back</span>
                    </a>
                    <header className="mt-2 py-2 border-b dark:border-b-highlight border-neutral-300 mb-2">
                        <h1 className="text-3xl mb-2 font-bold">My Account</h1>
                    </header>

                    <BottomBorderContainer>
                        <div className="py-4">
                            <h3 className="text-xl mb-1 font-bold">Personal</h3>
                            <p className="dark:text-neutral-300 text-neutral-500 mb-2">
                                Username:{' '}
                                <span className="dark:text-neutral-200">
                                    {currentUser.username}
                                </span>
                            </p>
                            <p className="dark:text-neutral-300 text-neutral-500 mb-2">
                                Bio:
                            </p>
                            <BioField
                                bio={thisBio}
                                onChange={(value) => {
                                    clearErrorState(false);
                                    setThisBio(value);
                                }}
                            />
                            <FilledButton
                                text={
                                    isDisabled || updateBioMutation.isPending
                                        ? 'Updating'
                                        : 'Update'
                                }
                                onClick={handleUpdateBioClick}
                                className="w-full m-0 md:!max-w-[120px] md:ml-0 mt-2 !py-2 !rounded-md"
                                disabled={
                                    isDisabled || updateBioMutation.isPending
                                }
                                icon={
                                    updateBioMutation.isPending ? (
                                        <Lottie
                                            animationData={spinningAnimation}
                                            loop={true}
                                            height={'32px'}
                                            width={'32px'}
                                            rendererSettings={{
                                                preserveAspectRatio:
                                                    'xMidYMid slice',
                                            }}
                                        />
                                    ) : null
                                }
                            />
                            {errorMsg && <ErrorText errorMsg={errorMsg} />}
                        </div>
                    </BottomBorderContainer>

                    {/* SIGN OUT */}
                    <BottomBorderContainer>
                        <h3 className="text-xl mb-1 font-bold mt-4">
                            Sign Out
                        </h3>
                        <p className="dark:text-neutral-300 text-neutral-500 mb-2">
                            Sign out of your account. We&apos;ll remove any
                            saved data stored on this device and sign you out of
                            this account. Your data will still remain intact on
                            our servers.
                        </p>
                        <FilledButton
                            text="Sign Out"
                            onClick={() => (window.location.href = '/signout')}
                            className="w-full m-0 md:!max-w-[120px] md:ml-0 mt-2 !py-2 !rounded-md mb-4"
                        />
                    </BottomBorderContainer>

                    {/* ACCOUNT DELETION */}
                    <BottomBorderContainer>
                        <h3 className="text-xl mb-1 font-bold mt-4 text-vibrant-red">
                            Delete My Account
                        </h3>
                        <p className="dark:text-neutral-300 text-neutral-500 mb-2">
                            It&apos;s sad to see you leave, thank you for being
                            a part of NoteRepo. This will proceed to delete all
                            of your repositories and files from our servers. It
                            cannot be undone.
                        </p>
                        <FilledButton
                            text="Delete My Account"
                            onClick={() => setShowAccountDeletionDialog(true)}
                            className="w-full m-0 md:!max-w-[200px] md:ml-0 mt-2 !py-2 !rounded-md mb-4"
                            danger={true}
                        />
                    </BottomBorderContainer>

                    <Footer />
                </Container>
            </ProtectedRoute>
        </>
    );
}
