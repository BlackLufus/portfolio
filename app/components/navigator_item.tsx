export interface NavigatorItemProbs {
    title: string;
    href: string;
}

export default function NavigatorItem({title, href}: NavigatorItemProbs) {
    return(
        <li className="navigator_item">
            <a className="navigator_link" href={href}>
                {title}
            </a>
        </li>
    );
}