import { Tag } from 'phosphor-react';
interface KeywordProps {
    keyword: string
}
export function Keyword(props: KeywordProps) {
    return (
        <p className="px-2 py-1 mx-1 flex gap-1 items-center rounded-lg bg-gray-200 text-gray-800 font-semibold">
            <Tag weight='bold' /> {props.keyword}
        </p>
    )
}
