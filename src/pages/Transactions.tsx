// pages/transactions.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import {RootState} from "@/redux/store";
import TransactionsTable from '../components/TransactionsTable';

const transactionsData = [
    {
        id: 1,
        date: '2024-01-01',
        type: 'Income',
        value: 1000,
        categories: ['Salary'],
    },
    {
        id: 2,
        date: '2024-01-02',
        type: 'Expense',
        value: 200,
        categories: ['Groceries'],
    },
    {
        id: 3,
        date: '2024-01-03',
        type: 'Income',
        value: 500,
        categories: ['Freelancing'],
    },
    {
        id: 4,
        date: '2024-01-04',
        type: 'Expense',
        value: 100,
        categories: ['Transport'],
    },
];

const Transactions = () => {
    const user = useSelector((state: RootState) => state.user.user);


    return (
        <div>
            <h1>Transactions</h1>
            <TransactionsTable transactions={transactionsData} />
        </div>
    );
};

export default Transactions;
