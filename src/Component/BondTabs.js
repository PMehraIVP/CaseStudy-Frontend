import React, { useState } from 'react'
import { useEffect ,useContext} from 'react'
import axios from 'axios'
import { Button, Box } from "@mui/material";
import "./CustomTable.css"
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { Link } from 'react-router-dom';
import { TableContext } from "../App";

const BondTabs = () => {
    const [data,setData] = useState([])
    const [securitySummary, setSecuritySummary] = useState(false);
    const [securityIdentifier, setSecurityIdentifier] = useState(false);
    const [securityDetails, setSecurityDetails] = useState(false);
    const [risk, setRisk] = useState(false);
    const [regulatoryDetails, setRegulatoryDetails] = useState(false);
    const [referenceData, setReferenceData] = useState(false);
    const [putSchedule, setPutSchedule] = useState(false);
    const [pricingAndAnalytics, setPricingAndAnalytics] = useState(false);
    const [callSchedule, setCallSchedule] = useState(false);

    const { showTable, setShowTable } = useContext(TableContext);
    useEffect(()=>{
        if(securitySummary)
        {axios.get(`https://localhost:7220/Bonds/BondsTable/getDataByColumn/Security%20Summary`)
        .then(res=>{
            console.log(res.data)
            setData(prevData => [...res.data]);
            console.log(typeof res.data)
        })
        .catch(err=>{ console.log(err)})
       }
      return ()=>{setSecuritySummary(false)}
      },[securitySummary])
      
       useEffect(()=>{
        if(securityIdentifier)
        {axios.get(`https://localhost:7220/Bonds/BondsTable/getDataByColumn/Security%20Identifier`)
        .then(res=>{
            console.log(res.data)
            setData(prevData => [...res.data]);
            console.log(typeof res.data)
        })
        .catch(err=>{ console.log(err)})
       }
       return ()=>{setSecurityIdentifier(false)}
      },[securityIdentifier])
    
       useEffect(()=>{
        if(securityDetails){axios.get(`https://localhost:7220/Bonds/BondsTable/getDataByColumn/Security%20Details`)
        .then(res=>{
            console.log(res.data)
            setData(prevData => [...res.data]);
            console.log(typeof res.data)
        })
        .catch(err=>{ console.log(err)})
       }
       return ()=>{setSecurityDetails(false)}
      },[securityDetails])
    
       useEffect(()=>{
        if(risk)
        {axios.get(`https://localhost:7220/Bonds/BondsTable/getDataByColumn/Risk`)
        .then(res=>{
            console.log(res.data)
            setData(prevData => [...res.data]);
            console.log(typeof res.data)
        })
        .catch(err=>{ console.log(err)})
       }return ()=>{setSecurityDetails(false)}
      } ,[risk])
    
       useEffect(()=>{
        if(regulatoryDetails)
        {axios.get(`https://localhost:7220/Bonds/BondsTable/getDataByColumn/Regulatory%20Details`)
        .then(res=>{
            console.log(res.data)
            setData(prevData => [...res.data]);
            console.log(typeof res.data)
        })
        .catch(err=>{ console.log(err)})
       }
       return ()=>{setRegulatoryDetails(false)}
      },[regulatoryDetails])
    
       useEffect(()=>{
        if(referenceData)
        {axios.get(`https://localhost:7220/Bonds/BondsTable/getDataByColumn/Reference%20Data`)
        .then(res=>{
            console.log(res.data)
            setData(prevData => [...res.data]);
            console.log(typeof res.data)
        })
        .catch(err=>{ console.log(err)})
       }
       return ()=>{setReferenceData(false)}
      },[referenceData])
       
       useEffect(()=>{
       if(pricingAndAnalytics)
       { axios.get(`https://localhost:7220/Bonds/BondsTable/getDataByColumn/Pricing%20and%20Analytics`)
        .then(res=>{
            console.log(res.data)
            setData(prevData => [...res.data]);
            console.log(typeof res.data)
        })
        .catch(err=>{ console.log(err)})
       }
       return ()=>{setPricingAndAnalytics(false)}
      },[pricingAndAnalytics])
    
       useEffect(()=>{
        if(putSchedule){axios.get(`https://localhost:7220/Bonds/BondsTable/getDataByColumn/Put%20Schedule`)
        .then(res=>{
            console.log(res.data)
            setData(prevData => [...res.data]);
            console.log(typeof res.data)
        })
        .catch(err=>{ console.log(err)})
       }
       return ()=>{setPutSchedule(false)}
      },[putSchedule])
    
       useEffect(()=>{
        if(callSchedule){axios.get(`https://localhost:7220/Bonds/BondsTable/getDataByColumn/Call%20Schedule`)
        .then(res=>{
            console.log(res.data)
            setData(prevData => [...res.data]);
            console.log(typeof res.data)
        })
        .catch(err=>{ console.log(err)})
       }return ()=>{setCallSchedule(false)}
      },[callSchedule])

  return (
    <div>
      <Box sx={{ display: "flex", backgroundColor: "#4A5A63", padding: "10px", gap: "10px" }}>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setSecuritySummary(true); }}>Security Summary</Button>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setSecurityIdentifier(true); }}>Security Identifier</Button>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setSecurityDetails(true); }}>Security Details</Button>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setRisk(true); }}>Risk</Button>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setRegulatoryDetails(true); }}>Regulatory Details</Button>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setReferenceData(true); }}>Reference Data</Button>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setPutSchedule(true); }}>Put Details</Button>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setPricingAndAnalytics(true); }}>Pricing And Analytics</Button>
      <Button sx={{ backgroundColor: "#5B6B75", color: "white" }} onClick={() => { setData([]); setCallSchedule(true); }}>Call Schedule</Button>
     
      <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 2 }} fontSize="large" >
        <Button sx={{ backgroundColor: "#5B6B75", color: "white" }}  onClick={() => setShowTable(!showTable)}>
        {showTable ? "Hide Table" : "Show Table"}
         </Button>

        <Link to="/addBond">
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
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
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

export default BondTabs
