import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const BarcodeGenerator = ({ text }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, text, {
        format: 'CODE128', // Choose the barcode format you want
        displayValue: true, // Show the text beneath the barcode
      });
    }
  }, [text]);

  return <svg ref={barcodeRef}></svg>;
};

export default BarcodeGenerator;
