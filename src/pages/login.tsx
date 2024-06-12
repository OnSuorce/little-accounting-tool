// pages/auth.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { FileUpload } from 'primereact/fileupload';
import { motion, AnimatePresence } from 'framer-motion';
import {Divider} from "primereact/divider";
import {loginRequest, signupRequest} from "@/redux/slice/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState<File | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state: RootState) => state.user);


    const handleLogin = () => {
        dispatch(loginRequest({ email, password }));
    };

    const handleSignup = () => {
        dispatch(signupRequest({ email, password, username, avatar }));
    };

    const onAvatarUpload = (e: any) => {
        setAvatar(e.files[0]);
    };

    return (
        <div className="centered-container full-height">
            <div className="card-container">
                <div className="card-header">
                    <h3> LAT </h3>
                </div>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="Login">
                        <AnimatePresence mode='wait'>
                            {activeIndex === 0 && (
                                <motion.div
                                    key="login"
                                    initial={{opacity: 0, x: 100}}
                                    animate={{opacity: 1, x: 0}}
                                    exit={{opacity: 0, x: -100}}
                                    transition={{duration: 0.3}}
                                    className="tab-content"
                                >
                                    {error && <Message severity="error" text={error}/>}
                                    <div className="p-field">
                                        <label htmlFor="login-email">Email</label>
                                        <InputText
                                            id="login-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            className="p-inputtext-lg"
                                        />
                                    </div>
                                    <div className="p-field">
                                        <label htmlFor="login-password">Password</label>
                                        <Password
                                            id="login-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            feedback={false}
                                            className="p-password"
                                        />
                                    </div>
                                    <Divider></Divider>
                                    <Button label="Login" icon="pi pi-check" onClick={handleLogin}
                                            className="p-button-lg"/>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </TabPanel>
                    <TabPanel header="Sign Up">
                        <AnimatePresence mode='wait'>
                            {activeIndex === 1 && (
                                <motion.div
                                    key="signup"
                                    initial={{opacity: 0, x: 100}}
                                    animate={{opacity: 1, x: 0}}
                                    exit={{opacity: 0, x: -100}}
                                    transition={{duration: 0.3}}
                                    className="tab-content"
                                >
                                    {error && <Message severity="error" text={error}/>}
                                    <div className="p-field">
                                        <label htmlFor="signup-username">Username</label>
                                        <InputText
                                            id="signup-username"
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Username"
                                            className="p-inputtext-lg"
                                        />
                                    </div>
                                    <div className="p-field">
                                        <label htmlFor="signup-email">Email</label>
                                        <InputText
                                            id="signup-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            className="p-inputtext-lg"
                                        />
                                    </div>
                                    <div className="p-field">
                                        <label htmlFor="signup-password">Password</label>
                                        <Password
                                            id="signup-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            feedback={false}
                                            className="p-password"
                                        />
                                    </div>
                                    <div className="p-field">
                                        <label htmlFor="signup-avatar">Avatar</label>
                                        <FileUpload
                                            id="signup-avatar"
                                            customUpload
                                            uploadHandler={onAvatarUpload}
                                            auto
                                            accept="image/*"
                                            chooseLabel="Choose Avatar"
                                            mode="basic"
                                        />
                                    </div>
                                    <Divider></Divider>
                                    <Button label="Sign Up" icon="pi pi-check" onClick={handleSignup}
                                            className="p-button-lg"/>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default Auth;
