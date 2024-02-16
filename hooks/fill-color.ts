import { create } from 'zustand';

interface FillColorStoreProps {
    fillColor: string;
    setFillColor: (fillColor: string) => void;
};

export const useFillColorStore = create<FillColorStoreProps>((set) => ({
    fillColor: '',
    setFillColor: (fillColor) => set(() => ({ fillColor })),
}));
