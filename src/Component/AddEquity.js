import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Grid, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Select, MenuItem, Button, Typography,InputAdornment } from "@mui/material";

  // const initialFormState = {
  //   securityName: "", securityDescription: "",
  //   hasPosition: "", isActive: "", isAdr: "", roundLotSize: "", bloombergUniqueName: "",
  //   cusip: "", isin: "", sedol: "", bloombergTicker: "",
  //   bloombergUniqueId: "", bloombergGlobalId: "", bloombergTickerAndExchange: "",
  //   adrUnderlyingTicker: "", adrUnderlyingCurrency: "", sharesPerAdr: "", ipoDate: "", priceCurrency: "",
  //   settleDays: "", sharesOutstanding: "", votingRightsPerShare: "", twentyDayAverageVolume: "",
  //   beta: "", shortInterest: "", ytdReturn: "", ninetyDayPriceVolatility: "", formPfAssetClass: "",
  //   formPfCountry: "", formPfCreditRating: "", formPfCurrency: "", formPfInstrument: "",
  //   formPfLiquidityProfile: "", formPfMaturity: "", formPfNaicsCode: "", formPfRegion: "",
  //   formPfSector: "", formPfSubAssetClass: "", issueCountry: "", exchange: "", issuer: "",
  //   issueCurrency: "", tradingCurrency: "", bloombergIndustrySubGroup: "", bloombergIndustryGroup: "",
  //   bloombergIndustrySector: "", countryOfIncorporation: "", riskCurrency: "",
  //   openPrice: "", closePrice: "", volume: "", lastPrice: "", askPrice: "", bidPrice: "",
  //   peRatio: "", declaredDate: "", exDate: "", recordDate: "", payDate: "",
  //   amount: "", frequency: "", dividendType: ""
  // };
  
const initialFormState = {
  securityName: "ADT US",securityDescription: "A sample security for testing",hasPosition: "true",
  isActive: "true",isAdr: "false",roundLotSize: "",bloombergUniqueName: "TEST_BLOOM",cusip: "123456789",
  isin: "US1234567890",sedol: "B123456",bloombergTicker: "TEST_TICKER",bloombergUniqueId: "987654321",
  bloombergGlobalId: "GLOBAL_12345",bloombergTickerAndExchange: "TEST/EXCH",adrUnderlyingTicker: "ADR_TICKER",
  adrUnderlyingCurrency: "USD",sharesPerAdr: "10",ipoDate: "2022-01-01",priceCurrency: "USD",
  settleDays: "2",sharesOutstanding: "1000000",votingRightsPerShare: "1",twentyDayAverageVolume: "50000",
  beta: "1.2",shortInterest: "15000",ytdReturn: "5.5",ninetyDayPriceVolatility: "3.4",
  formPfAssetClass: "Equity",formPfCountry: "USA",formPfCreditRating: "AAA",formPfCurrency: "USD",
  formPfInstrument: "Stock",formPfLiquidityProfile: "High",formPfMaturity: "NA",formPfNaicsCode: "541511",
  formPfRegion: "North America",formPfSector: "Technology",formPfSubAssetClass: "Software",issueCountry: "USA",
  exchange: "NASDAQ",issuer: "Test Issuer",issueCurrency: "USD",tradingCurrency: "USD",bloombergIndustrySubGroup: "Software",
  bloombergIndustryGroup: "Technology",bloombergIndustrySector: "Information Technology",
  countryOfIncorporation: "USA",riskCurrency: "USD",openPrice: "150",closePrice: "152",volume: "10000",lastPrice: "151.5",
  askPrice: "152.2",bidPrice: "151.8",peRatio: "25.6",declaredDate: "2024-02-01",exDate: "2024-02-05",
  recordDate: "2024-02-06",payDate: "2024-02-15",amount: "90",frequency: "Quarterly",dividendType: "Cash"
};

