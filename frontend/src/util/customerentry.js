const API_URL = 'https://ashlesh-shenoy.in/customerentry';

export const getAllFromSegment = async (segment_id) => {
  try {
    const response = await fetch(`${API_URL}/${segment_id}`,{
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
    console.error('Error fetching data:', error);
    return null;
  }
};


export const createCustomerEntry = async (postData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:"include",
        body: JSON.stringify(postData),
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
      return null;
    }
  };
  

export const deleteCustomerEntry = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            credentials:"include"
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
  };



  export const uploadCustomerEntryFile = async (postData) => {
    try {
      const formData = new FormData();
      formData.append('file', postData.file); 
      formData.append('segment_id', postData.segment_id);
  
      const response = await fetch(`${API_URL}/file`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
  
      if (response.status === 401) {
        console.log('Failed access');
        window.location.href = '/' + data.access;
      }
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return data;
    } catch (error) {
      console.error('Error posting data:', error);
      return null;
    }
  };
  