import Image from 'next/image';

export default function Page() {
    return (
        <section className="max-w-2xl md:my-8 mx-3 md:mx-auto flex flex-col justify-center items-center min-h-screen">
            <Image src="/icon/icon-email.svg" alt="" width={64} height={64} />
            <h1 className="font-black text-3xl mt-12 mb-6 text-neutral-900 dark:text-neutral-100">
                Verify Your Email
            </h1>
            <p className="text-center font-bold text-base text-neutral-500 dark:text-neutral-300 mb-12">
                We&apos;ve sent you a link to verify your email address. Please
                check your inbox.
            </p>
        </section>
    );
}
