import { useState, useEffect } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

import RightSidePanel from "@/components/editor/rightsidepanel";
import { useElementStore } from "@/hooks/element";
import { useFillColorStore } from "@/hooks/fill-color";
import { useStrokeColorStore } from "@/hooks/stroke-color";
import { useImageStore } from "@/hooks/image";
import { useImageProperties } from "@/hooks/image-properties";

interface ElementActionProps {
    [key: string]: () => void;
}

const EditorPanel = () => {

    const { element } = useElementStore();
    const [history, setHistory] = useState<fabric.Object[]>([]);
    const { fillColor, setFillColor } = useFillColorStore();
    const { strokeColor, setStrokeColor } = useStrokeColorStore();
    const { image, setImage } = useImageStore();
    const { grayscale, brightness } = useImageProperties();
    console.log(grayscale, brightness)
    const { editor, onReady } = useFabricJSEditor();

    useEffect(() => {
        if (!editor) return
        const activeObject = editor.canvas.getActiveObject();
        if (activeObject && fillColor.length > 0) {
            activeObject.set('fill', fillColor);
            editor.canvas.renderAll();
        }
        if (activeObject && strokeColor.length > 0) {
            activeObject.set('stroke', strokeColor);
            editor.canvas.renderAll();
        }
        setFillColor('')
        setStrokeColor('')
    }, [fillColor, strokeColor])

    useEffect(() => {
        if (!editor) return;
        const activeObject = editor.canvas.getActiveObject();
        if (activeObject && activeObject.type === 'image') {
            var img = activeObject as fabric.Image;
            var filter = new fabric.Image.filters.Brightness({
                brightness: brightness
            });

            if (!img.filters) {
                img.filters = [];
            }

            img.filters = img.filters.filter(filter => !(filter instanceof fabric.Image.filters.Brightness));

            img.filters.push(filter);

            img.applyFilters();
            editor.canvas.renderAll();
        }
    }, [editor, brightness]);

    useEffect(() => {
        if (!editor) return;
        const activeObject = editor.canvas.getActiveObject();
        if (activeObject && activeObject.type === 'image') {
            var img = activeObject as fabric.Image;
            var filter = new fabric.Image.filters.Grayscale({
                mode: grayscale,
                alpha: 1
            });

            if (!img.filters) {
                img.filters = [];
            }

            img.filters = img.filters.filter(filter => !(filter instanceof fabric.Image.filters.Grayscale));

            img.filters.push(filter);

            img.applyFilters();
            editor.canvas.renderAll();
        }
    }, [editor, grayscale]);

    useEffect(() => {
        if (!editor) return;
        const views: ElementActionProps = {
            circle: () => editor.addCircle(),
            rectangle: () => editor.addRectangle(),
            line: () => editor.addLine(),
            triangle: () => editor.canvas.add(new fabric.Triangle({
                width: 100,
                height: 100,
                fill: 'transparent',
                stroke: 'black',
                left: 100,
                top: 100
            })),
            ellipse: () => editor.canvas.add(new fabric.Ellipse({
                rx: 50,
                ry: 25,
                fill: 'transparent',
                stroke: 'black',
                left: 100,
                top: 100
            })),
            image: () => {
                fabric.Image.fromURL(image, function (img) {
                    const scale = Math.min(100 / img.width!, 100 / img.height!);
                    img.set({
                        left: 100,
                        top: 100,
                        scaleX: scale,
                        scaleY: scale
                    });

                    editor.canvas.add(img);
                    editor.canvas.renderAll();
                });
            },
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
        setImage('')
    }, [element, editor, image]);

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