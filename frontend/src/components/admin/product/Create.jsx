import React, { useEffect, useState, useRef, useMemo } from 'react';
import Layout from '../../common/Layout';
import { toast } from 'react-toastify';
import { adminToken, apiUrl } from '../../common/http';
import { set, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';

function Create({ placeholder }) {


    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = useMemo(() => ({
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: placeholder || ''
    }),
        [placeholder]
    );


    const [disabled, setDisabled] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm();

    const saveProduct = async (data) => {

        const formData = { ...data, "description": content, "gallery": gallery }

        setDisabled(true)
        const res = await fetch(`${apiUrl}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(result => {
                setDisabled(false)
                if (result.status == 200) {
                    toast.success(result.message)
                    console.log(result.data)
                    navigate('/admin/products')
                } else {
                    // console.log("something went wrong")

                    const formErrors = result.errors;
                    Object.keys(formErrors).forEach((field) => {
                        setError(field, { message: formErrors[field][0] });
                    });
                }
            })
    }

    const fetchCategories = async () => {
        const res = await fetch(`${apiUrl}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    // console.log(result.data)
                    setCategories(result.data)
                } else {
                    console.log("something went wrong")
                }
            })
    }

    const fetchBrands = async () => {
        const res = await fetch(`${apiUrl}/brands`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    // console.log(result.data)
                    setBrands(result.data)
                } else {
                    console.log("something went wrong")
                }
            })
    }

    const handleFile = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("image", file);
        setDisabled(true)

        const res = await fetch(`${apiUrl}/temp-images`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                gallery.push(result.data.id)
                setGallery(gallery)

                galleryImages.push(result.data.image_url)
                setGalleryImages(galleryImages)
                setDisabled(false)
                e.target.value = ""
            })
    }

    const deleteImage = (image) => {
        const newGallery = galleryImages.filter(gallery => gallery !== image)
        setGalleryImages(newGallery)
    }
    useEffect(() => {
        fetchCategories()
        fetchBrands()
    }, [])

    return (
        <Layout>
            <h1>create</h1>
            <div className='container mx-auto my-0 px-4'>
                <form onSubmit={handleSubmit(saveProduct)}>
                    <div className='card shadow p-3'>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" id="name"
                                className={`form-control ${errors.title && 'is-invalid'}`}
                                {
                                ...register("title", {
                                    required: 'The title field is required'
                                })
                                }
                            />
                            {
                                errors.title && <p className=" invalid-feedback">{errors.title.message}</p>
                            }
                        </div>

                        <div className="row mb-3">
                            <div className="col-6 pr-2">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select id="category"
                                    className={`form-control ${errors.category && 'is-invalid'}`}
                                    {
                                    ...register("category", {
                                        required: 'The category field is required'
                                    })
                                    }
                                >
                                    <option value="">Select a category</option>
                                    {
                                        categories && categories.map((category) => {
                                            return (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                {
                                    errors.category && <p className=" invalid-feedback">{errors.category.message}</p>
                                }
                            </div>
                            <div className="col-6 pl-2">

                                <label htmlFor="brand" className="form-label">Brand</label>
                                <select id="brand"
                                    className={`form-control ${errors.title && 'is-invalid'}`}
                                    {
                                    ...register("brand", {
                                        required: 'The title field is required'
                                    })
                                    }
                                >

                                    <option value="">Select a category</option>
                                    {
                                        brands && brands.map((brand) => {
                                            return (
                                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                {
                                    errors.brand && <p className=" invalid-feedback">{errors.brand.message}</p>
                                }
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor=""> Short Description</label>
                            <textarea placeholder="shoet descripton" rows={3}

                                className={`form-control ${errors.short_description && 'is-invalid'}`}
                                {
                                ...register("short_description", {
                                    required: 'The short description field is required'
                                })
                                }
                            ></textarea>
                            {
                                errors.short_description && <p className=" invalid-feedback">{errors.short_description.message}</p>
                            }
                        </div>

                        <div className="mb-3">
                            <label htmlFor="">Discription</label>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={1}
                                onBlur={newContent => setContent(newContent)}

                            />
                            {
                                errors.description && <p className=" invalid-feedback">{errors.description.message}</p>
                            }
                        </div>

                        <div className="row mb-3">
                            <div className="col-6 pr-2">
                                <label htmlFor="">Price</label>
                                <input type="text" placeholder='Price'
                                    className={`form-control ${errors.price && 'is-invalid'}`}
                                    {
                                    ...register("price", {
                                        required: 'The price field is required'
                                    })
                                    }
                                />
                                {
                                    errors.price && <p className=" invalid-feedback">{errors.price.message}</p>
                                }
                            </div>
                            <div className="col-6 pl-2">
                                <label htmlFor="">Discount Price</label>
                                <input type="text" placeholder='Discount Price'
                                    className={`form-control ${errors.compare_price && 'is-invalid'}`}
                                    {
                                    ...register("compare_price")
                                    }
                                />
                                {
                                    errors.compare_price && <p className=" invalid-feedback">{errors.compare_price.message}</p>
                                }
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-6 pr-2">
                                <label htmlFor="">SKU</label>
                                <input type="text" placeholder='SKU'
                                    className={`form-control ${errors.sku && 'is-invalid'}`}
                                    {
                                    ...register("sku", {
                                        required: 'The sku field is required'
                                    })
                                    }
                                />
                                {
                                    errors.sku && <p className=" invalid-feedback">{errors.sku.message}</p>
                                }
                            </div>
                            <div className="col-6 pl-2">
                                <label htmlFor="">Barcode</label>
                                <input type="text" placeholder='Barcode'
                                    className={`form-control ${errors.barcode && 'is-invalid'}`}
                                    {
                                    ...register("barcode", {
                                        required: 'The barcode field is required'
                                    })
                                    }
                                />
                                {
                                    errors.barcode && <p className=" invalid-feedback">{errors.barcode.message}</p>
                                }
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-6 pr-2">
                                <label htmlFor="">QTY</label>
                                <input type="text" placeholder='QTY'
                                    className={`form-control ${errors.qty && 'is-invalid'}`}
                                    {
                                    ...register("qty", {
                                        required: 'The qty field is required'
                                    })
                                    }
                                />
                                {
                                    errors.qty && <p className=" invalid-feedback">{errors.qty.message}</p>
                                }
                            </div>
                            <div className="col-6 pl-2">
                                <label htmlFor="status" className="form-label">Status</label>
                                <select id="status"
                                    className={`form-control ${errors.status && 'is-invalid'}`}
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
                        </div>


                        <div className="mb-3">

                            <label htmlFor="featured" className="form-label">Status</label>
                            <select id="featued"
                                className={`form-control ${errors.status && 'is-invalid'}`}
                                {
                                ...register("is_featured", {
                                    required: 'The Featured field is required'
                                })
                                }
                            >
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>

                            {
                                errors.is_featured && <p className=" invalid-feedback">{errors.is_featured.message}</p>
                            }
                        </div>

                        <div className="mb-3">
                            <label htmlFor="">Image</label>
                            <input type="file"
                                className={`form-control ${errors.image && 'is-invalid'}`}
                                onChange={handleFile}
                            />
                            {
                                errors.image && <p className=" invalid-feedback">{errors.image.message}</p>
                            }
                        </div>

                        <div className="mb-3">
                            <div className="row">
                                {
                                    galleryImages && galleryImages.map((image, index) => {
                                        return (
                                            <div key={index} className="col-md-3">
                                                <div className="card shadow">
                                                    <img src={image} alt="" className="w-100" />
                                                    <button className='btn btn-danger' onClick={() => deleteImage(image)}>Delete</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <button
                            disabled={disabled}
                            type="submit" className="btn btn-primary">Create</button>
                    </div>
                </form >
            </div >
        </Layout >
    )
}

export default Create