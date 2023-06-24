import jwt from 'jsonwebtoken';
import axios from 'axios';

type CreateSessionQueueParams = {
  workflow_id: number | string,
  params: object,
};

type GetSessionQueuesParams = {
  page: number;
  per_page: number;
  project_id: number | string;
  query?: string;
};

type GetWorkflowsParams = {
  page: number;
  per_page: number;
}

export class AutoroClient {
  private _apiKey: string;
  private _apiSecretKey: string;

  // token expires 60 seconds after creation
  private _expires: number;

  constructor(
    apiKey: string,
    apiSecretKey: string,
    expires: number = 60
  ) {
    this._apiKey = apiKey;
    this._apiSecretKey = apiSecretKey;
    this._expires = expires;
  }

  // This method gets a list of session queues
  public getSessionQueues = async (
    sessionQueueParams: GetSessionQueuesParams
  ) => {

    const url = 'https://api.roboticcrowd.com/v1/session_queues';

    const queryString =
      `page=${sessionQueueParams.page}&per_page=${sessionQueueParams.per_page}&project_id=${sessionQueueParams.project_id}&query=${sessionQueueParams.query}`;

    const headers = {
      'Authorization': `Bearer ${this.createAutoroToken('session_queue.read')}`,
      'Content-Type': 'application/json'
    };

    const res = await axios.get(`${url}?${queryString}`, { headers }).catch(err => {
      console.log(err);
      throw err;
    });

    return res.data;
  }

  // This method creates a session queue
  public createSessionQueue = async (
    sessionQueueParams: CreateSessionQueueParams
  ) => {

    const url = 'https://api.roboticcrowd.com/v1/session_queues';

    const headers = {
      'Authorization': `Bearer ${this.createAutoroToken('session_queue.write')}`,
      'Content-Type': 'application/json'
    };

    const res = await axios.post(url, sessionQueueParams, { headers }).catch(err => {
      console.log(err);
      throw err;
    });

    return res.data;
  }

  // This method cancels a session queue
  public cancelSessionQueue = async (
    sessionQueueId: number | string
  ) => {
    const url = `https://api.roboticcrowd.com/v1/session_queues/${sessionQueueId}/cancel`;

    const headers = {
      'Authorization': `Bearer ${this.createAutoroToken('session_queue.delete')}`,
      'Content-Type': 'application/json'
    };

    const res = await axios.delete(url, { headers }).catch(err => {
      console.log(err);
      throw err;
    });

    return res.data;
  }

  // This method gets a list of workflows
  public getWorkflows = async (
    workflowParams: GetWorkflowsParams
  ) => {

    const url = 'https://api.roboticcrowd.com/v1/workflows';

    const queryString = `page=${workflowParams.page}&per_page=${workflowParams.per_page}`;

    const headers = {
      'Authorization': `Bearer ${this.createAutoroToken('session_queue.read')}`,
      'Content-Type': 'application/json'
    };

    const res = await axios.get(`${url}?${queryString}`, { headers }).catch(err => {
      console.log(err);
      throw err;
    });

    return res.data;
  }

  // This method creates a JWT token that can be used to authenticate with the Autoro API
  public createAutoroToken = (
    scopes: string = 'session_queue.write'
  ) => {

    const currentUnixTime = Math.floor(Date.now() / 1000);
    const expirationUnixTime = currentUnixTime + this._expires;

    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const payload = {
      iss: 'console.roboticcrowd.com',
      sub: this._apiKey,
      aud: 'https://api.roboticcrowd.com/',
      nbf: currentUnixTime,
      exp: expirationUnixTime,
      scopes
    };

    const token = jwt.sign(payload, this._apiSecretKey, { header });

    return token;
  };

}