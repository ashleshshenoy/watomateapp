const API_URL = 'https://ashlesh-shenoy.in/segment';

export const getAllSegment = async () => {
  try {
    const response = await fetch(`${API_URL}`,{
      credentials: "include"
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
    return null;
  }
};


export const createSegment = async (postData) => {
    try {
      const response = await fetch(API_URL, {
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
      console.log(error)
      return null;
    }
  };
  

export const deleteSegment = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
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
        return null;
    }
};