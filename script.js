const ctx = document.getElementById('myChart').getContext('2d');
async function fetchData(){
    const url='data.json';
    const response= await fetch(url);
    const datapoints=await response.json();
    console.log(datapoints);
    return datapoints;
}
fetchData().then(datapoints =>{
    const day=datapoints.map(
        function(index){
            return index.day;
        }
    )
    const amount=datapoints.map(
        function(index){
            return index.amount;
        }
    )
    
    const backgroundcolor=[];
    const hoverbackgroundcolor=[];
    max=amount[0]
    for(i=1;i<amount.length;i++){
      if (max<=amount[i]){
          max=amount[i]
      }
    }

    for(i=0;i<amount.length;i++){
        if (max===amount[i]){
            backgroundcolor.push('hsl(186, 34%, 60%)');
            hoverbackgroundcolor.push('hsl(186, 55%, 71%)')
        }
        else{
            backgroundcolor.push('hsl(10, 79%, 65%)')
            hoverbackgroundcolor.push(' hsl(10, 100%, 83%)')
        }
      }
      
    
 const titleTooltip=(tooltipItems)=>{
     return'';
 }
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
             
            labels: day,
            datasets: [{
                label: '',
                data:amount,
                backgroundColor:backgroundcolor,
                borderColor: backgroundcolor,
                borderWidth: 1,
                borderRadius :3,
                barThickness:39,
                hoverBackgroundColor:hoverbackgroundcolor,
                hoverBorderColor:hoverbackgroundcolor,
              
                
            }]
        },
        options: {
            plugins:{
                legend:{
                    labels:{
                        boxWidth:0,
                    }

                },

                tooltip:{
                    yAlign:'left',
                    xAlign:'center',
                    displayColors:false,
                    titleMarginBottom:0,
                    postion:'average',
                    callbacks:{
                        title: titleTooltip,
                    

                    }
                }
            },
            onHover:(event,chartElement)=>{
                if(chartElement.length==1){
                    event.native.target.style.cursor="pointer";
                }
            },
            maintainAspectratio:false,
            scales: {
                y: {
                    
                  display:false
                   
                },
                x: {
                    grid :{
                        display :false
                    }
                 
                },
                
                
             
            
            }
        },
        
    });
 
 
    console.log(myChart.width)
})
fetchData()
