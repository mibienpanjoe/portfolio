import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {locations} from "#constants";

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create(immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location) => set((state) => {
        if (!location) {
            console.warn('setActiveLocation called with null/undefined, ignoring');
            return;
        }
        state.activeLocation = location;
    }) ,

    resetActiveLocation: () => set((state)=>{
        state.activeLocation = DEFAULT_LOCATION;
})
}))) ;

export default useLocationStore;