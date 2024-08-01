import { getData, postData } from "@/service/connectApi";
import { jwtDecode } from "jwt-decode";
export const Register = async (member: object) => {
  console.log("member", member);
  const response = await postData("http://localhost:3000/auth/signup", member);
  return response;
};

export const Login = async (member: object) => {
  console.log("member", member);
  const response = await postData("http://localhost:3000/auth/login", member);
  console.log("response123", response);

  if (response && response.data) {
    const token = response.data.token;
    console.log("token", token);
    if (token) {
      localStorage.setItem("jwt", token);
      const decodedToken = jwtDecode(token);
      console.log("decodedToken", decodedToken);
      localStorage.setItem("user", JSON.stringify(decodedToken));
    }
    return response;
  }
};

export const getPersonalData = async () => {
  const response = await getData("http://localhost:3000/auth/personal");
  return response;
};
