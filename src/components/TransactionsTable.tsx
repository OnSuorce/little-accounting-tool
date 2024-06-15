// components/TransactionsTable.tsx
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import CategoryChips from './CategoryChips';
import {Column} from "primereact/column";

interface Category {
    icon: string;
    label: string;
    name: string;
    parent: string | null;
    color: string;
}

interface Transaction {
    id: number;
    date: string;
    type: string;
    value: number;
    categories: Category[];
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
            <Column header="Categories" body={(rowData) => <CategoryChips categories={rowData.categories} />} sortable filter filterPlaceholder="Search by Categories" />
            <Column body={actionTemplate} header="Actions" />
        </DataTable>
    );
};

export default TransactionsTable;
