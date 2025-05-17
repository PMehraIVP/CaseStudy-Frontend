import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import "./CustomTable.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TableContext } from "../App";


const HomePage = () => {
  const [data, setData] = useState([]);
  const { showTable } = useContext(TableContext);
  
  useEffect(() => {
    axios.get('https://localhost:7220/Equity/EquityTable/get')
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Outlet/>

      {(data.length > 0 && showTable)? (
        <table className="custom-table">
          <thead>
            <tr>
              <th>securityName</th>
              <th>securityDescription</th>
              <th>hasPosition</th>
              <th>isActive</th>
              <th>roundLotSize</th>
              <th>bloombergUniqueName</th>
              <th>cusip</th>
              <th>isin</th>
              <th>sedol</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.securityId}>
                <td><Link to={`/updateEquity/${item.securityId}`}>{item.securityName}</Link></td>
                <td>{item.securityDescription}</td>
                <td>{item.hasPosition === 1 ? 'True' : 'False'}</td>
                <td>{item.isActive === 1 ? 'True' : 'False'}</td>
                <td>{item.roundLotSize}</td>
                <td>{item.bloombergUniqueName}</td>
                <td>{item.cusip}</td>
                <td>{item.isin}</td>
                <td>{item.sedol}</td>
                <td><Link to={`/viewEquity/${item.securityId}`} style={{ color: 'white' , margin: '0 10px' }}>
                    <VisibilityIcon />
                  </Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>.</p>
      )}
    </div>
  );
};

export default HomePage;
