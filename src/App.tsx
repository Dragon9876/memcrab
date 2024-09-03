import './App.css'
import { TopTable, Table } from "./components";
import {
    HoveredRowType,
    SelectedRowsType, SetHighlightedCellsType, SetHoveredRowIdType, SetHoveredRowType,
    SetSelectedRowsType, SetTableDataType,
    TableCell,
    TableDataType
} from "./components/table/types.ts";

function App() {
    const getRowSum = (row: TableCell[]) => row.reduce((sum, item) => sum + item?.value, 0);

    const getColumnAverage = (tableData:  TableDataType, colIndex: number) => {
        const columnSum = tableData.reduce((sum, row) => sum + row[colIndex].value, 0);
        return columnSum / 2;
    };

    const handleCellClick = (setTableData: SetTableDataType, rowIndex: number, colIndex: number) => {
        setTableData(prevData =>
            prevData.map((row, rIdx) =>
                row.map((cell, cIdx) =>
                    rIdx === rowIndex && cIdx === colIndex
                        ? { ...cell, value: cell.value + 1 }
                        : cell
                )
            )
        );
    };

    const handleCheckboxToggle = (
        setSelectedRows: SetSelectedRowsType,
        selectedRows: SelectedRowsType,
        rowIndex: number,
    ) => {
        if(!selectedRows.includes(rowIndex)) {
            setSelectedRows(prevSelectedRows => [...prevSelectedRows, rowIndex]);
        } else {
            setSelectedRows(prevSelectedRows => prevSelectedRows.filter(index => index !== rowIndex));
        }
    }

    const handleCellHover = (hoveredCell: TableCell, tableData: TableDataType, setHighlightedCells: SetHighlightedCellsType) => {
        const values = tableData.flatMap(row => row.map(cell => cell.value));
        const closestCells = values
            .map(value => ({ value, diff: Math.abs(value - hoveredCell.value) }))
            .sort((a, b) => a.diff - b.diff)
            .slice(1, 5)
            .map(item => item.value);

        const closestCellIds = tableData.flatMap(row =>
            row.filter(cell => closestCells.includes(cell.value)).map(cell => cell.id)
        );

        setHighlightedCells(new Set(closestCellIds));
    };

    const handleSumHover = (tableData: TableDataType, setTableData: SetTableDataType, rowIndex: number, setHoveredRow: SetHoveredRowType, setHoveredRowId: SetHoveredRowIdType) => {
        setHoveredRowId(rowIndex);
        setHoveredRow(tableData[rowIndex]);

        setTableData(prevData =>
            prevData.map((row, rIdx) =>
                rIdx === rowIndex
                    ? row.map(cell => ({
                        ...cell,
                        value: Math.floor(Math.random() * 101)// Random percentage (0 to 100)
                    }))
                    : row
            )
        );
    }

    const handleSumHoverOut = (setTableData: SetTableDataType, rowIndex: number, hoveredRow: HoveredRowType, setHoveredRow: SetHoveredRowType, setHoveredRowId: SetHoveredRowIdType) => {
        setTableData(prevData =>
            prevData.map((row, rIdx) =>
                rIdx === rowIndex
                    ? hoveredRow
                    : row
            )
        );

        setHoveredRow([]);
        setHoveredRowId(-1);
    }

    return (
        <Table>
            <Table.TableTop>
                {({ setTableData, selectedRows, setSelectedRows }) => {
                    return <TopTable setTableData={setTableData} selectedRows={selectedRows} setSelectedRows={setSelectedRows}  />
                }}
            </Table.TableTop>

            <Table.TableInner>
                <Table.TableHeader>
                    {({ tableData }) => {
                        return tableData.length != 0 && <Table.TableRow>
                            <Table.TableCell isHeader></Table.TableCell>
                            <Table.TableCell isHeader>Checkbox</Table.TableCell>
                            {
                                tableData[0]?.map((_, columnIndex) => <Table.TableCell key={columnIndex} isHeader>N = {columnIndex}</Table.TableCell>)
                            }

                            <Table.TableCell isHeader>Sum values</Table.TableCell>
                        </Table.TableRow>
                    }}
                </Table.TableHeader>
                <Table.TableBody>
                    {
                        ({ hoveredRowId, setHoveredRowId, setHoveredRow, hoveredRow, tableData, setTableData, setSelectedRows, selectedRows , highlightedCells, setHighlightedCells}) => {
                            return tableData.length != 0 && <>
                                {
                                    tableData.map((tableRow, rowIndex) => (
                                        <Table.TableRow key={rowIndex}>
                                            <Table.TableCell>M - {rowIndex}</Table.TableCell>
                                            <Table.TableCell isHeader>
                                                <input type='checkbox' checked={selectedRows.includes(rowIndex)} onChange={() => handleCheckboxToggle(setSelectedRows, selectedRows, rowIndex)} />
                                            </Table.TableCell>
                                            {tableRow.map((tableCell, columnIndex) => (
                                                <Table.TableCell
                                                    key={tableCell.id}
                                                    style={{
                                                        backgroundColor: rowIndex === hoveredRowId
                                                            ? `rgba(255, 0, 0, ${tableCell.value / 100})` // Red background with opacity based on value
                                                            : highlightedCells.has(tableCell.id)
                                                                ? 'yellow'
                                                                : 'transparent'
                                                    }}
                                                >
                                                    <button
                                                        onClick={() => handleCellClick(setTableData, rowIndex, columnIndex)}
                                                        onMouseOver={() => handleCellHover(tableCell, tableData, setHighlightedCells)}
                                                        onMouseLeave={() => setHighlightedCells(new Set())}
                                                    >
                                                        {tableCell.value}{ hoveredRowId != -1 && rowIndex === hoveredRowId ? '%' : ''}
                                                    </button>
                                                </Table.TableCell>
                                            ))}

                                            <Table.TableCell>
                                                <button
                                                    onMouseOver={() => handleSumHover(tableData, setTableData, rowIndex, setHoveredRow, setHoveredRowId)}
                                                    onMouseLeave={() => handleSumHoverOut(setTableData, rowIndex, hoveredRow, setHoveredRow, setHoveredRowId)}
                                                >
                                                    {getRowSum(tableRow)}{ hoveredRowId != -1 && rowIndex === hoveredRowId ? '%' : ''}
                                                </button>
                                            </Table.TableCell>
                                        </Table.TableRow>
                                    ))
                                }

                                <Table.TableRow>
                                    <Table.TableCell>Average values</Table.TableCell>
                                    <Table.TableCell></Table.TableCell>
                                    { Array.from({ length: tableData[0]?.length || 0 }, (_, colIndex) => (
                                        <Table.TableCell key={colIndex}>
                                            {getColumnAverage(tableData, colIndex)}
                                        </Table.TableCell>
                                    ))}
                                    <Table.TableCell></Table.TableCell>
                                </Table.TableRow>
                            </>
                        }
                    }
                </Table.TableBody>
            </Table.TableInner>
        </Table>
  )
}

export default App
