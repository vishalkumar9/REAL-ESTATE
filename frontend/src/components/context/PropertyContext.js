import { createContext } from "react";

export const PropertyContext = createContext({
    searchProperties:[],
    userProperties:[],
    top10Properties:[],
});