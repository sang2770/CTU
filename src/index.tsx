
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { ConfigProvider } from './contexts/ConfigContext';
import { META_DATA } from './constant';
import { store } from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
    <Provider store={store}>
        <ConfigProvider>
            {/* <BrowserRouter basename={BASE_PATH}> */}
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover" />
                    <meta name="theme-color" content="#1FC7D4" />
                    <meta name="twitter:title" content={META_DATA.title} />
                    <meta name="twitter:image" content={META_DATA.image} />
                    <meta name="description" content={META_DATA.description} />
                    <meta name="msapplication-navbutton-color" content="#ffffff" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="keywords" content={META_DATA.keyword} />
                    <meta name="author" content={META_DATA.author} />
                    <meta property="og:title" content={META_DATA.title} />
                    <meta property="og:description" content={META_DATA.description} />
                    <meta property="og:image" content={META_DATA.image} />
                    <meta property="og:url" content={META_DATA.url} />
                    <title>{META_DATA.title}</title>
                    <link rel="icon" href={META_DATA.icon} />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=K2D:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@160..700&display=swap"/>
                </Helmet>
                <App />
            {/* </BrowserRouter> */}
        </ConfigProvider>
    </Provider>
)

reportWebVitals()
