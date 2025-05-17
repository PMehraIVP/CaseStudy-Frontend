import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Button } from "@mui/material";

const ViewEquity = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios
      .get(`https://localhost:7220/Equity/EquityTable/getSecById/${Number(id)}`)
      .then((res) => {
        const fetchedData = res.data;
        for (let key in fetchedData) {
          if (fetchedData[key] == null) {
            fetchedData[key] = "";
          }
        }
        setFormData(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleDelete = () => {
    const choice = window.confirm("Are you sure you want to delete this security?");
    if (choice) {
      axios
        .delete(`https://localhost:7220/Equity/EquityTable/delete/${Number(id)}`)
        .then(() => {
          alert("Deleted successfully");
          window.location.href = "/";
        })
        .catch(() => alert("Error deleting data"));
    }
  };

  return (
    <Box sx={{ maxWidth: "1300px", margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>View Equity</Typography>
    
      <Grid container spacing={2}>
        {Object.keys(formData).map((field) => {
          if (["hasPosition", "isActive", "isAdr", "dividendType","formPfCurrency","formPfAssetClass","tradingCurrency","issueCurrency","riskCurrency"].includes(field)) return null;
          return (
            <Grid item xs={3} key={field}>
              <TextField fullWidth label={field} name={field} value={formData[field]} margin="dense" InputProps={{ readOnly: true }} />
            </Grid>
          );
        })}

        {["hasPosition", "isActive", "isAdr"].map((field) => (
          <Grid item xs={2} key={field}>
            <FormControl fullWidth margin="dense">
              <FormLabel>{field}</FormLabel>
              <RadioGroup row name={field} value={String(formData[field])}>
                <FormControlLabel value="true" control={<Radio disabled />} label="Yes" />
                <FormControlLabel value="false" control={<Radio disabled />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
        ))}

        <Grid item xs={3}>
          <FormControl fullWidth margin="dense">
            <FormLabel>Dividend Type</FormLabel>
            <Select name="dividendType" value={String(formData.dividendType)} disabled>
              <MenuItem value="">Select Type</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Shares">Shares</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Security Type</FormLabel>
              <Select name="formPfAssetClass" value={String(formData.formPfAssetClass)} disabled>
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="Equity">Equity</MenuItem>
                <MenuItem value="Bond">Bond</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Currency Type</FormLabel>
              <Select name="formPfCurrency" value={String(formData.formPfCurrency)} disabled>
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          
          <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Risk Currency</FormLabel>
              <Select name="riskCurrency" value={String(formData.riskCurrency)} disabled>
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          
          <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Trading currency</FormLabel>
              <Select name="tradingCurrency" value={String(formData.tradingCurrency)} disabled>
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          
          <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Issue Currency</FormLabel>
              <Select name="issueCurrency" value={String(formData.issueCurrency)} disabled>
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          

      </Grid>
      <Box mt={3}>
        <Button variant="contained" color="secondary" onClick={handleDelete}>Delete Record</Button>
      </Box>
    </Box>
  );
};

export default ViewEquity;
