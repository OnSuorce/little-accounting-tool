// components/UserMenu.tsx
"use client";

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';

const UserMenu: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const op = useRef<OverlayPanel>(null);

    const onLogout = () => {
        // Add your logout logic here
    };

    return (
        <div>
            {user && (
                <div className="p-d-flex p-ai-center" onClick={(e) => op.current?.toggle(e)}>
                    <Avatar image={user.avatar} shape="circle" className="p-mr-2" />
                    <span>{user.username}</span>
                    <OverlayPanel ref={op}>
                        <div className="p-d-flex p-flex-column">
                            <Button label="Profile" icon="pi pi-user" className="p-button-text p-mb-2" />
                            <Button label="Logout" icon="pi pi-sign-out" className="p-button-text" onClick={onLogout} />
                        </div>
                    </OverlayPanel>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
