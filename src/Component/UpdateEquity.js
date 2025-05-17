import React, { useState, useEffect } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Grid, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Select, MenuItem, Button, Typography,InputAdornment } from "@mui/material";

const UpdatePage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const Navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7220/Equity/EquityTable/getSecById/${Number(id)}`)
      .then((res) => {
        const fetchedData = res.data;
        for (let key in fetchedData) {
          if (fetchedData[key] == null) {
            fetchedData[key] = "";
          }
        }
        console.log("updateequity id = ",id)
        setFormData(fetchedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    for (let key in formData) 
    {
        // String check
        if (["securityName", "securityDescription", "bloombergUniqueName",  
         "bloombergGlobalId", 
        "adrUnderlyingTicker", "adrUnderlyingCurrency", "formPfCountry", 
        "formPfCreditRating", "formPfInstrument", "formPfLiquidityProfile", "formPfMaturity", 
        "exchange", "issuer", "issueCurrency", "tradingCurrency", "bloombergIndustrySubGroup", 
        "bloombergIndustryGroup", "bloombergIndustrySector", "countryOfIncorporation", 
         "dividendType", "formPfAssetClass", "formPfCurrency"].includes(key)) {
          let value = String(formData[key]);
          if (!isNaN(value) && value.trim() !== ""){
            alert(`${key} must not be a number `);
            return;
          }      
          for (let char of value) {
            let asci = char.charCodeAt(0);
            if (
              !(asci >= 48 && asci <= 57) &&  // num
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
            if (formData[key] !== null && (isNaN(parseFloat(formData[key])) || parseFloat(formData[key]) <= 0)) {
          alert(`Wrong value entered for ${key} attribute`);
          return;
        }
      }

      // date field check
   
    if (["declaredDate", "exDate", "recordDate", "payDate","ipoDate"]
    .includes(key))
     {
      if (isNaN(Date.parse(formData[key]))) {
        alert(`Please enter a valid date format in ${key}`);
        return;
      }
    }
  }  
    
  if(Date.parse(formData["declaredDate"])>Date.parse(formData["declaredDate"]))
    {
      alert("declared date must be before expiration date")
      return;
    }

    // var today = new Date();
    // if(Date.parse(formData["ipoDate"])<=today)
    // {
    //   alert("invalid ipo date")
    //   return;
    // }

    console.log(formData);
    axios.put(`https://localhost:7220/Equity/EquityTable/updateEquity`, formData)
      .then(() => {
        alert("Record updated successfully!");
        Navigate("/");
      })
      .catch((err) => alert(`Error updating data: ${err.message}`));
  };
  

  return (
    <Box sx={{ maxWidth: "1300px", margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>Update Equity</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>

        {Object.keys(formData).map((field) => (
            [
              "securityName", "securityDescription", "bloombergUniqueName", "cusip", "isin", 
              "sedol", "bloombergTicker", "bloombergUniqueId", "bloombergGlobalId", 
              "bloombergTickerAndExchange", "adrUnderlyingTicker", "adrUnderlyingCurrency", 
              "ipoDate", "priceCurrency", "formPfCountry", 
              "formPfCreditRating", "formPfInstrument", 
              "formPfLiquidityProfile", "formPfMaturity", "formPfNaicsCode", 
              "formPfRegion", "formPfSector", "formPfSubAssetClass", "issueCountry", 
              "exchange", "issuer", , 
              "bloombergIndustrySubGroup", "bloombergIndustryGroup", "bloombergIndustrySector", 
              "countryOfIncorporation", "", "declaredDate", "exDate", "recordDate", 
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
              <Select name="dividendType" value={String(formData.dividendType)} onChange={handleChange}>
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Shares">Shares</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Security Type</FormLabel>
              <Select name="formPfAssetClass" value={String(formData.formPfAssetClass)} onChange={handleChange}>
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="Equity">Equity</MenuItem>
                <MenuItem value="Bond">Bond</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Currency Type</FormLabel>
              <Select name="formPfCurrency" value={String(formData.formPfCurrency)} onChange={handleChange}>
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
              <FormLabel>Trading currency</FormLabel>
              <Select name="tradingCurrency" value={String(formData.tradingCurrency)} onChange={handleChange}>
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


          {/* {/* {["hasPosition", "isActive", "isAdr"].map((field) => (
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


          {Object.keys(formData).map((field) => (
            ["hasPosition", "isActive", "isAdr", "dividendType","securityId"].includes(field) ? null : (
              <Grid item xs={3} key={field}>
                <TextField fullWidth label={field} name={field} value={formData[field]} onChange={handleChange} margin="dense" />
              </Grid>
            )
          ))}

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
            </FormControl> */}
          </Grid> 

        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">Update Record</Button>
        </Box>
      </form>
    </Box>
  );
};


export default UpdatePage;
