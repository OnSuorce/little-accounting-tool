// pages/transactions.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import TransactionsTable from '../components/TransactionsTable';
import TransactionModal from '../components/TransactionModal';
import { Button } from 'primereact/button';

const transactionsData = [
    {
        id: 1,
        date: '2024-01-01',
        type: 'Income',
        value: 1000,
        categories: [
            { icon: 'pi pi-apple', label: 'Apple', name: 'apple', parent: null, color: '#ffb6c1' }
        ],
    },
    {
        id: 2,
        date: '2024-01-02',
        type: 'Expense',
        value: 200,
        categories: [
            { icon: 'pi pi-facebook', label: 'Facebook', name: 'facebook', parent: null, color: '#add8e6' }
        ],
    },
    {
        id: 3,
        date: '2024-01-03',
        type: 'Income',
        value: 500,
        categories: [
            { icon: 'pi pi-google', label: 'Google', name: 'google', parent: null, color: '#90ee90' }
        ],
    },
    {
        id: 4,
        date: '2024-01-04',
        type: 'Expense',
        value: 100,
        categories: [
            { icon: 'pi pi-microsoft', label: 'Microsoft', name: 'microsoft', parent: null, color: '#ffcc00' }
        ],
    },
];

const Transactions = () => {
    const [transactions, setTransactions] = useState(transactionsData);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<null | Transaction>(null);
    const user = useSelector((state: RootState) => state.user.user);

    const handleAddTransaction = (transaction: { date: string; type: string; value: number; categories: string[] }) => {
        if (editingTransaction) {
            setTransactions(transactions.map(t => t.id === editingTransaction?.id ? { ...t, ...transaction } : t));
            setEditingTransaction(null);
        } else {
            setTransactions([...transactions, { id: transactions.length + 1, ...transaction }]);
        }
    };

    const handleEditTransaction = (transaction: Transaction) => {
        setEditingTransaction(transaction);
        setIsModalVisible(true);
    };



    return (
        <div>
            <h1>Transactions</h1>
            <Button label="Add Transaction" icon="pi pi-plus" onClick={() => { setEditingTransaction(null); setIsModalVisible(true); }} />
            <TransactionsTable transactions={transactions} onEdit={handleEditTransaction} />
            <TransactionModal
                visible={isModalVisible}
                onHide={() => setIsModalVisible(false)}
                onSave={handleAddTransaction}
                initialData={editingTransaction || undefined}
            />
        </div>
    );
};

export default Transactions;
