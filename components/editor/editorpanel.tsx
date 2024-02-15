import { useState, useEffect } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

import { Button } from "@/components/ui/button";
import { useElementStore } from "@/hooks/element";

interface ElementActionProps {
    [key: string]: () => void;
}

const EditorPanel = () => {
    const { element, setElement } = useElementStore();
    const [history, setHistory] = useState<fabric.Object[]>([]);

    const { editor, onReady } = useFabricJSEditor();

    const addRectangle = () => {
        editor?.addRectangle()
    }

    useEffect(() => {
        if (!editor) return;
        const views: ElementActionProps = {
            circle: () => editor.addCircle(),
            rectangle: () => editor.addRectangle(),
            line: () => editor.addLine(),
            text: () => editor.addText("Add Text"),
            freeform:()=>{
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
        <div className="mt-24 w-full h-full">
            <FabricJSCanvas
                className="sample-canvas w-full h-full border-1 border-red-500"
                onReady={onReady}
            />
        </div>
    )
}

export default EditorPanel