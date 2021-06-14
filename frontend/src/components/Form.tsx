/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { v4 } from "uuid";
import { postLoadState } from "../state/postLoadState";
import { todoState } from "../state/todoState";
import { Data } from "../types";
import TextField from "./TextField";

type Inputs = {
  title: string;
  titleRequired: string;
};

const Form = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const [isPostLoading, setIsPostLoading] = useRecoilState(postLoadState);
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
