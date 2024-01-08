import Axios from 'axios';

interface AxiosClientProps {
  method?: 'GET' | 'POST' | 'DELETE' | 'UPDATE';
  endpoint: string;
  body: any;
}

// TODO: MOVE INTO .ENV FI1LE
// RN doesnt work with Localhost... gotta proxy through Ngrok
// const BASE_ENDPOINT = `http://localhost:4040`;
const BASE_ENDPOINT = `https://f98d-188-28-35-179.ngrok-free.app`;

export const AxiosClient = async ({
  method = 'GET',
  endpoint,
  body,
}: AxiosClientProps): Promise<any> => {
  try {
    const url = `${BASE_ENDPOINT}/${endpoint}`

    const request = await Axios({
      url,
      method,
      data: body,
    });

    const {data, status} = request;

    return {data, status};
  } catch (error) {
    console.log(error);
  }
};
