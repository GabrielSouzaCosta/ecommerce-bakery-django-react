import axios from "axios";


export default class ApiService{
  static saveStripeInfo(data={}){
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/checkout/`, data, {headers: {
      "Authorization": "Token "+sessionStorage.getItem('token')
    }})
  }
}