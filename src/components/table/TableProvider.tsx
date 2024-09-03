import { createContext, useContext } from "react";
import { TableProvider } from "./types.ts";

export const TableContext = createContext<TableProvider>(null!);

export const useTableContext = () => {
    const props = useContext(TableContext);

    if(!props) {
        throw new Error('No table context provided');
    }

    return props;
}