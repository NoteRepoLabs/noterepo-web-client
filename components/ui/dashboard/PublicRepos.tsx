import { GlobalSearch } from 'iconsax-react';
import IconText from '../IconText';

/** Public repo component */
export default function PublicRepos() {
    return (
        <>
            <IconText
                text="Public Repos"
                icon={<GlobalSearch size="24" color="#A1A7B5" />}
            />
        </>
    );
}
