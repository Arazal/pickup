import React, { useEffect, useState } from "react";

import retrieveDataFromIndexedDB from '../common/readDocsFromIndexedDB'
import { useNavigate } from 'react-router-dom'

const Documents = () => {
  

  const navigate = useNavigate()

  const [data, setData] = useState([])

  useEffect(() => {

    const docs = retrieveDataFromIndexedDB()
    docs.then(res => setData(res))
   
  }, []) 
    
  
  const handleClick = (el) => {
    console.log(el.data);
    // Use elData as needed
    navigate(`/pickup`, {
  state: { message: el },
  replace: false,
})
  };



  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        {data &&
          data.map((el, idx) => {
            const handleButtonClick = (event) => {
              event.stopPropagation(); // Stop event propagation if needed
              handleClick(el);
            };

            return (
              <div className="flex justify-between m-1 border" key={idx}>
                <div className="flex justify-between m-3 gap-2">
                  <div>
                    {`${el.filename} ${el.createdAt} contains ${el.data.length} waybills`}
                  </div>
                  <button
                    className="bg-orange-600"
                    onClick={handleButtonClick}
                  >
                    Open
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Documents