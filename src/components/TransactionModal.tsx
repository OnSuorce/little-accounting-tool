// components/TransactionModal.tsx
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Chip } from 'primereact/chip';

interface Category {
    icon: string;
    label: string;
    name: string;
    parent: string | null;
}

interface Transaction {
    date: string;
    type: string;
    value: number;
    categories: Category[];
}

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

const icons = [
    { label: 'Apple', value: 'pi pi-apple' },
    { label: 'Facebook', value: 'pi pi-facebook' },
    { label: 'Google', value: 'pi pi-google' },
    { label: 'Microsoft', value: 'pi pi-microsoft' },
];

const TransactionModal: React.FC<TransactionModalProps> = ({ visible, onHide, onSave, initialData }) => {
    const [date, setDate] = useState<Date | null>(null);
    const [type, setType] = useState<string>('');
    const [value, setValue] = useState<number | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        if (initialData) {
            setDate(new Date(initialData.date));
            setType(initialData.type);
            setValue(initialData.value);
            setCategories(initialData.categories);
        }
    }, [initialData]);

    const handleSave = () => {
        onSave({
            date: date?.toISOString().split('T')[0] || '',
            type,
            value: value || 0,
            categories
        });
        onHide();
    };

    const addCategory = (icon: string, label: string) => {
        const newCategory = { icon, label, name: label.toLowerCase(), parent: null };
        setCategories([...categories, newCategory]);
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
                    <div className="p-d-flex p-flex-wrap">
                        {categories.map((category, index) => (
                            <Chip key={index} label={category.label} icon={category.icon} className="p-mr-2 p-mb-2" />
                        ))}
                    </div>
                    <div className="p-d-flex p-flex-wrap">
                        {icons.map((icon) => (
                            <Button key={icon.value} label={icon.label} icon={icon.value} className="p-mr-2 p-mb-2" onClick={() => addCategory(icon.value, icon.label)} />
                        ))}
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default TransactionModal;
