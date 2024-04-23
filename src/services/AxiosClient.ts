import Axios from 'axios';

interface FetchClientParameters {
  method?: 'GET' | 'POST' | 'UPDATE' | 'DELETE' | 'PATCH';
  endpoint: string;
  body?: any;
}

export const AxiosClient = async ({
  method = 'GET',
  endpoint,
  body,
}: FetchClientParameters): Promise<{
  status: number;
  data: any;
  error?: any;
}> => {
  try {
    const {data, status} = await Axios({
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      url: endpoint,
      data: body,
    });

    return {
      status,
      data,
    };
  } catch (error) {
    console.log(error);

    return {
      status: 500,
      data: null,
      error,
    };
  }
};
