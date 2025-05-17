
import './App.css';

import HomePage from './Component/HomePage';
import NavBar from './Component/NavBar';
import { Route, Routes } from 'react-router-dom';
import Tabs from './Component/EquityTabs';
import AddEquity from './Component/AddEquity';
import UpdatePage from './Component/UpdateEquity';
import ViewEquity from './Component/ViewEquity';
import Bond from './Component/Bond';
import ViewBond from './Component/ViewBond';
import AddBond from './Component/AddBond';
import BondTabs from './Component/BondTabs';
import UpdateBond from './Component/UpdateBond';
import NoMatch from './Component/NoMatch';
import React, { useState, createContext} from "react";


export const TableContext = createContext();
function App() {
  const [showTable, setShowTable] = useState(true);

  return (
    <div className="App">
      <TableContext.Provider value={{ showTable, setShowTable }}>
      <NavBar/>
      <Routes>
        <Route path = "/" element={<HomePage/>}>
          <Route index element={<Tabs/>}/>
        </Route>
       
        
        <Route path="/bond" element={<Bond />}>
          <Route index element={<BondTabs/>} />
        </Route>

        <Route path = "/addEquity" element={<AddEquity/>}/>
        <Route path = "/addBond" element={<AddBond/>}/>
        <Route path = "/updateEquity/:id" element={<UpdatePage/>}/>
        <Route path = "/updateBond/:bondName" element={<UpdateBond/>}/>
        <Route path = "/ViewEquity/:id" element={<ViewEquity/>}/>
        <Route path = "/ViewBond/:bondName" element={<ViewBond/>}/>
        <Route path="*" element={<NoMatch/>}/>
      </Routes>
      </TableContext.Provider>
    </div>
  );
}

export default App;
