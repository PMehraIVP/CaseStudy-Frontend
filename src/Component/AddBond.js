import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Select, MenuItem, Button, Typography,InputAdornment } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddBond = () => {
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const navigate = useNavigate();

  // const initialFormState = {
  //   securityDescription: "", securityName: "", assetType: "", investmentType: "", tradingFactor: "", pricingFactor: "", 
  //   isin: "", bloombergTicker: "", bloombergUniqueId: "", cusip: "", sedol: "", firstCouponDate: "", couponCap: "", 
  //   couponFloor: "", couponFrequency: "", couponRate: "", couponType: "", floatSpread: "", isCallable: "", isFixToFloat: "", 
  //   isPutable: "", issueDate: "", lastResetDate: "", maturityDate: "", maximumCallNoticeDays: "", maximumPutNoticeDays: "", 
  //   penultimateCouponDate: "", resetFrequency: "", hasPosition: "", duration: "", volatility30D: "", volatility90D: "", 
  //   convexity: "", averageVolume30D: "", formPfassetClass: "", formPfcountry: "", formPfcreditRating: "", formPfcurrency: "", 
  //   formPfinstrument: "", formPfliquidityProfile: "", formPfmaturity: "", formPfnaicscode: "", formPfregion: "", 
  //   formPfsector: "", formPfsubAssetClass: "", bloombergIndustryGroup: "", bloombergIndustrySubGroup: "", bloombergSector: "", 
  //   issueCountry: "", issueCurrency: "", issuer: "", riskCurrency: "", putDate: "", putPrice: "", askPrice: "", highPrice: "", 
  //   lowPrice: "", openPrice: "", volume: "", bidPrice: "", lastPrice: "", callDate: "", callPrice: ""
  // };
  

  const initialFormState = {
    securityDescription: "Corporate Bond  Long Term Investment", securityName: "Test Bond", assetType: "Bond", investmentType: "Fixed Income", tradingFactor: "1.2", pricingFactor: "0.98", isin: "US1234567890", bloombergTicker: "ABC1234", bloombergUniqueId: "BBG00012345", cusip: "123456789", sedol: "B123456", firstCouponDate: "2025-05-15", couponCap: "5.0", couponFloor: "3.0", couponFrequency: "Quarterly", couponRate: "4.5", couponType: "Fixed", floatSpread: "0.25", isCallable: "true", isFixToFloat: "false", isPutable: "true", issueDate: "2023-06-01", lastResetDate: "2024-06-01", maturityDate: "2025-06-01", maximumCallNoticeDays: "30", maximumPutNoticeDays: "30", penultimateCouponDate: "2025-03-01", resetFrequency: "Annually", hasPosition: "true", duration: "4.5", volatility30D: "0.15", volatility90D: "0.18", convexity: "0.8", averageVolume30D: "1000000", formPfassetClass: "Investment Grade", formPfcountry: "United States", formPfcreditRating: "AA", formPfcurrency: "USD", formPfinstrument: "Fixed Rate Bond", formPfliquidityProfile: "High Liquidity", formPfmaturity: "2025", formPfnaicscode: "522110", formPfregion: "North America", formPfsector: "Financials", formPfsubAssetClass: "Corporate Bonds", bloombergIndustryGroup: "Banking", bloombergIndustrySubGroup: "Investment Banking", bloombergSector: "Financial Services", issueCountry: "United States", issueCurrency: "USD", issuer: "ABC Corporation", riskCurrency: "USD", putDate: "2025-06-01", putPrice: "100.5", askPrice: "101.2", highPrice: "102.0", lowPrice: "99.0", openPrice: "100.0", volume: "500000", bidPrice: "100.8", lastPrice: "101.0", callDate: "2025-03-01", callPrice: "102.0"
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let key in formData) {
      // String check
      if ([
      "securityDescription", "securityName", "assetType", "investmentType",
      "couponFrequency", "couponType", "resetFrequency",
      "formPfassetClass", "formPfcountry", "formPfcreditRating",
      "formPfcurrency", "formPfinstrument", "formPfliquidityProfile",
       "formPfregion", "formPfsector",
      "formPfsubAssetClass", "bloombergIndustryGroup", "bloombergIndustrySubGroup",
      "bloombergSector", "issueCountry", "issueCurrency", "issuer", "riskCurrency",
      "isin", "bloombergTicker"
        ].includes(key)) {
        let value = String(formData[key]);
        if (!isNaN(value) && value.trim() !== "") {
          alert(`${key} must not be a number `);
          return;
        } 
        for (let char of value) {
          let asci = char.charCodeAt(0);
          if (
            !(asci >= 48 && asci <= 57) &&  // nums
            !(asci >= 65 && asci <= 90) &&  // caps
            !(asci >= 97 && asci <= 122) && // smalls
            !(asci === 32 || asci === 44 || asci === 46 || asci === 95) // space_,.
          ) {
            alert(`Recheck value entered for ${key} attribute`);
            return;
          }
        }     
      } 
     
    // Handle empty values
    if (formData[key] === "" && !["securityName", "couponType", "formPfassetClass", 
    "formPfcurrency", "assetType", "issueDate","maturityDate"].includes(key)) {
    formData[key] = null;
  } else if (formData[key] === "") {
    alert(`Please enter ${key} value`);
    return;
  }
  

    // Number field check
    if ([,"formPfmaturity", "couponCap", "couponFloor","couponRate", "floatSpread","maximumCallNoticeDays", "maximumPutNoticeDays",
    "duration", "volatility30D", "volatility90D", "convexity", "averageVolume30D",
    "putPrice", "askPrice", "highPrice", "lowPrice", "openPrice", "volume",
    "bidPrice", "lastPrice", "callPrice"]
        .includes(key)) {
          if (formData[key] !== null && (isNaN(parseFloat(formData[key])) || parseFloat(formData[key]) < 0)) {
        alert(`Wrong value entered for ${key} attribute`);
        return;
      }
    }

    // date field check
    if ([ "firstCouponDate",  "lastResetDate","penultimateCouponDate", "putDate", "callDate"]
        .includes(key)) {
          if (isNaN(Date.parse(formData[key]))) {
            alert(`Please enter a valid date in ${key}`);
            return;
          }
      }
  }
  if(Date.parse(formData["maturityDate"])<Date.parse(formData["issueDate"]))
  {
    alert("Maturity Date must be after issue date");
    return;
  }
  
    setReadyToSubmit(true);
  };

  useEffect(() => {
    if (readyToSubmit) {
      axios.get(`https://localhost:7220/Bonds/BondsTable/getBondByName/${String(formData.securityName)}`)
        .then((response) => {
          if (response.status === 200 && response.data) {
            alert("Security with this name already exists");
            setReadyToSubmit(false);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            axios.post(`https://localhost:7220/Bonds/BondsTable/addBond`, formData)
              .then(() => {
                alert("Data inserted successfully");
                navigate("/bond");
              })
              .catch((err) => console.error(err));
          } else {
            console.error("Error checking security:", error);
          }
        });
      return () => setReadyToSubmit(false);
    }
  }, [readyToSubmit]);

  return (
    <Box sx={{ maxWidth: "1300px", margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>Add Bond</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>

        

          {Object.keys(initialFormState).map((field) => {
            if (["securityDescription", "securityName", "assetType", "investmentType", "tradingFactor",
            "isin", "bloombergTicker", "bloombergUniqueId", "cusip", "sedol", "firstCouponDate",
            "couponFrequency", "couponType", "issueDate",
            "lastResetDate", "maturityDate", "penultimateCouponDate", "resetFrequency", 
            "formPfassetClass", "formPfcountry", "formPfcreditRating", "",
            "formPfinstrument", "formPfliquidityProfile", "formPfmaturity", "formPfnaicscode",
            "formPfregion", "formPfsector", "formPfsubAssetClass", "bloombergIndustryGroup",
            "bloombergIndustrySubGroup", "bloombergSector", "issueCountry", "",
            "issuer", "", "putDate", "callDate","pricingFactor", "couponCap", "couponFloor", "couponRate", "floatSpread", "maximumCallNoticeDays", "maximumPutNoticeDays", "duration", "volatility30D", "volatility90D", "convexity", "averageVolume30D",].includes(field))
            return (
              <Grid item xs={3} key={field}>
                <TextField fullWidth label={field} name={field} value={formData[field]} onChange={handleChange} margin="dense" InputLabelProps={{
                style: { fontSize: '1.2rem' } 
              }} />
              </Grid>
            );
          })}

          {[  "putPrice", "askPrice", "highPrice", "lowPrice", "openPrice", "volume", "bidPrice", "lastPrice", "callPrice"].map((field) => (

             <Grid item xs={3} key={field}>
                {/* <TextField label="Amount" InputProps={ */}
                {/* // {startAdornment : <InputAdornment position='start'>$</InputAdornment>}}/> */}

                <TextField fullWidth label={field} name={field} value={formData[field]} onChange={handleChange} margin="dense" 
                InputProps={{startAdornment : <InputAdornment position='start'>$</InputAdornment>}}/>
              </Grid>
           ))
          }
          {["hasPosition", "isCallable", "isFixToFloat", "isPutable"].map((field) => (
            <Grid item xs={2} key={field}>
              <FormControl fullWidth margin="dense">
                <FormLabel>{field}</FormLabel>
                <RadioGroup row name={field} value={String(formData[field])} onChange={handleRadioChange}>
                  <FormControlLabel value="true" control={<Radio />} label="true" />
                  <FormControlLabel value="false" control={<Radio />} label="false" />
                </RadioGroup>
              </FormControl>
            </Grid>
          ))}


          <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Currency Type</FormLabel>
              <Select name="formPfcurrency" value={String(formData.formPfcurrency)} onChange={handleRadioChange}>
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Risk Currency</FormLabel>
              <Select name="riskCurrency" value={String(formData.riskCurrency)} onChange={handleRadioChange}>
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          
          <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Issue Currency</FormLabel>
              <Select name="issueCurrency" value={String(formData.issueCurrency)} onChange={handleRadioChange} >
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </FormControl>
          </Grid>


          <Box mt={3}>
            <Button variant="contained" color="primary" type="submit">Create Record</Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default AddBond;
