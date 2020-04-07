import React from 'react';
import Toolbar from './Components/Navbar/Toolbar';
import Ads from './Components/Ads/Ads';

import './app.css';
function App() {
    return (
        <div>
            <header>
                <Toolbar />
            </header>
            <Ads />
        </div>
    );
}

export default App;
