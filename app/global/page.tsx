/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import React from 'react';
import { GlobalSearch } from 'iconsax-react';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import CenteredGridLayout from '@/layout/CenteredGridLayout';
import { InfiniteHits, InstantSearch, SearchBox } from 'react-instantsearch';
import 'instantsearch.css/themes/satellite.css';

const MEILISEARCH_HOST = process.env.NEXT_PUBLIC_MEILISEARCH_HOST || '';
const MEILISEARCH_API_KEY = process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY || '';
const { searchClient } = instantMeiliSearch(
    MEILISEARCH_HOST,
    MEILISEARCH_API_KEY,
);

/**
 * Provides an interface for globally searching repositories.
 */
export default function Page() {
    return (
        <CenteredGridLayout>
            <div>
                <h1 className="text-center font-bold text-2xl flex items-center justify-center gap-2">
                    <GlobalSearch size="32" color="#A1A7B5" />
                    Global Search
                </h1>
                <p className="text-center text-neutral-500 dark:text-neutral-300 mt-2">
                    You can search for repositories others have created by name,
                    description, or tags.
                </p>

                <InstantSearch indexName="repos" searchClient={searchClient}>
                    <SearchBox />
                    <InfiniteHits hitComponent={Hit} />
                </InstantSearch>
            </div>
        </CenteredGridLayout>
    );
}

interface RepoHit {
    id: string;
    name: string;
    description: string;
    tags: string[];
}

interface HitProps {
    hit: RepoHit;
}

const Hit = ({ hit }: HitProps) => {
    return (
        <article key={hit.id}>
            <h1>{hit.name}</h1>
            <p>{hit.description}</p>
        </article>
    );
};
