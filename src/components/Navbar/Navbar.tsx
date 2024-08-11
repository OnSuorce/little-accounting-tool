// components/Navbar.tsx
"use client";
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import UserMenu from '../UserMenu/UserMenu';

const Navbar: React.FC = () => {
    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            command: () => {
                window.location.hash = '/';
            }
        },
        // Add more menu items here
    ];

    const start = <div className="p-d-flex p-ai-center"><span className="p-mr-2">LAT</span></div>;
    const end = (
        <div className="p-d-flex p-ai-center">
            <UserMenu />
        </div>
    );

    return (
        <Menubar model={items} start={start} end={end} />
    );
};

export default Navbar;
