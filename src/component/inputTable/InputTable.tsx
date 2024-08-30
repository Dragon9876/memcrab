import type { FC, FormEvent, MouseEvent } from "react";
import { memo, useState } from "react";
import { getRandomNumber, getUniqueId } from "../../helpers";
import {SelectedRowsType, SetSelectedRowsType, SetTableDataType} from "../table/types.ts";

interface InputTableProps {
    setTableData: SetTableDataType,
    selectedRows: SelectedRowsType,
    setSelectedRows: SetSelectedRowsType,
}

export const InputTable: FC<InputTableProps> = memo(({ setTableData, selectedRows, setSelectedRows }) => {
    const [rows, setRows] = useState<number>(0);
    const [columns, setColumns] = useState<number>(0);
    const [isTableGenerated, setIsTableGenerated] = useState<boolean>(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setTableData(
            Array.from({ length: rows }, (_, rowIndex) =>
                Array.from({ length: columns }, (_, colIndex) => ({
                    id: getUniqueId(rowIndex, colIndex),
                    value: getRandomNumber()
                }))
            )
        );

        setRows(0);
        setColumns(0);
        setIsTableGenerated(rows > 0 && columns > 0);
    };

    const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(selectedRows.length == 0) return;

        setTableData(prevDataTable => prevDataTable.filter((_, rowIndex) => !selectedRows.includes(rowIndex)));
        setSelectedRows([]);
    }

    const handleAddNewRow = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setTableData(prevData => {
            const newRowIndex = prevData.length;
            const newRow = Array.from({ length: (prevData[0]?.length || 0) }, (_, colIndex) => ({
                id: getUniqueId(newRowIndex, colIndex),
                value: getRandomNumber()
            }));

            return [...prevData, newRow];
        });
    }

    return <>
        <form onSubmit={handleSubmit} style={{display: 'flex', columnGap: '10px', justifyContent: 'flex-end', padding: '15px 0px'}}>
            <label>
                Rows:
                <input
                    value={rows}
                    min={0}
                    max={100}
                    type="number"
                    name="rows"
                    onChange={(event) => setRows(parseInt(event.target.value))}
                />
            </label>
            <label>
                Columns:
                <input
                    value={columns}
                    min={0}
                    max={100}
                    type="number"
                    name="columns"
                    onChange={(event) => setColumns(parseInt(event.target.value))}
                />
            </label>
            <button type='submit'>Generate</button>
            <button disabled={!selectedRows.length} onClick={handleDelete}>Delete</button>
            <button disabled={!isTableGenerated} onClick={handleAddNewRow}>Add new row</button>
        </form>
    </>
});