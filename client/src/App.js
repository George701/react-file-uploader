import React from 'react';
import FileUpload from './components/FileUpload';
import './App.css';


const App = () => (
      <div className="container">
        <h4 className="display-4 text-center react-header-text react-header-background react-header">
            <i className="fab fa-react react-color"/> React File Upload
        </h4>

          <FileUpload/>
      </div>
);


export default App;
