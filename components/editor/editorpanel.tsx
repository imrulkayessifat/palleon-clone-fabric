import { useState, useEffect } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

import RightSidePanel from "@/components/editor/rightsidepanel";
import { useElementStore } from "@/hooks/element";
import { useFillColorStore } from "@/hooks/fill-color";
import { useStrokeColorStore } from "@/hooks/stroke-color";

interface ElementActionProps {
    [key: string]: () => void;
}

const EditorPanel = () => {
    const { element, setElement } = useElementStore();
    const [history, setHistory] = useState<fabric.Object[]>([]);
    const { fillColor, setFillColor } = useFillColorStore();
    const { strokeColor, setStrokeColor } = useStrokeColorStore();

    const { editor, onReady } = useFabricJSEditor();

    const addTriangle = () => {
        const triangle = new fabric.Triangle({
            width: 100,
            height: 100,
            fill: 'transparent',
            stroke: 'black',
            left: 100,
            top: 100
        });
        editor?.canvas.add(triangle);
    }

    useEffect(() => {
        if (!editor) return
        const activeObject = editor.canvas.getActiveObject();
        if (activeObject) {
            activeObject.set('fill', fillColor);
            activeObject.set('stroke', strokeColor);
            editor.canvas.renderAll();
        }
    }, [fillColor, strokeColor])

    useEffect(() => {
        if (!editor) return;
        const views: ElementActionProps = {
            circle: () => editor.addCircle(),
            rectangle: () => editor.addRectangle(),
            line: () => editor.addLine(),
            triangle: () => addTriangle(),
            text: () => editor.addText("Add Text"),
            freeform: () => {
                editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
            },
            delete: () => {
                const activeObject = editor.canvas.getActiveObject();
                if (activeObject) {
                    editor.canvas.remove(activeObject);
                }
            },
            undo: () => {
                if (editor.canvas._objects.length > 0) {
                    const lastObject = editor.canvas._objects.pop();
                    if (lastObject) {
                        setHistory(prevHistory => [...prevHistory, lastObject]);
                    }
                }
                editor.canvas.renderAll();
            },
            redo: () => {
                if (history.length > 0) {
                    const lastObject = history.pop();
                    if (lastObject) {
                        editor.canvas.add(lastObject);
                        setHistory(prevHistory => prevHistory);
                    }
                }
                editor.canvas.renderAll();
            },
            reset: () => {
                editor.canvas._objects.splice(0, editor.canvas._objects.length);
                setHistory([]);
                editor.canvas.renderAll();
            }
        };
        views[element]?.();
        setElement('')
    }, [element, editor]);
    return (
        <div className="pt-24 mx-auto px-8 flex w-full h-full">
            <FabricJSCanvas
                className="sample-canvas w-full h-full border-1 border-red-500"
                onReady={onReady}
            />
            <RightSidePanel />
        </div>
    )
}

export default EditorPanel