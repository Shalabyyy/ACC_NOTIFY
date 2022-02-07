import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter } from 'react-router-dom'; 




function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path='/'>
            </Route>
            <Route path="*">
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
