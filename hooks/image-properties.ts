import { create } from "zustand";

interface ImageProps {
    grayscale: string;
    brightness: number;
    setGrayscale: (value: string) => void;
    setBrightness: (value: number) => void;
}

export const useImageProperties = create<ImageProps>((set) => ({
    grayscale: 'average',
    brightness: 0.1,
    setGrayscale: (value) => set({ grayscale: value }),
    setBrightness: (value) => set({ brightness: value }),
}));