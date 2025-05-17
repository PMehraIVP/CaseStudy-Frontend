import React, { useState } from 'react'
import { useEffect,useContext } from 'react'
import axios from 'axios'
import { Button, Box } from "@mui/material";
import "./CustomTable.css"
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { Link } from 'react-router-dom';

import { TableContext } from "../App";

const Tabs = () => {
const [data,setData] = useState([])
const [securitySummany, setSecuritySummary] = useState(false);
const [securityIdentifier, setSecurityIdentifier] = useState(false);
const [securityDetails, setSecurityDetails] = useState(false);
const [risk, setRisk] = useState(false);
const [regulatoryDetails, setRegulatoryDetails] = useState(false);
const [referenceData, setReferenceData] = useState(false);
const [pricingDetails, setPricingDetails] = useState(false);
const [dividendHistory, setDividendHistory] = useState(false);

const { showTable, setShowTable } = useContext(TableContext);

  useEffect(()=>{
    if(securitySummany)
    {axios.get(`https://localhost:7220/Equity/EquityTable/getData/security%20summary`)
    .then(res=>{
        setData(prevData => [...res.data]);
    })
    .catch(err=>{ console.log(err)})}
    return () => setSecuritySummary(false);
   },[securitySummany])
  
   useEffect(()=>{
    if(securityIdentifier){
    axios.get(`https://localhost:7220/Equity/EquityTable/getData/security%20identifier`)
    .then(res=>{
        setData(prevData => [...res.data]);  
    })
    .catch(err=>{ console.log(err)})}
    return () => setSecurityIdentifier(false);
   },[securityIdentifier])

   useEffect(()=>{
    if(securityDetails){
    axios.get(`https://localhost:7220/Equity/EquityTable/getData/security%20details`)
    .then(res=>{
        setData(prevData => [...res.data]);
        console.log("sec det =>", res.data)
    })
    .catch(err=>{ console.log(err)})}
    return () => setSecurityDetails(false);
   },[securityDetails])


   useEffect(()=>{
    if(risk)
    {axios.get(`https://localhost:7220/Equity/EquityTable/getData/Risk`)
    .then(res=>{
        setData(prevData => [...res.data]);
    })
    .catch(err=>{ console.log(err)})}
    return () => setRisk(false);
   },[risk])

   useEffect(()=>{
    if(regulatoryDetails){
    axios.get(`https://localhost:7220/Equity/EquityTable/getData/Regulatory%20Details`)
    .then(res=>{
        setData(prevData => [...res.data]);
    })
    .catch(err=>{ console.log(err)})
   }
   return () => setRegulatoryDetails(false);
  },[regulatoryDetails])

   useEffect(()=>{
    if(referenceData){
    axios.get(`https://localhost:7220/Equity/EquityTable/getData/Reference%20Data`)
    .then(res=>{
        setData(prevData => [...res.data]);
    })
    .catch(err=>{ console.log(err)})
   }
   return () => setReferenceData(false);
  },[referenceData])

   useEffect(()=>{
    if(pricingDetails){
    axios.get(`https://localhost:7220/Equity/EquityTable/getData/Pricing%20Details`)
    .then(res=>{
        setData(prevData => [...res.data]);
    })
    .catch(err=>{ console.log(err)})
    
   }
   return () => setPricingDetails(false);
  },[pricingDetails])

   useEffect(()=>{
    if(dividendHistory){
    axios.get(`https://localhost:7220/Equity/EquityTable/getData/Dividend%20History`)
    .then(res=>{
        setData(prevData => [...res.data]);
    })
    .catch(err=>{ console.log(err)})
   }
   return () => setDividendHistory(false);
  },[dividendHistory])

 
  return (
    <div >
      <Box sx={{ display: "flex", backgroundColor: "#4A5A63", padding: "10px", gap: "10px" }}>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setSecuritySummary(true); }}>Security Summary</Button>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setSecurityIdentifier(true); }}>Security Identifier</Button>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setSecurityDetails(true); }}>Security Details</Button>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setRisk(true); }}>Risk</Button>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setRegulatoryDetails(true); }}>Regulatory Details</Button>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setReferenceData(true); }}>Reference Data</Button>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setPricingDetails(true); }}>Pricing Details</Button>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setDividendHistory(true); }}>Dividend History</Button>
      
      <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 2 }} fontSize="large" >
        <Button sx={{ backgroundColor: "#5B6B75", color: "white" }}  onClick={() => setShowTable(!showTable)}>
        {showTable ? "Hide Table" : "Show Table"}
         </Button>

        <Link to="/addEquity">
          <AddCircleOutlineSharpIcon fontSize="large" sx={{ color: "white" }} />
        </Link>
      </Box>

      </Box>
  
        <table className="custom-table">
        <thead>
          {data.length > 0 && (
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
            {data.map((row,rowIndex) => (
                <tr key={rowIndex} >
                {Object.values(row).map((value,colIndex) => (
                    <td key={colIndex}>
                      {typeof value === "object" ? "N.A" : value}
                       {/* {value} VALUE MAY BE IN FORM OF object , if backend has null axios take it as empty object*/}
                    </td>
                ))}
                </tr>
            ))}
        </tbody>
      </table>
    
    </div>
  )
}

export default Tabs
