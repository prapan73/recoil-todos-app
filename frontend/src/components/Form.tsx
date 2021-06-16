/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { v4 } from "uuid";
import { Post } from "../hooks/useHttp";
import { postLoadState } from "../state/postLoadState";
import { progressPercentage } from "../state/progressState";
import { todoState } from "../state/todoState";
import { Data } from "../types";
import TextField from "./TextField";

type Inputs = {
  title: string;
  titleRequired: string;
};

const Form: React.FC = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const setIsPostLoading = useSetRecoilState(postLoadState);
  const setProgress = useSetRecoilState(progressPercentage);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs, e: any): void => {
    setIsPostLoading(true);

    const params: Data = { id: v4(), title: data.title, completed: false };

    setTimeout(() => {
      setTodos([...todos, params]);
      setIsPostLoading(false);
    }, 300);

    setProgress({
      visible: true,
      value: 0,
    });

    Post<Data>(params, {
      onUploadProgress: (progressEvent) => {
        let percentCompleted = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress({
          value: percentCompleted,
          visible: true,
        });
      },
    }).then(() =>
      setProgress({
        visible: false,
        value: 0,
      })
    );

    e.target.reset();
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <TextField
          {...register("title", { required: true })}
          error={errors.title && "Title is required"}
        />
      </form>
    </div>
  );
};

export default Form;
