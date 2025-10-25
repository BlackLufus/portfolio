import NavigatorItem, { NavigatorItemProbs } from "./navigaor_item";

interface NavigatorProbs {
    navigator_list: NavigatorItemProbs[]
}

export default function Navigator({ navigator_list }:NavigatorProbs) {
    return(
        <nav>
            <ul>
                {navigator_list.map((item) => (
                    <NavigatorItem title={item.title} href={item.href} />
                ))}
            </ul>
        </nav>
    );
}