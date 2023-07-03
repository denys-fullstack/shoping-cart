import axios from 'axios';
import { headers } from './config';

// ** Get Products
export const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/products`, { ...headers });
      return response; 
    } catch (error) {
      console.log( error);
    }
  };
  

export const addCart = async(data:CardProps) => {
  await axios
    .post(`${process.env.REACT_APP_SERVER_URL}/api/cart`, data, {
      ...headers,
    })
    .then(async (response) => {
      return response; 
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log('Error', err.message);
      }
      throw err;
    });
};

export const deleteCart = async(id:string) => {
  await axios
    .delete(`${process.env.REACT_APP_SERVER_URL}/api/cart/${id}`, {
      ...headers,
    })
    .then(async (response) => {
      return response; 
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log('Error', err.message);
      }
      throw err;
    });
};

export const updateCart = async(id:string, data:Number) => {
  await axios
    .put(
      `${process.env.REACT_APP_SERVER_URL}/api/cart/${id}/${data}`,
      data,
      {
        ...headers,
      }
    )
    .then(async (response) => {
      return response; 
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log('Error', err.message);
      }
      throw err;
    });
};
