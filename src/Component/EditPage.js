import React from 'react';
import '../App.css'; // Assuming you are using a CSS file for styling

const EditPage = () => {
  return (
    <div className="form-container">
      <form className="form">
        <div className="form-group">
          <label htmlFor="securityId">Security ID</label>
          <input type="text" id="securityId" />
        </div>
        <div className="form-group">
          <label htmlFor="securityName">Security Name</label>
          <input type="text" id="securityName" />
        </div>
        <div className="form-group">
          <label htmlFor="securityDescription">Security Description</label>
          <input type="text" id="securityDescription" />
        </div>
        <div className="form-group">
          <label htmlFor="hasPosition">Has Position</label>
          <input type="text" id="hasPosition" />
        </div>
        <div className="form-group">
          <label htmlFor="isActive">Is Active</label>
          <input type="text" id="isActive" />
        </div>
        <div className="form-group">
          <label htmlFor="roundLotSize">Round Lot Size</label>
          <input type="text" id="roundLotSize" />
        </div>
        <div className="form-group">
          <label htmlFor="bloombergUniqueName">Bloomberg Unique Name</label>
          <input type="text" id="bloombergUniqueName" />
        </div>
        <div className="form-group">
          <label htmlFor="cusip">CUSIP</label>
          <input type="text" id="cusip" />
        </div>
        <div className="form-group">
          <label htmlFor="isin">ISIN</label>
          <input type="text" id="isin" />
        </div>
        {/* Add other fields as needed */}
        
        <div className="form-group">
          <label htmlFor="dividendType">Dividend Type</label>
          <input type="text" id="dividendType" />
        </div>
      </form>
    </div>
  );
};

export default EditPage;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';

// function Update(){
//   const {id} = useParams();
//   useEffect(()=>{
//     axios.get()
//   })
// }
// useEffect(() => {
//   axios.get('https://localhost:7220/Equity/EquityTable/get')
//     .then(res => {
//       console.log(res.data);
//       setData(res.data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }, []);


// const [data, setData] = useState([]);


// const EditPage = () => {
//   return (
//     <div>
//       <form>
//         <div>
//           <label> Name : </label>
//           <input type="text" name="name" placeholder='enter name' />
//         </div>
//       </form>
//     </div>
//   )
// }

// export default EditPage

