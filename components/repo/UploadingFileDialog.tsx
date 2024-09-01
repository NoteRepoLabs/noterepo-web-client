/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import spinningAnimation from '@/animated/spinner.json';
import Lottie from 'lottie-react';
import Modal from '../ui/Modal';

interface UploadingFileDialogProps {
    progress: number;
}

export default function UploadingFileDialog({
    progress,
}: UploadingFileDialogProps) {
    return (
        <Modal>
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
                Hang on while we upload your file to our servers. You can grab a
                coffee and relax in the mean time.
            </p>
            <p className="text-neutral-500 dark:text-neutral-300 font-bold text-sm">
                Do not close this window.
            </p>
        </Modal>
    );
}
