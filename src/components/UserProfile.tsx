// components/UserProfile.tsx
import useSWR from 'swr';
import axios from '../lib/axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const UserProfile = () => {
    const { data, error } = useSWR('/api/user/profile', fetcher);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>{data.name}</h1>
            <p>{data.email}</p>
        </div>
    );
};

export default UserProfile;
