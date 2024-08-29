import { AddSquare } from 'iconsax-react';
import { LegacyRef } from 'react';

interface FileUploadButtonProps {
    onClick: () => void;
    disabled?: boolean;
    fileInputRef: LegacyRef<HTMLInputElement> | null;
    handleFileChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function FileUploadButton({
    onClick,
    disabled,
    fileInputRef,
    handleFileChange,
}: FileUploadButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="flex items-center gap-2 dark:hover:text-neutral-200  border-neutral-300 text-neutral-500 rounded-xl md:rounded-2xl dark:border-highlight dark:text-neutral-300  transition-colors disabled:!opacity-70"
        >
            <div>
                <AddSquare size={24} />
            </div>
            <span>Upload</span>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </button>
    );
}
