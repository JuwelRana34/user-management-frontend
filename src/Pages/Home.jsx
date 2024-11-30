import { useContext, useState } from "react";
import { UserContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import { toast } from "sonner";

function Home() {
  const { signin, signUp } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  // const HandelLogin = (e)=>{
  //   e.preventDefault()
  //   const {name, password} = e.target
  //   signin(name.value, password.value)
  //   .then((userCredential)=>{
  //     const user = userCredential.name
  //     console.log(user)
  //   })
  //   .catch((error)=>{
  //     console.error("Error signing in:", error);
  //   })
  // }
  const HandelsignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = e.target;
    signUp(email.value, password.value)
      .then(() => {
        axios
          .post("https://user-management-xi-two.vercel.app/signup", {
            email: email.value,
            name: "user",
          })
          .then(() => {
           
            e.target.reset()
            toast.success("registration successful!" )
            setLoading(false)
          })
          .catch((error) => {
            console.error("Error signing up:", error);
            toast.error("Error signing up! Please try again.", error);
            setLoading(false)
          });
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={HandelsignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">{
             loading?<span className="loading loading-spinner text-white"></span> :"Login"
            } </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
