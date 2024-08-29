import { Save2, Link1, Trash } from 'iconsax-react';
import TextButton from '../ui/TextButton';
import FileUploadButton from '../ui/FileUploadButton';
import { useRef } from 'react';

/** Repo View Layout Content Grid */
export default function RepoViewLayout() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUploadButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
        ev
    ) => {
        const file = ev.target.files?.[0];
        if (file) {
            console.log(`Selected file:`, file);
        }
    };

    return (
        <>
            <main className="flex flex-col sm:grid grid-cols-3 mt-6 border-t-2 border-highlight">
                <section className="col-span-2 p-4">
                    <h2 className="text-2xl font-bold">0 Files</h2>
                    <p className="my-2 text-neutral-300">
                        No Files Uploaded yet.
                    </p>
                    {/* <ul className="my-4">
                        <li>File</li>
                        <li>File</li>
                    </ul> */}
                </section>
                <section className="col-span-1 border-l-0 border-t-2 sm:border-t-0 sm:border-l-2 border-highlight p-4">
                    <ul className="flex flex-col gap-3">
                        <TextButton
                            text="Bookmark"
                            icon={<Save2 size={24} />}
                            onClick={() => {}}
                        />
                        <FileUploadButton
                            onClick={handleFileUploadButtonClick}
                            fileInputRef={fileInputRef}
                            handleFileChange={handleFileChange}
                        />
                        <TextButton
                            text="Share"
                            icon={<Link1 size={24} />}
                            onClick={() => {}}
                        />
                        <TextButton
                            text="Delete"
                            icon={<Trash size={24} />}
                            onClick={() => {}}
                            danger={true}
                        />
                    </ul>
                </section>
            </main>
        </>
    );
}
