/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Item from "./Item";
import Form from "./Form";
import Loading from "./Loading";
import useFetch from "../hooks/useFetch";
import { todoState, markAsDone } from "../state/todoState";
import { postLoadState } from "../state/postLoadState";

const Wrapper = () => {
  const response = useFetch();
  const { status, data } = response;
  const [todos, setTodos] = useRecoilState(todoState);
  const [isPostLoading] = useRecoilState(postLoadState);
  const setMarkAsDone = useSetRecoilState(markAsDone);

  React.useEffect(() => {
    if (status === "loaded" && data) setTodos(data);
  }, [response]);

  return (
    <div className="wrapper">
      <h1>Tasks</h1>
      {status === "loading" && <Loading items={3} />}
      {status === "loaded" &&
        todos?.map((o, index) => (
          <Item key={index} data={o} onChange={(id) => setMarkAsDone(id)} />
        ))}
      {isPostLoading && <Loading items={1} />}
      <Form />
    </div>
  );
};

export default Wrapper;
