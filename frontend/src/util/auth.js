const API_URL = 'https://ashlesh-shenoy.in/auth/';



export const authAtBackend = async (postData) => {
    try {
      const response = await fetch(API_URL , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials : "include",
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error posting data:', error);
      return null;
    }
  };

  export const isAuthenticated = async (postData) => {
    try {
      const response = await fetch(API_URL , {
        credentials : "include",
        body: JSON.stringify(postData),
      });
      console.log(response)
      return response.status;
    } catch (error) {
      console.error('Error posting data:', error);
      return error.message;
    }
  };
