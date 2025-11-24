import {useEffect, useState } from "react";

interface CustomScrollBarProbs {
    wrapperRef: React.RefObject<HTMLUListElement | null>;
    size?: number;
    setIsDragging?: (state: boolean) => void;
}

const getId = (() => {
  let i = 0;
  return () => i++;
})();

export default function CustomScrollBar( {wrapperRef, size, setIsDragging}: CustomScrollBarProbs) {
    const [id, _] = useState(getId());
    const [numBoxes, setNumBoxes] = useState(1);
    let selectedBox = 0;

    const calcNumBoxes = () => {
        if (!wrapperRef.current) return;
        // Gets Unsorted List element
        const wrapper = wrapperRef.current;
        // Gets total scroll width
        const scrollWidth = wrapper.scrollWidth;
        // Gets visibile with of container element
        const viewWidth = wrapper.clientWidth;

        const itemSize = (size == undefined || size > viewWidth ? viewWidth : size);

        // Calculates how many times SkillItem element fits to container element
        const itemFitInTotalViewWith = Math.floor(viewWidth / itemSize)

        // Calculates how far to scroll when clicken a box item
        const viewBoxSize = itemSize * itemFitInTotalViewWith;

        // Calculates the max boxes to fast scroll
        const numBoxes = Math.ceil(scrollWidth / viewBoxSize);
        setNumBoxes(numBoxes);
    }

    const onClickBox = (index: number) => {
        if (!wrapperRef.current) return;
        // Gets Unsorted List element
        const wrapper = wrapperRef.current;
        // Gets visibile with of container element
        const viewWidth = wrapper.clientWidth;

        const itemSize = (size == undefined ? viewWidth : size);

        // Calculates how many times SkillItem element fits to container element
        const itemFitInTotalViewWith = Math.floor(viewWidth / itemSize)

        // Calculates how far to scroll when clicken a box item
        const viewBoxSize = itemSize * itemFitInTotalViewWith;

        // Calculates new scroll size to scroll to
        const newScrollLeft = index * viewBoxSize;
        wrapperRef.current.scrollTo({
            left: newScrollLeft,
            behavior: "smooth"
        });
    };

    const onScrollLeftChange = () => {
        if (!wrapperRef.current) return;
        // Gets container element
        const wrapper = wrapperRef.current;
        // Gets current scroll width
        const scrollLeft = wrapper.scrollLeft;
        // Gets total scoll width
        const scrollWidth = wrapper.scrollWidth;
        // Gets visibile with of container element
        const viewWidth = wrapper.clientWidth;

        const itemSize = (size == undefined ? viewWidth : size);
        
        // Calculates how many times SkillItem element fits to container element
        const itemFitInTotalViewWith = Math.floor(viewWidth / itemSize)

        // Calculates how far to scroll when clicken a box item
        const viewBoxSize = itemSize * itemFitInTotalViewWith;

        // Calculates which box to select or heighlight it
        const currentBoxIndex = Math.round(scrollLeft / viewBoxSize);

        // Calculates the max boxes to fast scroll
        const numBoxes = Math.ceil(scrollWidth / viewBoxSize);

        // Selects the box index
        setSelectedBox(scrollLeft + viewWidth >= scrollWidth - 2 ? numBoxes - 1 : currentBoxIndex);
    }

    const setSelectedBox = (index: number) => {
        const oldSelected = document.getElementById(`custom_scroll_bar_${id}_box_${selectedBox}`) as HTMLDivElement;
        if (oldSelected) {
            oldSelected.className = "custom_scroll_box"
        }
        selectedBox = index;
        const newSelected = document.getElementById(`custom_scroll_bar_${id}_box_${selectedBox}`) as HTMLDivElement;
        if (!newSelected) return;
        newSelected.className = "custom_scroll_box custom_scroll_box_selected"
    }

    let startX = 0;
    let scrollLeft = 0;

    const mouseDown = (e: MouseEvent) => {
        if (!wrapperRef.current) return;
        setIsDragging?.(false);
        e.preventDefault();
        startX = e.pageX - wrapperRef.current.offsetLeft;
        scrollLeft = wrapperRef.current.scrollLeft;

        wrapperRef.current.addEventListener('mousemove', mouseMove);
    }

    const mouseMove = (e: MouseEvent) => {
        setIsDragging?.(true);
        if (!wrapperRef.current) return;
        const x = e.pageX - wrapperRef.current.offsetLeft;
        const walk = (x - startX);
        wrapperRef.current.scrollLeft = scrollLeft - walk;
    }

    const mouseUp = () => {
        if (!wrapperRef.current) return;
        wrapperRef.current.removeEventListener('mousemove', mouseMove)
    }

    useEffect(() => {
        if (!wrapperRef.current) return;

        const wrapper = wrapperRef.current;

        const images = wrapper.querySelectorAll("img");

        images.forEach(img => {
            img.addEventListener("load", calcNumBoxes);
        });

        onScrollLeftChange();
        calcNumBoxes();

        window.addEventListener('resize', calcNumBoxes);
        wrapper.addEventListener('scroll', onScrollLeftChange);
        wrapper.addEventListener('mousedown', mouseDown);
        window.addEventListener('mouseup', mouseUp);

        return () => {
            window.removeEventListener('resize', calcNumBoxes);
            wrapper.removeEventListener('scroll', onScrollLeftChange);
            wrapper.removeEventListener('mousedown', mouseDown);
            window.removeEventListener('mouseup', mouseUp);
        };
    }, [wrapperRef]);

    return(
        <div className="custom_scroll_bar">
            {Array.from({ length: numBoxes }).map((_, i) => (
                <span
                    key={i}
                    id={`custom_scroll_bar_${id}_box_${i}`}
                    onClick={() => onClickBox?.(i)}
                    className="custom_scroll_box"
                />
            ))}
        </div>
    )
}