import Axios from 'axios';

interface FetchClientParameters {
  method?: 'GET' | 'POST' | 'UPDATE' | 'DELETE' | 'PATCH';
  endpoint?: string;
  body?: any;
  token?: string;
  base?: string;
}

const BASE_URL: string = `${process.env.API_URL}/api/v1`;

const DETECT_OBJECT = "https://sdnrk4ibpn67swgcakbs73247i0qbyip.lambda-url.us-east-1.on.aws"

export const AxiosClient = async ({
  base = BASE_URL,
  method = 'GET',
  endpoint,
  body,
  token
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
      url: DETECT_OBJECT,
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
