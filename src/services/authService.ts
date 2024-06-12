// services/authService.ts
import pb from '@/lib/pocketbase';

export const login = async (email: string, password: string) => {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        const user = {
            email: authData.record.email,
            username: authData.record.username,
            avatar: authData.record.avatar,
        };
        localStorage.setItem('token', authData.token);
        return user;
    } catch (error) {
        throw error;
    }
};

export const signup = async (email: string, password: string, username: string, avatar: File | null) => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('username', username);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        await pb.collection('users').create(formData);
        const authData = await pb.collection('users').authWithPassword(email, password);
        const user = {
            email: authData.record.email,
            username: authData.record.username,
            avatar: authData.record.avatar,
        };
        localStorage.setItem('token', authData.token);
        return user;
    } catch (error) {
        throw error;
    }
};
