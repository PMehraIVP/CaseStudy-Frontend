import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Select, MenuItem, Button, Typography,InputAdornment } from "@mui/material";

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ViewBond = () => {
  const { bondName } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios
      .get(`https://localhost:7220/Bonds/BondsTable/getBondByName/${String(bondName)}`)
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
        console.error("Error fetching bond data:", error);
      });
  }, [bondName]);

  const handleDelete = () => {
    const choice = window.confirm("Are you sure you want to delete this bond?");
    if (choice) {
      axios.delete(`https://localhost:7220/Bonds/BondsTable/deleteBondByName/${String(bondName)}`)
        .then(() => {
          alert("Deleted successfully");
          navigate("/bond");
        })
        .catch(() => alert("Error deleting bond"));
    }
  };

  return (
    <Box sx={{ maxWidth: "1300px", margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>View Bond</Typography>
      <Grid container spacing={2}>
        {Object.keys(formData).map((field) => {
          if (["hasPosition", "isCallable", "isFixToFloat", "isPutable","putPrice", "askPrice", "highPrice", "lowPrice", "openPrice", "volume", "bidPrice", "lastPrice", "callPrice","formPFcurrency","issueCurrency","riskCurrency"].includes(field)) return null;
          return (
            <Grid item xs={3} key={field}>
              <TextField fullWidth label={field} value={formData[field]} margin="dense" InputProps={{ readOnly: true }} />
            </Grid>
          );
        })}

        {["putPrice", "askPrice", "highPrice", "lowPrice", "openPrice", "volume", "bidPrice", "lastPrice", "callPrice"].map((field) => (
          <Grid item xs={3} key={field}>
            <TextField fullWidth label={field} value={formData[field]} margin="dense" InputProps={{ readOnly: true, startAdornment: <InputAdornment position='start'>$</InputAdornment> }} />
          </Grid>
        ))}

        {["hasPosition", "isCallable", "isFixToFloat", "isPutable"].map((field) => (
          <Grid item xs={2} key={field}>
            <FormControl fullWidth margin="dense">
              <FormLabel>{field}</FormLabel>
              <RadioGroup row value={String(formData[field])}>
                <FormControlLabel value="true" control={<Radio disabled />} label="Yes" />
                <FormControlLabel value="false" control={<Radio disabled />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
        ))}


          <Grid item xs={3}>
            <FormControl fullWidth margin="dense">
              <FormLabel>Currency Type</FormLabel>
              <Select name="formPfcurrency" value={String(formData.formPfcurrency)} disabled>
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
              <FormLabel>Issue Currency</FormLabel>
              <Select name="issueCurrency" value={String(formData.issueCurrency)} disabled>
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </FormControl>
          </Grid>

        <Box mt={3}>
          <Button variant="contained" color="secondary" onClick={handleDelete}>Delete Record</Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default ViewBond;
