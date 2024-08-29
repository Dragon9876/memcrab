import {ComponentPropsWithoutRef, FC, memo, ReactNode, useState} from 'react';
import { TableContext, useTableContext } from "./TableProvider.tsx";
import { TableProvider } from "./types.ts";

type ChildrenFunctionType = (params: TableProvider) => ReactNode;

interface ITableProps<T> extends ComponentPropsWithoutRef<T> {
    children: ReactNode,
}

interface TypeTableTopProps extends ComponentPropsWithoutRef<'div'> {
    children: ChildrenFunctionType
}

interface TypeTableBodyProps extends ComponentPropsWithoutRef<'tbody'> {
    children: ChildrenFunctionType
}

interface TypeTableHeaderProps extends ComponentPropsWithoutRef<'thead'> {
    children: ChildrenFunctionType
}

type TypeTableContainerProps = ITableProps<'div'>;
type TypeTableProps = ITableProps<'table'>;
type TypeTableRowProps = ITableProps<'tr'>;

const TableContainer: FC<TypeTableContainerProps> = memo(({ children}) => {
    const [previousRowId, setPreviousRowId] = useState(-1);
    const [previousRow, setPreviousRow] = useState([]);
    const [highlightedCells, setHighlightedCells] = useState(new Set());
    const [tableData, setTableData] = useState([[]]);
    const [selectedRows, setSelectedRows] = useState([]);

    return <TableContext.Provider value={{
        tableData,
        setTableData,
        selectedRows,
        setSelectedRows,
        highlightedCells,
        setHighlightedCells,
        previousRow,
        setPreviousRow,
        previousRowId,
        setPreviousRowId,
    }}>
        {children}
    </TableContext.Provider>
})

const TableTop: FC<TypeTableTopProps> = memo(({ children}) => {
    const context = useTableContext();
    return <div>
        {children(context)}
    </div>
})

// Table Component
const TableInner: FC<TypeTableProps> = memo(({ children }) => {
    return <table style={{ width: '100%', borderCollapse: 'collapse' }}>{children}</table>;
});

// TableHeader Component
const TableHeader: FC<TypeTableHeaderProps> = memo(({ children }) => {
    const context = useTableContext();
    return <thead style={{ backgroundColor: '#f2f2f2' }}>{children(context)}</thead>;
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
const TableCell: FC<{ children: ReactNode; isHeader?: boolean }> = memo(({ children, isHeader, style, ...rest }) => {
    return isHeader ? (
        <th style={{ color: 'black', border: '1px solid #ddd', padding: '8px', ...style }} {...rest}>{children}</th>
    ) : (
        <td style={{ border: '1px solid #ddd', padding: '8px', ...style }} {...rest}>{children}</td>
    );
});

export const Table = Object.assign(TableContainer, {
    TableInner, TableHeader, TableBody, TableRow, TableCell, TableTop
})
