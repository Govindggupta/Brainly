import { useRef, useState } from "react";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      const response = await axios.post("http://localhost:3000/api/v1/signin", {
        username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);

      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        setError(error.response.data.error);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-100">
      <div className="bg-white rounded-md border border-slate-300 p-10 flex flex-col gap-5 ">
        <Input placeholder="Username" refrence={usernameRef} />
        <Input placeholder="Password" refrence={passwordRef} />
        <div className="flex flex-col items-center gap-3">
          <Button
            onclick={handleSignin}
            text="Sign In"
            varient="primary"
            size="md"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <p className="text-sm">
            Don't have an account?{" "}
            <span className=" bg-slate-100 cursor-pointer hover:bg-slate-200 p-1 rounded-lg transition-all duration-150">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
