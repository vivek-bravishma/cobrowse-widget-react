import React from 'react';
import './App.css';
import Cobrowse from './components/Cobrowse';
import '@avaya/neo-react/avaya-neo-react.css';
function App() {
    return (
        <div className='App'>
            <Cobrowse interactionId='placeHolderInteractionID' />
        </div>
    );
}

export default App;
