/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
import { createContext, useContext } from 'react';
import { RootStore } from './root-store';

export const AppContext = createContext<RootStore>({} as RootStore);

export const useStore = () => useContext(AppContext);
