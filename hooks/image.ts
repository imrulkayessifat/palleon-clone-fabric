import { create } from "zustand";

interface ImageProps {
    image: string,
    setImage: (value: string) => void;
}

export const useImageStore = create<ImageProps>((set) => ({
    image: '',
    setImage: (value: string) => set({ image: value }),
}));