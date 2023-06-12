


const API_URL = 'http://localhost:5000';




// export const analyze_sentiment = async(text) => {
//     const response = await fetch(`${API_URL}/api/analyze/${text}`,{
//         method:'GET',
//     });
//     const jsonData = await response.json();
//     return jsonData;
      
//   }






  export const analyze_sentiment = async(text) => {
    try{
        await fetch(`${API_URL}/api/analyze/${text}`,{
            method:'GET',
            mode: 'cors',
            headers: {
            'Access-Control-Allow-Origin':'*'
            }
        })
        .then((response)=> response.json())
        .then((data)=>{
            console.log(data);
            return data;
        })
    }catch(err){
        console.log("error",err);
    }
  }




  




