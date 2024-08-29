import {Dispatch, SetStateAction} from "react";

export type TableProvider = {
    highlightedCells: HighlightedCellsType,
    setHighlightedCells: SetHighlightedCellsType,
    selectedRows: SelectedRowsType,
    setSelectedRows: SetSelectedRowsType,
    tableData: TableCell[][],
    setTableData: SetTableDataType,
    previousRow: PreviousRowType,
    setPreviousRow: SetPreviousRowType,
    previousRowId: number,
    setPreviousRowId: SetPreviousRowIdType,
};

export type SetPreviousRowIdType = Dispatch<number>;
export type SetPreviousRowType = Dispatch<TableCell[]>;
export type PreviousRowType = TableCell[];
export type HighlightedCellsType = Set<number>;
export type SetHighlightedCellsType = Dispatch<SetStateAction<HighlightedCellsType>>;
export type SetSelectedRowsType = Dispatch<SetStateAction<number[]>>;
export type TableDataType = TableCell[][];
export type SetTableDataType = Dispatch<SetStateAction<TableCell[][]>>;
export type SelectedRowsType = number[];

type TableCellId = number;
type TableCellValue = number;
export interface TableCell {
    id: TableCellId,
    value: TableCellValue,
}