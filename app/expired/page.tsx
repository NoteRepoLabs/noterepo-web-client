
/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

"use client"

import Link from "@/components/ui/Link";
import CenteredGridLayout from "@/layout/CenteredGridLayout";

export default function Page() {
  return (
    <>
      <CenteredGridLayout>
        <section className="mt-8 w-full max-w-lg mx-auto text-center">
          <h1 className="font-bold text-center text-3xl text-neutral-900 dark:text-neutral-100">
            Verification link expired
          </h1>
          <p className="text-center text-base text-neutral-500 dark:text-neutral-300 mt-6 mb-4">
            This verification link has already expired, try signing in or up again.
          </p>

          <Link
            underlined={true}
            href="/signup"
            text="Sign Up Instead"
          />
        </section>
      </CenteredGridLayout>
    </>
  )
}
