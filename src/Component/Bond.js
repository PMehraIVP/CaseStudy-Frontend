import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import "./CustomTable.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TableContext } from "../App";


const Bond = () => {
    const [data, setData] = useState([]);
    const { showTable } = useContext(TableContext);

    useEffect(() => {
      axios.get('https://localhost:7220/Bonds/BondsTable/get')
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
      {/* <p>child routes k lie</p> */}
      {(data.length > 0 && showTable)? (
        <table className="custom-table">
          <thead>
            <tr>
            <th>Security Name</th>
              <th>Security Description</th>
              <th>Asset Type</th>
              <th>Investment Type</th>
              <th>Trading Factor</th>
              <th>Pricing Factor</th>
              <th>ISIN</th>
              <th>Bloomberg Ticker</th>
              <th>CUSIP</th>
              <th>SEDOL</th>
              
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr>
                <td><Link to={`/updateBond/${item.securityName}`}>{item.securityName}</Link></td>
                <td>{item.securityDescription}</td>
                <td>{item.assetType}</td>
                <td>{item.investmentType}</td>
                <td>{item.tradingFactor}</td>
                <td>{item.pricingFactor}</td>
                <td>{item.isin}</td>
                <td>{item.bloombergTicker}</td>
                <td>{item.cusip}</td>
                <td>{item.sedol}</td>
               
                <Link to={`/ViewBond/${item.securityName}`} style={{ color: 'white' , margin: '0 10px' }}>
                  <VisibilityIcon />
                </Link>
                {/* {console.log('bond.js main bond page',item.securityName)} */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>.</p>
      )}
    </div>
  )
}

export default Bond
