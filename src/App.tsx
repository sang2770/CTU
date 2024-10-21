import { useTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/JWTContext';
import './locale/i18n';
import './styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';
import ThemeCustomization from './themes';

import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
    const theme = useTheme()
    return (
        <ThemeCustomization>
            <Router>
                <AuthProvider>
                    <Routes />
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme={theme.palette.mode}
                    />
                </AuthProvider>
            </Router>


        </ThemeCustomization>

    )
};

export default App;
