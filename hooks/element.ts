import { create } from 'zustand';

interface ElementStoreProps {
    element: string;
    setElement: (element: string) => void;
};

export const useElementStore = create<ElementStoreProps>((set) => ({
    element: '',
    setElement: (element) => set(() => ({ element })),
}));