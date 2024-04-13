import { Warning2 } from "iconsax-react"

interface ErrorTextProps {
    errorMsg: string
}

export default function ErrorText({ errorMsg }: ErrorTextProps) {
    return (
        <div className="flex items-center justify-center mt-6">
            <Warning2 size="24" color="#F9587F" variant="Bold"/>
            <p className="ml-2 text-vibrant-red font-bold text-center">{errorMsg}</p>
        </div>
    )
}