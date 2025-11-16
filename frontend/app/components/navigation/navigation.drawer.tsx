import NavigatorItem, { NavigatorItemProbs } from "./navigation.drawer.item";

interface NavigatorProbs {
    navigator_list: NavigatorItemProbs[]
}

export default function Navigator({ navigator_list }:NavigatorProbs) {
    return(
        <nav className="navigator">
            <ul className="navigator_ulist">
                {navigator_list.map((item, index) => (
                    <NavigatorItem key={index} title={item.title} href={item.href} />
                ))}
            </ul>
        </nav>
    );
}