import BarLoader from "react-spinners/BarLoader"

export default function LoadingSpinner() {
    return (
        <div className="flex">
            <BarLoader loading={true} color={'#FFFFFF'} />

            {/* <h3 className="ml-4 font-bold">Loading!</h3> */}
        </div>
    );
}
