import { create } from 'zustand';

// Definición de la interfaz para el estado del hook
interface State {
    // Indica si el menú lateral está abierto o cerrado
    isSideMenuOpen: boolean;

    // Función para abrir el menú lateral
    openSideMenu: () => void;

    // Función para cerrar el menú lateral
    closeSideMenu: () => void;
}

// Crear el hook useUiStore utilizando Zustand
export const useUiStore = create<State>((set) => ({
    // Estado inicial del menú lateral: cerrado
    isSideMenuOpen: false,

    // Función para abrir el menú lateral
    openSideMenu: () => set({ isSideMenuOpen: true }),

    // Función para cerrar el menú lateral
    closeSideMenu: () => set({ isSideMenuOpen: false }),
}));