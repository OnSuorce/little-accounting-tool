// pages/_app.tsx
import 'primereact/resources/themes/viva-light/theme.css'; // o un altro tema a tua scelta
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '@/styles/globals.css'; // Assicurati di avere un file di stili globale
import 'primeflex/primeflex.css'; // Importa gli stili di PrimeFlex
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Navbar from "@/components/Navbar/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Navbar />
            <div className="p-m-3">
                <Component {...pageProps} />
            </div>

        </Provider>
    );
}

export default MyApp;
