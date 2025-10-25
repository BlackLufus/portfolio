export interface NavigatorItemProbs {
    title: string;
    href: string;
}

export default function NavigatorItem({title, href}: NavigatorItemProbs) {
    return(
        <li>
            <a href={href}>
                {title}
            </a>
        </li>
    );
}