// from: https://www.youtube.com/watch?v=Q3ixb1w-QaY,
// then added in css styling to make the table look better 
// link: http://localhost:5173/

import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8071/products')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);
  
  return (
    <div style={{ padding: "50px" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd", background: "#f2f2f2" }}>
            <th style={{ padding: "8px", textAlign: "left" }}>Product Name</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Product ID</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Stock</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Supplier ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "8px", textAlign: "left" }}>{d.product_name}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{d.product_id}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{d.stock}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{d.supplier_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;