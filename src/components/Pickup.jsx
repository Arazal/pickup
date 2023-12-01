import { useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import BarcodeGenerator from '../common/Barcodegenerator';

export default function OpenDocument() {
  const data = useLocation();
  const [activeItem, setActiveItem] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (itemRefs.current[activeItem]) {
      itemRefs.current[activeItem].focus();
    }
  }, [activeItem]);

  const handleItemClick = (idx) => {
    setActiveItem(idx);
  };

  const handlePrevClick = () => {
    if (activeItem !== 0) {
      setActiveItem((prevActiveItem) => prevActiveItem - 1);
    }
  };

  const handleNextClick = () => {
    if (activeItem < data.state.message.data.length - 1) {
      setActiveItem((prevActiveItem) => prevActiveItem + 1);
    } else {
      setActiveItem(0);
    }
  };

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    if (activeItem < data.state.message.data.length - 1) {
      setActiveItem((prevActiveItem) => prevActiveItem + 1);
    } else {
      setActiveItem(0);
    }
  } else if (event.key === 'Tab') {
    event.preventDefault();
    if (event.shiftKey) {
      // Shift + Tab for previous item
      if (activeItem !== 0) {
        setActiveItem((prevActiveItem) => prevActiveItem - 1);
      }
    } else {
      // Tab for next item
      if (activeItem < data.state.message.data.length - 1) {
        setActiveItem((prevActiveItem) => prevActiveItem + 1);
      } else {
        setActiveItem(0);
      }
    }
  }
};




  return (
    <div className=''>
        <h1 className='mb-4 text-3xl font-bold'>Pickup</h1>
      {/* <button onClick={handlePrevClick}>Prev</button>
      <button onClick={handleNextClick}>Next</button> */}
      
      <div className='flex justify-center'>
        
        <div className='flex flex-wrap flex-col gap-1 '>
            
          {data.state.message.data && data.state.message.data.map((el, idx) => {
            const isActive = activeItem === idx;
            return (
              <div
                ref={(element) => (itemRefs.current[idx] = element)}
                onClick={() => handleItemClick(idx)}
                onKeyPress={(event) => handleKeyPress(event, idx)}
                key={idx}
                className={`border ${isActive ? 'border-red-500' : ''}`}
                tabIndex={0}
              >
                <div className=' text-xl text-blue-400'> {el['Waybill No. (Parent Waybill No. and Sub Waybill No.)']}</div>
                { isActive && <BarcodeGenerator
                        text={el['Waybill No. (Parent Waybill No. and Sub Waybill No.)']}
                />}
                <div className='text-sm'>{`Weight: ${el['Total order weight']}`}</div>
                {el.Length && <div className='text-sm'>{`Length: ${el['Length']}`}</div>}
                {el.Width && <div className='text-sm'>{`Width: ${el['Width']}`}</div>}
                {el.Height && <div className='text-sm'>{`height: ${el['Height']}`}</div>}
                <div className='text-sm'>{`Shipper company: ${el['Shipper Company Name']}`}</div>
                <div className='text-sm'>{`Content: ${el['Content']}`}</div>
                <div className=' text-xs text-amber-600'>{`record ${idx+1} from ${data.state.message.data.length}`}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
