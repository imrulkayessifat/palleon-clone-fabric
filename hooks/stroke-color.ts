import { create } from 'zustand';

interface StrokeColorStoreProps {
    strokeColor: string;
    setStrokeColor: (strokeColor: string) => void;
};

export const useStrokeColorStore = create<StrokeColorStoreProps>((set) => ({
    strokeColor: '',
    setStrokeColor: (strokeColor) => set(() => ({ strokeColor })),
}));
