// components/TransactionsTable.tsx
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import {Column} from "primereact/column";

interface Transaction {
    id: number;
    date: string;
    type: string;
    value: number;
    categories: string[];
}

interface TransactionsTableProps {
    transactions: Transaction[];
    onEdit: (transaction: Transaction) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, onEdit }) => {
    const actionTemplate = (rowData: Transaction) => {
        return (
            <div>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-text" onClick={() => onEdit(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text" />
            </div>
        );
    };

    return (
        <DataTable value={transactions} paginator rows={10} className="p-datatable-gridlines p-datatable-striped" responsiveLayout="scroll">
            <Column field="id" header="No" sortable filter filterPlaceholder="Search by No" />
            <Column field="date" header="Date" sortable filter filterPlaceholder="Search by Date" />
            <Column field="type" header="Type" sortable filter filterPlaceholder="Search by Type" />
            <Column field="value" header="Value" sortable filter filterPlaceholder="Search by Value" />
            <Column field="categories" header="Categories" body={(rowData) => rowData.categories.join(', ')} sortable filter filterPlaceholder="Search by Categories" />
            <Column body={actionTemplate} header="Actions" />
        </DataTable>
    );
};

export default TransactionsTable;
