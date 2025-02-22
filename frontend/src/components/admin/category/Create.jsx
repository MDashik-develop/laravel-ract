import React, { useState } from 'react'
import Layout from '../../common/Layout'
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Create() {
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        } = useForm();
        
    const saveCategory = async (data) => {
        setDisabled(true)
        const res = await fetch(`${apiUrl}/categories`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {
                setDisabled(false)
                if (result.status == 200) {
                    toast.success(result.message)
                    navigate('/admin/categories')
                } else {
                    console.log("something went wrong")
                }
        })
    }
    
    return (
        <Layout>
            <h1>create</h1>
            <div className='container mx-auto my-0 px-4'>
                <form onSubmit={handleSubmit(saveCategory)}>
                    <div className='card shadow'>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" id="name"
                                className={`form-control ${errors.name &&  'is-invalid'}`}
                                {
                                    ...register("name", {
                                        required: 'The name field is required'
                                    })
                                }
                            />
                            {
                                errors.name && <p className=" invalid-feedback">{errors.name.message}</p>
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select id="status"
                                className={`form-control ${errors.status &&  'is-invalid'}`}
                                {
                                    ...register("status", {
                                        required: 'The status field is required'
                                    })
                                }
                            >
                                <option value="">Select a option</option>
                                <option value="1">Active</option>
                                <option value="0">Block</option>
                            </select>

                            {
                                errors.status && <p className=" invalid-feedback">{errors.status.message}</p>
                            }
                        </div>
                        <button
                             disabled={disabled}
                            type="submit" className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Create