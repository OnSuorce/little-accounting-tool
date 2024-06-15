// components/TransactionModal.tsx
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';



interface TransactionModalProps {
    visible: boolean;
    onHide: () => void;
    onSave: (transaction: Transaction) => void;
    initialData?: Transaction;
}

const transactionTypes = [
    { label: 'Income', value: 'Income' },
    { label: 'Expense', value: 'Expense' }
];

const TransactionModal: React.FC<TransactionModalProps> = ({ visible, onHide, onSave, initialData }) => {
    const [date, setDate] = useState<Date | null>(null);
    const [type, setType] = useState<string>('');
    const [value, setValue] = useState<number | null>(null);
    const [categories, setCategories] = useState<string>('');

    useEffect(() => {
        if (initialData) {
            setDate(new Date(initialData.date));
            setType(initialData.type);
            setValue(initialData.value);
            setCategories(initialData.categories.join(', '));
        }
    }, [initialData]);

    const handleSave = () => {
        onSave({
            date: date?.toISOString().split('T')[0] || '',
            type,
            value: value || 0,
            categories: categories.split(',').map(cat => cat.trim())
        });
        onHide();
    };

    const renderFooter = () => {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={onHide} className="p-button-text" />
                <Button label="Save" icon="pi pi-check" onClick={handleSave} autoFocus />
            </div>
        );
    };

    return (
        <Dialog header="Add Transaction" visible={visible} style={{ width: '50vw' }} footer={renderFooter()} onHide={onHide}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="date">Date</label>
                    <Calendar id="date" value={date} onChange={(e) => setDate(e.value as Date | null)} dateFormat="yy-mm-dd" showIcon />
                </div>
                <div className="p-field">
                    <label htmlFor="type">Type</label>
                    <Dropdown id="type" value={type} options={transactionTypes} onChange={(e) => setType(e.value)} placeholder="Select a Type" />
                </div>
                <div className="p-field">
                    <label htmlFor="value">Value</label>
                    <InputNumber id="value" value={value} onValueChange={(e: InputNumberValueChangeEvent) => setValue(e.value as number | null)} mode="currency" currency="USD" locale="en-US" />
                </div>
                <div className="p-field">
                    <label htmlFor="categories">Categories</label>
                    <InputText id="categories" value={categories} onChange={(e) => setCategories(e.target.value)} placeholder="Comma separated" />
                </div>
            </div>
        </Dialog>
    );
};

export default TransactionModal;
