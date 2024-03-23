const API_URL = 'https://ashlesh-shenoy.in/logout';

export const logout = async () => {
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