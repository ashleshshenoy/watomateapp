const API_URL = 'https://ashlesh-shenoy.in/gpt';



export const regenerateMessage = async (postData) => {
    try {
      const response = await fetch(API_URL + "/text", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
        credentials:"include"
      });
      if(response.status == 401) {
        console.log("failed access")
        window.location.href = "/" +data.access;
      }  
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return data;
    } catch (error) {
      console.error('Error posting data:', error);
      return error.message;
    }
  };



export const generateImage = async (postData) => {
  try {
    const response = await fetch(API_URL + "/image", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
      credentials:"include"
    });
    const data = await response.json();
    if(response.status == 401) {
      console.log("failed access")
      window.location.href = "/" +data.access;
    }
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return data;
  } catch (error) {
    console.error('Error posting data:', error);
    return error.message;
  }
};


  

