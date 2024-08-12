import { CloseCircle } from 'iconsax-react';
import FilledButton from '../ui/FilledButton';
import { MouseEvent } from 'react';
import OutlineButton from '../ui/OutlineButton';

interface DeleteRepoDialogProps {
    onCloseClick: () => void;
    onDeleteClick: () => void;
}

/* Delete repo dialog component */
export default function DeleteRepoDialog(props: DeleteRepoDialogProps) {
    return (
        <section className="w-full h-screen grid place-items-center fixed top-0 left-0 z-[995]">
            <div className="block fixed inset-0 bg-neutral-900 bg-opacity-50 backdrop-blur-sm"></div>
            <section className="w-[90%] mt-12 max-w-lg px-4 py-8 bg-neutral-100 border-[1px] border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 z-[1000] flex flex-col justify-center rounded-xl items-center text-center shadow-lg relative">
                <CloseCircle
                    size="24"
                    variant="Bold"
                    className="text-neutral-300 cursor-pointer absolute top-4 left-4 transition-colors hover:text-neutral-500 dark:hover:text-neutral-100"
                    onClick={props.onCloseClick}
                />
                <h3 className="text-2xl font-bold text-center dark:text-neutral-100 text-neutral-700">
                    Delete This Repo
                </h3>
                <p className="my-2 px-2 text-neutral-500 dark:text-neutral-300">
                    You&apos;re about to delete this repository which is
                    permanent. It cannot be undone.
                </p>
                <section className="w-full px-4 flex gap-2 items-center">
                    <FilledButton text="No, keep it" onClick={props.onCloseClick} />
                    <OutlineButton text="Yes, delete" onClick={props.onDeleteClick} />
                </section>
            </section>
        </section>
    );
}
