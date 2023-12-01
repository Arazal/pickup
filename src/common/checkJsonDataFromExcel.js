function checkJsonDataFromExcel(jsonData) {
    let counter = 0
    try{
        jsonData.map(el => {
            // console.log(el)
            if (!el["Waybill No. (Parent Waybill No. and Sub Waybill No.)"]) {
                // console.log(el)
                counter = counter + 1
            }
              
              if (!el['BagNo']) {
                counter = counter +1
              } 
              if (el['Shipment Type'] === 'International Economy Express – Parcel' && !el.Length) {
                counter = counter +1
              } 
              if (el['Shipment Type'] === 'International Economy Express – Parcel' && !el["Width"]) {
                counter = counter +1
              } 
              if (el['Shipment Type'] === 'International Economy Express – Parcel' && !el.Height) {
                counter = counter +1
              } 
              if (!el['Total order weight']) {
                counter = counter +1
              } 
              if (!el['Content']) {
                counter = counter +1
              } 
              if (!el['Receiver Detailed address']) {
                counter = counter +1
              } 
              if (!el['Shipper Contact Name'] && !el['Shipper Company Name']) {
                counter = counter +1
              } 
              if (!el['Receiver Contact Name']) {
                counter = counter +1
              } 
              if (!el['Receiver Mobile phone No.'] && !el['Receiver Fixed phone']) {
                counter = counter +1
              } 
              if (!el['Receiver Country/Region']) {
                counter = counter +1
              } 
        })
        // console.log(counter)
        return counter
    }
    catch(err) {
        console.log(err)
    }
    }

export default checkJsonDataFromExcel