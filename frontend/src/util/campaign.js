const API_URL = 'https://ashlesh-shenoy.in/campaign';

export const getCampaigns = async () => {
  try {
    const response = await fetch(API_URL,{
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


export const createCampaign = async (postData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      if(response.status == 401) {
        console.log("failed access")
        console.log("/" +data.access);
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return data;
    } catch (error) {
      return null;
    }
  };
  