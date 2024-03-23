const API_URL = 'https://ashlesh-shenoy.in/shopify';


export const getPolls = async (storeURL) => {
  try {
    console.log(storeURL);
    const response = await fetch(`${API_URL}/polls`,{
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
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};




export const createPoll = async (postData,option) => {
  const options = ["/customer-create-poll", 'publish-product-poll','abandoned-checkouts-poll']
  try {
    const response = await fetch(`${API_URL}/${options[option]}`, {
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


export const deletePoll = async (id) => {
  try {
      const response = await fetch(`${API_URL}/stop-poll/${id}`, {
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

