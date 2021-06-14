/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios, { AxiosRequestConfig } from "axios";
import { TodoResponse } from "../types";

const useFetch = (options?: AxiosRequestConfig): TodoResponse => {
  const [state, setState] = React.useState<TodoResponse>({
    status: "init",
  });
  React.useEffect(() => {
    setState({ status: "loading" });

    (async (): Promise<void> => {
      await axios
        .get("http://localhost:3001/todos", options)
        .then((response) => {
          setState({
            status: "loaded",
            data: response.data,
          });
        })
        .catch((error) => {
          console.error(error);
          setState({ status: "error" });
        });
    })();
  }, []);

  return state;
};

export default useFetch;
