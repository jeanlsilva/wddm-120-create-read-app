import React from "react";
import { useForm } from "react-hook-form";
import { app } from "../config/firebaseConfig";
import { getDatabase, ref, set } from "firebase/database";

export default function SignUp() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    const database = getDatabase(app);
    const id = data.hiddenId || Date.now();
    set(ref(database, 'users/' + id), {
      username: data.name,
      email: data.email,
      password: data.password
    })
  }

  return (
    <div className="h-screen bg-green-100">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-center items-center text-left">
                <input type="hidden" {...register("hiddenId")} />
                {/* register your input into the hook by invoking the "register" function */}
                <div className="flex flex-col items-start">
                  <label htmlFor="name">Name</label>
                  <input type="text" {...register("name")} />
                </div>
                <div className="flex flex-col items-start">
                  <label htmlFor="email">Email</label>
                  <input type="text" {...register("email")} />
                </div>
                <div className="flex flex-col items-start">
                  <label htmlFor="password">Password</label>
                  <input type="text" {...register("password")} />
                </div>
                
                {/* include validation with required or other standard HTML validation rules 
                <input {...register("exampleRequired", { required: true })} />
                */}
                
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}
                
                <button type="submit" className="bg-yellow-100 px-3 mt-3">Sign up</button>
            </div>
        </form>
    </div>
  );
}