const AddEquity = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const navigate = useNavigate();

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
      if (["securityName", "securityDescription", "bloombergUniqueName",  
       "bloombergGlobalId",  
      "adrUnderlyingTicker", "adrUnderlyingCurrency", "formPfCountry", 
      "formPfCreditRating", "formPfInstrument", "formPfLiquidityProfile", "formPfMaturity", 
      "exchange", "issuer", "issueCurrency", "tradingCurrency", "bloombergIndustrySubGroup", 
      "bloombergIndustryGroup", "bloombergIndustrySector", "countryOfIncorporation", 
       "dividendType", "formPfAssetClass", "formPfCurrency"].includes(key)) {
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
    if (formData[key] === "") {
      if (!["securityName", "isActive", "ipoDate", "issueCurrency", "tradingCurrency", "declaredDate", "issueDate"].includes(key)) {
        formData[key] = null;
      } else {
        alert(`Please enter ${key} value`);
      }
    }
    

    // Number field check
    if (["roundLotSize", "sharesPerAdr", "settleDays", "sharesOutstanding", "votingRightsPerShare",
         "twentyDayAverageVolume", "beta", "shortInterest", "ytdReturn", "ninetyDayPriceVolatility", 
         "peRatio", "openPrice", "closePrice", "volume", "lastPrice", "askPrice", "bidPrice", "amount"]
        .includes(key)) {
      if (formData[key] !== null && isNaN(parseFloat(formData[key]))) {
        alert(`Wrong value entered for ${key} attribute`);
        return;
      }
    }

    // date field check
    if (["declaredDate", "exDate", "recordDate", "payDate","ipoDate"]
        .includes(key)) {
          if (isNaN(Date.parse(formData[key]))) {
            alert(`Please enter a valid date format in ${key}`);
            return;
          }
    }
    }
    if(Date.parse(formData["declaredDate"])>Date.parse(formData["exDate"]))
    {
      alert("declared date must be before expiration date")
      return;
    }

    // var today = new Date();
    // if(Date.parse(formData["ipoDate"])>today)
    // {
    //   alert("invalid ipo date")
    //   return;
    // }

    setReadyToSubmit(true);
  };

  useEffect(() => {
    if (!readyToSubmit) return;
    axios.get(`https://localhost:7220/Equity/EquityTable/getSecByName/${String(formData.securityName)}`)
      .then((response) => {
        if (response.status === 200 && response.data) {
          alert("Security with this name already exists");
          setReadyToSubmit(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          axios.post(`https://localhost:7220/Equity/EquityTable/addSecurity`, formData)
            .then(() => { alert("Data inserted successfully"); navigate("/"); })
            .catch((err) => console.error(err));
        } else {
          console.error("Error checking security:", error);
        }
      });
    return () => setReadyToSubmit(false);
  }, [readyToSubmit]);

  return (
    <Box sx={{ maxWidth: "1300px", margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>Add Equity</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(initialFormState).map((field) => (
            [
              "securityName", "securityDescription", "bloombergUniqueName", "cusip", "isin", 
              "sedol", "bloombergTicker", "bloombergUniqueId", "bloombergGlobalId", 
              "bloombergTickerAndExchange", "adrUnderlyingTicker", "adrUnderlyingCurrency", 
              "ipoDate", "priceCurrency", "formPfCountry", 
              "formPfCreditRating", "formPfInstrument", 
              "formPfLiquidityProfile", "formPfMaturity", "formPfNaicsCode", 
              "formPfRegion", "formPfSector", "formPfSubAssetClass", "issueCountry", 
              "exchange", "issuer", , , 
              "bloombergIndustrySubGroup", "bloombergIndustryGroup", "bloombergIndustrySector", 
              "countryOfIncorporation",, "declaredDate", "exDate", "recordDate", 
              "payDate", "frequency","roundLotSize", "sharesPerAdr", "settleDays", "sharesOutstanding",
              "votingRightsPerShare", "twentyDayAverageVolume",
            ]
            .includes(field) ? (
              <Grid item xs={3} key={field}>
                <TextField fullWidth label={field} name={field} value={formData[field]} onChange={handleChange} margin="dense" />
              </Grid>
            ) : null
          ))}

          {[ "beta", "shortInterest",
           "ytdReturn", "ninetyDayPriceVolatility", "peRatio", "openPrice", "closePrice",
           "volume", "lastPrice", "askPrice", "bidPrice", "amount"].map((field) => (

             <Grid item xs={3} key={field}>
                {/* <TextField label="Amount" InputProps={ */}
                {/* // {startAdornment : <InputAdornment position='start'>$</InputAdornment>}}/> */}

                <TextField fullWidth label={field} name={field} value={formData[field]} onChange={handleChange} margin="dense" 
                InputProps={{startAdornment : <InputAdornment position='start'>$</InputAdornment>}}/>
              </Grid>
           ))
          }

          {["hasPosition", "isActive", "isAdr"].map((field) => (
            <Grid item xs={2} key={field}>
              <FormControl fullWidth margin="dense">
                <FormLabel>{field}</FormLabel>
                <RadioGroup row name={field} value={String(formData[field])} onChange={handleRadioChange}>
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          ))}

          <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Dividend Type</FormLabel>
              <Select name="dividendType" value={formData.dividendType} onChange={handleChange}>
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Shares">Shares</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Security Type</FormLabel>
              <Select name="formPfAssetClass" value={formData.formPfAssetClass} onChange={handleChange}>
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="Equity">Equity</MenuItem>
                <MenuItem value="Bond">Bond</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Currency Type</FormLabel>
              <Select name="formPfCurrency" value={formData.formPfCurrency} onChange={handleChange}>
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Risk Currency</FormLabel>
              <Select name="riskCurrency" value={String(formData.riskCurrency)} onChange={handleChange}>
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          
          <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Issue Currency</FormLabel>
              <Select name="issueCurrency" value={String(formData.issueCurrency)} onChange={handleChange} >
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Trading currency</FormLabel>
              <Select name="tradingCurrency" value={String(formData.tradingCurrency)} onChange={handleChange} >
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          
         

          
        </Grid>
        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">Create Record</Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddEquity;
