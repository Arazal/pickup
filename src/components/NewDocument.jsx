import React, { useState, useRef } from "react";
import { read, utils } from "xlsx"; // For Excel file processing
import checkJsonDataFromExcel from "../common/checkJsonDataFromExcel";
import storeDataInIndexedDB from '../common/saveDocumentIntoIndexedDB'

const NewDocument = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jsonFromExcel, setJsonFromExcel] = useState([]);
  const [errorCounter, setErrorCounter] = useState(0)
  const [jsonResult, setJsonResult] = useState([])
  const [selectedFileName, setSelectedFileName] = useState('');
  const ref = useRef();
  const [loading, setLoading] = useState(false)

  let tableStyle = 'table-fixed'
 
 

  const handleFileSelect = (event) => {
    
    try{
      let file = event.target.files[0];
      setSelectedFile(file);
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const jsonData = utils.sheet_to_json(workbook.Sheets[firstSheetName], { raw: true });
        const checker = checkJsonDataFromExcel(jsonData)
        setErrorCounter(checker)
        setJsonFromExcel(jsonData)
        jsonData ? tableStyle = 'table-auto' : tableStyle ='table-fixed'
      };
  
      reader.readAsBinaryString(file);
    }
    catch (err) {
      console.log(err)
    }
    setTimeout(() => {
      event.target.value = null;
    }, 1000);
  };

  const handleSendData = () => {
    setLoading(true)
    try {
      if (selectedFile) {
        storeDataInIndexedDB(selectedFile, jsonFromExcel);
      }
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  return (
    <div className="container">
        <div className="flex justify-center items-center my-1">
        <label className="relative cursor-pointer  bg-slate-700 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-slate-400 hover:shadow-xl hover:cursor-pointer">
          Upload File
          <input
            className="absolute inset-0 opacity-0 z-10"
            type="file"
            accept=".xlsx"
            onChange={handleFileSelect}
            ref={ref}
          />
        </label>
      </div>
      {selectedFile && (
        <p className="text-center mt-2">Selected File: {selectedFileName}</p>
      )}

    {errorCounter > 0 && (
      <h3 className="font-semibold text-red-600 mb-4  pb-2 text-center text-sm">
        {`Need to fill: ${errorCounter}`}
      </h3>
    )}
      
      {errorCounter === 0 && selectedFile && (
        <div className="flex justify-center items-center mb-2">
          <button
            onClick={handleSendData}
            className="disabled:opacity-25 flex justify-center items-center relative cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-xl hover:cursor-pointer"
          >
            {/* {loading ? <div className="animate-spin">Loading</div> : 'Send Data'} */}
            Send Data

          </button>
        </div>
      )}

{jsonResult ? <h3 className="text-sm text-green-400 text-center my-2">{jsonResult}</h3> : ''}
   
{jsonFromExcel && jsonFromExcel.length > 0  ? (
          <table className={`${tableStyle} text-xs`}> 
          <thead>
          <tr>
            <th className="border bg-zinc-300">BagNo</th>
            <th className="border bg-zinc-300">WaybillNo</th>
           
            <th className="border bg-zinc-300">Length</th>
            <th className="border bg-zinc-300">Width</th>
            <th className="border bg-zinc-300">Height</th>
            <th className="border bg-zinc-300">Total order weight</th>
            <th className="border bg-zinc-300">Content</th>
            <th className="border bg-zinc-300">Shipper Company Name</th>
            <th className="border bg-zinc-300">Shipper Contact Name</th>
            <th className="border bg-zinc-300">Receiver Contact Name</th>
            
            <th className="border bg-zinc-300">Receiver Mobile phone No.</th>
            <th className="border bg-zinc-300">Receiver Fixed phone</th>
            <th className="border bg-zinc-300">Receiver Detailed address</th>
            <th className="border bg-zinc-300">Receiver Country/Region</th>
            <th className="border bg-zinc-300">Shipment Type</th>
          </tr>
        </thead>
        <tbody> 
            {jsonFromExcel.map((el,idx) => {
            return (
              <tr key={idx}>
              {!el["BagNo"] ? <td className='border bg-pink-900 animate-pulse'>{el['BagNo']}</td> : <td className='border'>{el['BagNo']}</td>}
              {!el["Waybill No. (Parent Waybill No. and Sub Waybill No.)"] ? <td className='border bg-pink-900 animate-pulse'>{el['Waybill No. (Parent Waybill No. and Sub Waybill No.)']}</td> : <td className='border'>{el['Waybill No. (Parent Waybill No. and Sub Waybill No.)']}</td>}
              
              {el['Shipment Type'] === 'International Economy Express – Parcel' && !el.Length ? <td className='border bg-pink-800 animate-pulse'>{el['Length']}</td> : <td className='border'>{el['Length']}</td>}
              {el['Shipment Type'] === 'International Economy Express – Parcel' && !el.Width ? <td className='border bg-pink-700 animate-pulse'>{el['Width']}</td> : <td className='border'>{el['Width']}</td>}
              {el['Shipment Type'] === 'International Economy Express – Parcel' && !el.Height ? <td className='border bg-pink-600 animate-pulse'>{el['Height']}</td> : <td className='border'>{el['Height']}</td>}
              {!el['Total order weight'] ? <td className='border bg-pink-800 animate-pulse'>{el['Total order weight']}</td> : <td className='border'>{el['Total order weight']}</td>}
              {!el['Content'] ? <td className='border bg-pink-800 animate-pulse'>{el['Content']}</td> : <td className='border'>{el['Content']}</td>}
              {!el['Shipper Company Name'] && !el['Shipper Contact Name'] ? <td className='border bg-pink-800 animate-pulse'>{el['Shipper Company Name']}</td> : <td className='border'>{el['Shipper Company Name']}</td>}
              {!el['Shipper Contact Name'] && !el['Shipper Company Name'] ? <td className='border bg-pink-800 animate-pulse'>{el['Shipper Contact Name']}</td> : <td className='border'>{el['Shipper Contact Name']}</td>}
              {!el['Receiver Contact Name'] ? <td className='border bg-pink-800 animate-pulse'>{el['Receiver Contact Name']}</td> : <td className='border'>{el['Receiver Contact Name']}</td>}
              {!el['Receiver Mobile phone No.'] && !el['Receiver Fixed phone'] ? <td className='border bg-pink-800 animate-pulse'>{el['Receiver Mobile phone No.']}</td> : <td className='border'>{el['Receiver Mobile phone No.']}</td>}
              {!el['Receiver Fixed phone'] && !el['Receiver Mobile phone No.'] ? <td className='border bg-pink-800 animate-pulse'>{el['Receiver Fixed phone']}</td> : <td className='border'>{el['Receiver Fixed phone']}</td>}
              {!el['Receiver Detailed address'] ? <td className='border bg-pink-800 animate-pulse'>{el['Receiver Detailed address']}</td> : <td className='border'>{el['Receiver Detailed address']}</td>}
              {!el['Receiver Country/Region'] ? <td className='border bg-pink-800 animate-pulse'>{el['Receiver Country/Region']}</td> : <td className='border'>{el['Receiver Country/Region']}</td>}
              {<td className='border'>{el['Shipment Type']}</td>}
              
            </tr>
            )})
          }
         </tbody>
    </table>
    ): null}
    </div>
  );
};

export default NewDocument;
