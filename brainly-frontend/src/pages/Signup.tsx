import { useRef, useState } from "react";
import Button from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await axios.post("http://localhost:3000/api/v1/signup", {
      username,
      password,
    });

    if (response.status === 200) {
      navigate("/signin");
    }

  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-100">
      <div className="bg-white rounded-md border border-slate-300 p-10 flex flex-col gap-5 ">
        <Input refrence={usernameRef} placeholder="Username" />
        <Input refrence={passwordRef} placeholder="Password" />
        <div className="flex flex-col items-center gap-3">
          <Button
            onclick={handleSignup}
            text="Sign Up"
            varient="primary"
            size="md"
          />
          <p className="text-sm">
            Already have an account?{" "}
            <span className=" bg-slate-100 cursor-pointer hover:bg-slate-200 p-1 rounded-lg transition-all duration-150">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
