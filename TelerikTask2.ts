
main();

async function main(){
    let url = 'https://demos.telerik.com/reporting/api/reports/clients/'
    //got an error that report does not exist when trying to get instanceId so i hardcoded SwissQRBill 
    let instanceId = 'a7382a32914';
    
    let clientId : string = await registerClient(url);

    let documentId : string = await exportReport(url+ `${clientId}/instances/${instanceId}/documents/`);

    await downloadDocument(url + documentId); 
} 

async function registerClient(url:string){
    var response = await (await fetch(url,  {method : "POST"})).json();
    return response.clientId;
 }

async function exportReport(url:string){
    const requestData = {
        format: 'PDF',
        deviceInfo: {
           UseSVG: true
        }
      };
  
      var response = await (await fetch(url,  
        {method : "POST",
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json'}
    })).json();

    return response.documentId;
 }

 async function downloadDocument(url:string){
    var download = await (await fetch(url)).blob();
    var arrayBuffer =await download.arrayBuffer();
    var buffer= Buffer.from(arrayBuffer)

    await savePdf(buffer);
 }

 async function savePdf(buffer:Buffer){
    const fs = require('fs');

    await fs.writeFile('F:\\myReport2222.pdf', buffer, (err: NodeJS.ErrnoException | null)=>
    {console.log(err?.message)});
 }
