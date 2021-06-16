/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Item from "./Item";
import Form from "./Form";
import Loading from "./Loading";
import Progress from "./Progress";
import useFetch from "../hooks/useFetch";
import { todoState, markAsDone } from "../state/todoState";
import { postLoadState } from "../state/postLoadState";
import { progressPercentage } from "../state/progressState";
import { editState } from "../state/editState";
import { Patch } from "../hooks/useHttp";

type Param = {
  completed: boolean;
};

const Wrapper = () => {
  const response = useFetch();
  const { status, data } = response;
  const [todos, setTodos] = useRecoilState(todoState);
  const [isPostLoading] = useRecoilState(postLoadState);
  const [progress, setProgress] = useRecoilState(progressPercentage);
  const setMarkAsDone = useSetRecoilState(markAsDone);
  const [editMode, setEditMode] = useRecoilState(editState);

  const handleMarkAsDone = (id: string, isChecked: boolean) => {
    setMarkAsDone(id);
    setProgress({
      visible: true,
      value: 0,
    });

    Patch<Param>(
      id,
      { completed: isChecked },
      {
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.floor(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress({
            value: percentCompleted,
            visible: true,
          });
        },
      }
    ).then(() =>
      setProgress({
        visible: false,
        value: 0,
      })
    );
  };

  React.useEffect(() => {
    if (status === "loaded" && data) {
      setTodos(data);
      todos.forEach((o) => {
        setEditMode({
          ...editMode,
          [o.id]: false,
        });
      });
    }
  }, [response]);

  return (
    <div className="wrapper">
      <h1>Tasks</h1>
      {progress.visible && <Progress percenTage={progress.value} />}
      {status === "loading" && <Loading items={3} />}
      {status === "loaded" &&
        todos?.map((o, index) => (
          <Item
            key={index}
            data={o}
            onChange={handleMarkAsDone}
            isEdit={editMode[o.id]}
          />
        ))}
      {isPostLoading && <Loading items={1} />}
      <Form />
    </div>
  );
};

export default Wrapper;
