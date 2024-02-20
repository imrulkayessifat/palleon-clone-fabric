import { IconType } from "react-icons";
interface ElementProps {
    icon: IconType;
    name: string;
    value: string;
}

import { PiCursorFill } from "react-icons/pi";
import { FaRegSquare } from "react-icons/fa6";
import { RxText } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { FaRegCircle, FaImage } from "react-icons/fa";
import { FaPaintbrush } from "react-icons/fa6";
import { IoTriangle, IoEllipseOutline } from "react-icons/io5";
import { FaGripLines, FaUndoAlt, FaRedo } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

export const shapeelements: ElementProps[] = [
    {
        icon: FaRegSquare,
        name: "Rectangle",
        value: "rectangle",
    },
    {
        icon: FaRegCircle,
        name: "Circle",
        value: "circle",
    },
    {
        icon: IoTriangle,
        name: "Triangle",
        value: "triangle",
    },
    {
        icon: IoEllipseOutline,
        name: "Ellipse",
        value: "ellipse"
    },
    {
        icon: FaGripLines,
        name: "Line",
        value: "line",
    },
    {
        icon: FaImage,
        name: "Image",
        value: "image"
    },
    {
        icon: FaPaintbrush,
        name: "Free Drawing",
        value: "freeform",
    },
];

export const navelements: ElementProps[] = [
    {
        icon: PiCursorFill,
        name: "Select",
        value: "select",
    },
    {
        icon: FaRegSquare,
        value: "rectangle",
        name: "Rectangle",
    },
    {
        icon: RxText,
        name: "Text",
        value: "text",
    },
    {
        icon: MdDelete,
        value: "delete",
        name: "Delete",
    },
    {
        icon: FaUndoAlt,
        value: "undo",
        name: "Undo"
    },
    {
        icon: FaRedo,
        value: "redo",
        name: "Redo"
    },
    {
        icon: GrPowerReset,
        value: "reset",
        name: "Reset",
    },
];