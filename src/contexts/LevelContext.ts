import { createContext, useContext } from "react";

export const LevelContext = createContext<number>(0);

export const LevelProvider = LevelContext.Provider;

export const useLevelContext = () => useContext(LevelContext);
