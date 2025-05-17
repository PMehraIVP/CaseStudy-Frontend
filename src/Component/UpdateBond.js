import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Select, MenuItem, Button, Typography,InputAdornment } from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBond = () => {
  const { bondName } = useParams();
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get(`https://localhost:7220/Bonds/BondsTable/getBondByName/${bondName}`)
      .then((res) => {
        const fetchedData = res.data;
        Object.keys(fetchedData).forEach(key => {
          if (fetchedData[key] == null) {
            fetchedData[key] = "";
          }
        });
        setFormData(fetchedData);
      })
      .catch((error) => console.error("Error fetching bond data:", error));
  }, [bondName]);

  useEffect(() => {
    if (!readyToSubmit) return;
    axios.put(`https://localhost:7220/Bonds/BondsTable/UpdateBond`, formData)
      .then(() => {
        alert("Data updated successfully");
        navigate("/bond");
      })
      .catch((err) => console.error("Error during update:", err))
      .finally(() => setReadyToSubmit(false));
  }, [readyToSubmit]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            alert(`Recheck value entered for ${key} attribute you cannot enter /=$#@!%`);
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
    if (["tradingFactor","formPfmaturity", "pricingFactor", "couponCap", "couponFloor","couponRate", "floatSpread","maximumCallNoticeDays", "maximumPutNoticeDays",
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

  return (
    <Box sx={{ maxWidth: "1300px", margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>Update Bond</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(formData).map((field) => {
            if (["hasPosition", "isCallable", "isFixToFloat", "isPutable","securityId","putPrice", "askPrice", "highPrice", "lowPrice", "openPrice", "volume", "bidPrice", "lastPrice", "callPrice","formPFcurrency","issueCurrency","riskCurrency"].includes(field)) return null;
            return (
              <Grid item xs={3} key={field}>
                <TextField
                  fullWidth
                  label={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  margin="dense"
                  InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                  InputProps={[
                    "putPrice", "askPrice", "highPrice", "lowPrice", "openPrice", "volume", "bidPrice", "lastPrice", "callPrice"].includes(field) ?
                    { startAdornment: <InputAdornment position='start'>$</InputAdornment> } : {}
                  }
                />
              </Grid>
            );
          })}

          {["hasPosition", "isCallable", "isFixToFloat", "isPutable"].map((field) => (
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
              <Select name="issueCurrency" value={String(formData.issueCurrency)} onChange={handleRadioChange}>
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Box mt={3}>
            <Button variant="contained" color="primary" type="submit">Update Record</Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateBond;
