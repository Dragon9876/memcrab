import { Dispatch, SetStateAction } from "react";

export type TableProvider = {
    highlightedCells: HighlightedCellsType,
    setHighlightedCells: SetHighlightedCellsType,
    selectedRows: SelectedRowsType,
    setSelectedRows: SetSelectedRowsType,
    tableData: TableDataType,
    setTableData: SetTableDataType,
    previousRow: PreviousRowType,
    setPreviousRow: SetPreviousRowType,
    previousRowId: PreviousRowIdType,
    setPreviousRowId: SetPreviousRowIdType,
};

export type PreviousRowIdType = number;
export type SetPreviousRowIdType = Dispatch<number>;
export type SetPreviousRowType = Dispatch<TableCell[]>;
export type PreviousRowType = TableCell[];
export type HighlightedCellsType = Set<string>;
export type SetHighlightedCellsType = Dispatch<SetStateAction<HighlightedCellsType>>;
export type SetSelectedRowsType = Dispatch<SetStateAction<number[]>>;
export type TableDataType = TableCell[][];
export type SetTableDataType = Dispatch<SetStateAction<TableDataType>>;
export type SelectedRowsType = number[];

type TableCellId = string;
type TableCellValue = number;

export interface TableCell {
    id: TableCellId,
    value: TableCellValue,
}