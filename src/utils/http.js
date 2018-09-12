// @flow

import { CALL_API } from "redux-api-middleware";
import {
  QUERY_PARAMS,
  BODY_JSON,
  BLOB_DATA
} from "middleware/request";
import config from "config/http";
import type { CallApiOptions } from "middleware/request";

const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";
const HEAD = "HEAD";

export const getRequestTransport = (options: CallApiOptions) => {
  const { method, data = {} } = options;
  const hasBlob = Object.keys(data)
    .some((field: string) => data[field] instanceof Blob);

  if (hasBlob) {
    return BLOB_DATA;
  } else if ([GET, HEAD].includes(method)) {
    return QUERY_PARAMS;
  }

  return BODY_JSON;
};

export const getRequestUrl = (endpoint: string) => (endpoint.slice(0, 1) !== "/"
  ? endpoint : config.httpRoot + endpoint);

export const defaultOptions = {
  headers: {
    "Content-Type": "application/json"
  }
};

export default (options: CallApiOptions) => {
  const { endpoint, ...rest } = options;

  return {
    [CALL_API]: {
      endpoint:  getRequestUrl(endpoint),
      ...defaultOptions,
      ...rest,
      TRANSPORT: getRequestTransport(options)
    }
  };
};

export {
  GET,
  POST,
  PUT,
  DELETE,
  HEAD
};
