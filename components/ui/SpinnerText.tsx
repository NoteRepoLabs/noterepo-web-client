/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import spinningAnimation from '@/animated/spinner.json';
import Lottie from 'lottie-react';

interface SpinnerTextProps {
    text: string;
}

/* Spinner text component */
export default function SpinnerText({ text }: SpinnerTextProps) {
    return (
        <section className="mt-12">
            <div className="flex items-center gap-2 w-full justify-center">
                <div className="max-w-8 max-h-8">
                    <Lottie
                        animationData={spinningAnimation}
                        loop={true}
                        height={'32px'}
                        width={'32px'}
                        rendererSettings={{
                            preserveAspectRatio: 'xMidYMid slice',
                        }}
                    />
                </div>
                <h1 className="text-xl text-center text-neutral-500 dark:text-neutral-300">
                    {text}
                </h1>
            </div>
        </section>
    );
}
