/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import spinningAnimation from '@/animated/spinner.json';
import Lottie from 'lottie-react';

interface UploadingFileDialogProps {
    progress: number;
}

export default function UploadingFileDialog({ progress }: UploadingFileDialogProps) {
    return (
        <section className="w-full h-screen grid place-items-center fixed top-0 left-0 z-[995]">
            <div className="block fixed inset-0 bg-neutral-900 bg-opacity-50 backdrop-blur-sm"></div>
            <section className="w-[90%] mt-12 max-w-lg px-4 py-8 bg-neutral-100 border-[1px] border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 z-[1000] flex flex-col justify-center rounded-xl items-center text-center shadow-lg relative">
                <h3 className="text-2xl font-bold text-center dark:text-neutral-100 text-neutral-700 flex gap-2 items-center">
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
                    <span>Uploading {progress}%</span>
                </h3>
                <p className="my-2 px-2 text-neutral-500 dark:text-neutral-300">
                    Hang on while we upload your file to our servers. You can
                    grab a coffee and relax in the mean time.
                </p>
                <p className="text-neutral-500 dark:text-neutral-300 font-bold text-sm">Do not close this window.</p>
            </section>
        </section>
    );
}
