import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

interface ErrorTextProps {
    errorMsg: string
}

export default function ErrorText({ errorMsg }: ErrorTextProps) {
    return (
        <div className="flex items-center justify-center mt-6">
            <ExclamationTriangleIcon className="text-[#FA4E81] w-[24px] h-[24px]" />
            <p className="ml-2 text-vibrant-red font-normal text-center">{errorMsg}</p>
        </div>
    )
}