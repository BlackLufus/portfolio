import NavigatorItem, { NavigatorItemProbs } from "./navigator_item";

interface NavigatorProbs {
    navigator_list: NavigatorItemProbs[]
}

export default function Navigator({ navigator_list }:NavigatorProbs) {
    return(
        <nav className="navigator">
            <ul className="navigator_ulist">
                {navigator_list.map((item) => (
                    <NavigatorItem title={item.title} href={item.href} />
                ))}
            </ul>
        </nav>
    );
}