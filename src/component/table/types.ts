import { Dispatch, SetStateAction } from "react";

export type TableProvider = {
    highlightedCells: HighlightedCellsType,
    setHighlightedCells: SetHighlightedCellsType,
    selectedRows: SelectedRowsType,
    setSelectedRows: SetSelectedRowsType,
    tableData: TableDataType,
    setTableData: SetTableDataType,
    hoveredRow: HoveredRowType,
    setHoveredRow: SetHoveredRowType,
    hoveredRowId: HoveredRowIdType,
    setHoveredRowId: SetHoveredRowIdType,
};

export type HoveredRowIdType = number;
export type SetHoveredRowIdType = Dispatch<number>;
export type SetHoveredRowType = Dispatch<TableCell[]>;
export type HoveredRowType = TableCell[];
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