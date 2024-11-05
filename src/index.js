import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import Layout from './components/common/layout/layout';
import { UserContextProvider } from './context/userContext';
import { Analytics } from "@vercel/analytics/react"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Analytics/>
        <UserContextProvider>
          <Layout>
            <App />
          </Layout>
        </UserContextProvider>
    </BrowserRouter>
);