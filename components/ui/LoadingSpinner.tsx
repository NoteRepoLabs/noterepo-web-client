import spinningAnimation from '@/animated/spinner.json';
import Lottie from "lottie-react";

export default function LoadingSpinner() {
    return (
        <div className="flex">
            <div className="w-8 max-w-8 h-8 max-h-8">
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
            <h3 className="ml-4 font-bold">Loading</h3>
        </div>
    );
}
