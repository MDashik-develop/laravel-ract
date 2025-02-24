import React, { useContext } from "react";
import Layout from "../common/Layout";
import { useForm } from "react-hook-form";
import { apiUrl } from "../common/http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuth";

function Login() {
    const {login} = useContext(AdminAuthContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

      const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);

        const res = await fetch(`${apiUrl}/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data) 
        }).then(res => res.json())
        .then(result => {
            console.log(result)

            if (result.status == 200) {
                const adminInfo = {
                    token: result.token,
                    id: result.id,
                    name: result.name
                }

                localStorage.setItem("adminInfo", JSON.stringify(adminInfo))
                
                login(adminInfo)
                navigate("/admin/dashboard")

            }else{
                toast.error(result.message)
            }
        })
    }

  return (
    <Layout>
      <form className=" container p-4 mx-auto max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="card p-3">
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">
              Email address
            </label>
            <input
                {
                    ...register("email", {
                        required: "The email fld is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                        },
                    })
                }
                type="text" id="email" placeholder="Enter email" 
                 className={`form-control ${errors.email &&  'is-invalid'}`}
            />
                {
                    errors.email && <p className=" invalid-feedback">{errors.email.message}</p>
                }

          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
                {
                    ...register("password", {
                        required: "The password fld is required",
                    })
                }
              type="password" id="password" placeholder="Password"
              className={`form-control ${errors.password &&  'is-invalid'}`}

              
            />
            {
                errors.email && <p className=" invalid-feedback">{errors.email.password}</p>
            }
          </div>

          <div className="mb-4 flex items-center">
            <input type="checkbox" id="check" className="mr-2" />
            <label htmlFor="check">Check me out</label>
          </div>

          <button type="submit" className="px-4 py-2 bg-success text-white rounded hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default Login;
