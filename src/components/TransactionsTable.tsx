// components/TransactionsTable.tsx
import React from 'react';
import { DataTable, DataTableValue } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

interface Transaction {
    id: number;
    date: string;
    type: string;
    value: number;
    categories: string[];
}

interface TransactionsTableProps {
    transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
    const actionTemplate = (rowData: Transaction) => {
        return (
            <div>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-text" />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text" />
            </div>
        );
    };

    return (
        <DataTable value={transactions} paginator showGridlines size="small" rows={10} className="p-datatable-gridlines">
            <Column sortable field="id" header="No" />
            <Column field="date" header="Date" />
            <Column field="type" header="Type" />
            <Column sortable field="value" header="Value" />
            <Column field="categories" header="Categories" body={(rowData) => rowData.categories.join(', ')} />
            <Column body={actionTemplate} header="Actions" />
        </DataTable>
    );
};

export default TransactionsTable;
