import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './NewAdminData.css'
function App({data}) {
  const [excelData, setExcelData] = useState(null);
  // Function to handle the file upload
  function saveFileDataToLocalstorage(event) {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const res = e.target.result;

        // Parse the Excel data using a library like SheetJS (xlsx)
        const workbook = XLSX.read(res, { type: 'array' });

        // Assuming the first sheet is the one you want to parse
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert Excel data to JSON (you can also use CSV)
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Store the JSON data in state
        setExcelData(jsonData);
        data.append("exceldata",file);
        alert('Excel data stored in state.');
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert('Please select an Excel file.');
    }
  }

  // Function to export data as XLSX
  function exportDataToXLSX() {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'exportedData.xlsx');
  }

  // Function to display data as an HTML table
  function displayDataAsTable() {
    if (!excelData || excelData.length === 0) {
      return <div>No data available.</div>;
    }

    return (
      <table border="1">
        <thead>
          <tr>
            {Object.keys(excelData[0]).map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {excelData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      {/* <h1>Excel Sheets to HTML Table</h1> */}
      <label htmlFor="fileSelect">Select an Excel file:</label>
      <input
        id="fileSelect"
        type="file"
        accept=".xlsx, .xls"
        onChange={saveFileDataToLocalstorage}
      />
      <br />
      <button onClick={exportDataToXLSX}>Export Data as XLSX</button>
      <div className="table">{displayDataAsTable()}</div>
    </div>
  );
}

export default App;
