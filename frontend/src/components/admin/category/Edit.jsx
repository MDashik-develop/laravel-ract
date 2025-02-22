import React, { useState } from "react";
import Layout from "../../common/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";

function Edit() {
    const [disabled, setDisabled] = useState(false);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const res = await fetch(`${apiUrl}/categories/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${adminToken()}`,
                },
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.status == 200) {
                        console.log(result.data);
                        reset({
                            name: result.data.name,
                            status: result.data.status,
                        })
                    } else {
                        console.log("something went wrong");
                    }
                });
        },
    });

    const saveCategory = async (data) => {
        setDisabled(true);
        const res = await fetch(`${apiUrl}/categories/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${adminToken()}`,
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                setDisabled(false);
                if (result.status == 200) {
                    toast.success(result.message);
                    navigate("/admin/categories");
                } else {
                    console.log("something went wrong");
                }
            });
    };

    return (
        <Layout>
            <div className="row justify-content-center">
                <h1 className="my-2">Edit</h1>
                <div className="col-9">
                    <form onSubmit={handleSubmit(saveCategory)}>
                        <div className="card shadow p-2">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={`form-control ${errors.name && "is-invalid"}`}
                                    {...register("name", {
                                        required: "The name field is required",
                                    })}
                                />
                                {errors.name && (
                                    <p className=" invalid-feedback">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    className={`form-control ${errors.status && "is-invalid"}`}
                                    {...register("status", {
                                        required: "The status field is required",
                                    })}
                                >
                                    <option value="">Select a option</option>
                                    <option value="1">Active</option>
                                    <option value="0">Block</option>
                                </select>

                                {errors.status && (
                                    <p className=" invalid-feedback">{errors.status.message}</p>
                                )}
                            </div>
                            <button
                                disabled={disabled}
                                type="submit"
                                className="btn btn-primary"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Edit;
