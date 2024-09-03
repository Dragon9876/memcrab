import type { FC, ReactNode, CSSProperties } from 'react';
import { useState, memo } from 'react';
import { TableContext, useTableContext } from "./TableProvider.tsx";
import type {
    TableProvider,
    HoveredRowType,
    HighlightedCellsType,
    TableDataType,
    SelectedRowsType,
    HoveredRowIdType
} from "./types.ts";


interface TypeTableTopProps {
    children: (params: TableProvider) => ReactNode; 
}

interface TypeTableBodyProps {
    children: (params: TableProvider) => ReactNode; 
}
interface TypeTableHeaderProps {
    children: (params: TableProvider) => ReactNode; 
}

interface TypeTableContainerProps {
    children: ReactNode; 
};

interface TypeTableProps {
    children: ReactNode; 
};

interface TypeTableRowProps  {
    children: ReactNode; 
};

interface TypeTableCellProps {
    children?: ReactNode; 
    style?: CSSProperties,
    isHeader?: boolean
}

const TableContainer: FC<TypeTableContainerProps> = memo(({ children }) => {
    const [hoveredRowId, setHoveredRowId] = useState<HoveredRowIdType>(-1);
    const [hoveredRow, setHoveredRow] = useState<HoveredRowType>([]);
    const [highlightedCells, setHighlightedCells] = useState<HighlightedCellsType>(new Set());
    const [tableData, setTableData] = useState<TableDataType>([]);
    const [selectedRows, setSelectedRows] = useState<SelectedRowsType>([]);

    return <TableContext.Provider value={{
        tableData,
        setTableData,
        selectedRows,
        setSelectedRows,
        highlightedCells,
        setHighlightedCells,
        hoveredRow,
        setHoveredRow,
        hoveredRowId,
        setHoveredRowId,
    }}>
        {children}
    </TableContext.Provider>
})

const TableTop: FC<TypeTableTopProps> = memo(({ children }) => {
    const context = useTableContext();
    return <div>
        {children(context)}
    </div>
})

// Table Component
const TableInner: FC<TypeTableProps> = memo(({ children }) => {
    return <table style={{ width: '100%', borderCollapse: 'collapse' }}>{ children }</table>;
});

// TableHeader Component
const TableHeader: FC<TypeTableHeaderProps> = memo(({ children }) => {
    const context = useTableContext();
    return <thead style={{ backgroundColor: '#f2f2f2' }}>{ children(context) }</thead>;
});

// TableBody Component
const TableBody: FC<TypeTableBodyProps> = memo(({ children }) => {
    const context = useTableContext();
    return <tbody>{ children(context) }</tbody>;
});

// TableRow Component
const TableRow: FC<TypeTableRowProps> = memo(({ children, ...rest }) => {
    return <tr {...rest}>{children}</tr>;
});

// TableCell Component
const TableCell: FC<TypeTableCellProps> = memo(({ children, isHeader, style, ...rest }) => {
    return isHeader ? (
        <th style={{ color: 'black', border: '1px solid #ddd', padding: '8px', ...style }} {...rest}>{children}</th>
    ) : (
        <td style={{ border: '1px solid #ddd', padding: '8px', ...style }} {...rest}>{children}</td>
    );
});

export const Table = Object.assign(TableContainer, {
    TableInner, TableHeader, TableBody, TableRow, TableCell, TableTop
})
