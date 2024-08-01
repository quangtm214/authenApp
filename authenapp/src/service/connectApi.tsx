import axios from "axios";

export const getData = async (url: string) => {
  try {
    let token = localStorage.getItem("jwt");
    console.log("Token fetchAPI:", token);
    if (token === undefined) {
      token = "";
    }
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
  return null;
};

export const postData = async (url: string, data: object) => {
  try {
    let token = localStorage.getItem("jwt");
    if (token === undefined) {
      token = "";
    }
    console.log("Token fetchAPI:", token);
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response fetchAPI", response);
    return response.data;
  } catch (error: any) {
    console.log("Error fetching data:", error);
    return error.response.data;
  }
  return null;
};
