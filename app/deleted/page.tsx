/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import CenteredGridLayout from "@/layout/CenteredGridLayout";
import { useEffect } from "react";

export default function Page() {

  useEffect(() => {
    localStorage.clear();
    window.location.href = '/signup';
  }, [])

  return (
    <>
      <CenteredGridLayout>
        <section className="w-full max-w-lg mx-auto text-center">
          <h1 className="font-bold text-3xl mb-6 text-neutral-900 dark:text-neutral-100">
            Successfully deleted
          </h1>
          <p className="text-center text-base text-neutral-500 dark:text-neutral-300 mb-12">
            We&apos;ve deleted your account, thanks for trying out NoteRepo. Until next time.
          </p>
        </section>
      </CenteredGridLayout>
    </>
  )
}
