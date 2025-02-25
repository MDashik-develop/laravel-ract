import React, { useEffect, useState, useRef, useMemo } from 'react';
import Layout from '../../common/Layout';
import { toast } from 'react-toastify';
import { adminToken, apiUrl } from '../../common/http';
import { set, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';

function Edit({ placeholder }) {


  const [content, setContent] = useState('');

  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || ''
  }),
    [placeholder]
  );


  const editor = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sizesChecked, setSizesChecked] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(`${apiUrl}/products/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        }
      })
        .then(res => res.json())
        .then(result => {
          setProductImages(result.data.product_images)
          setSizesChecked(result.productSizes)
          reset({
            title: result.data.title,
            category: result.data.category_id,
            brand: result.data.brand_id,
            sku: result.data.sku,
            qty: result.data.qty,
            short_description: result.data.short_description,
            description: result.data.description,
            price: result.data.price,
            barcode: result.data.barcode,
            is_featured: result.data.is_featured,
            status: result.data.status


          })
          console.log(result)
        })
    }
  });


  const saveProduct = async (data) => {

    const formData = { ...data, "description": content }

    setDisabled(true)
    const res = await fetch(`${apiUrl}/products/${params.id}`, {
      method: 'PUT',
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

          setBrands(result.data)
        } else {
          console.log("something went-fetchBrands- wrong")
        }
      })
  }

  const fetchSizes = async () => {
    const res = await fetch(`${apiUrl}/sizes`, {
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
          console.log(result)
          setSizes(result.data)
        } else {
          console.log("something went-fetchSizes- wrong")
        }
      })
  }

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    formData.append("product_id", params.id);
    setDisabled(true)

    const res = await fetch(`${apiUrl}/save-product-image`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
      body: formData
    })
      .then(res => res.json())
      .then(result => {

        if (result.status == 200) {
          productImages.push(result.data)
          setProductImages(productImages)
        } else {
          toast.error(result.errors.image[0]);
        }

        setDisabled(false)
        e.target.value = ""
      })
  }

  const deleteImage = async (id) => {
    if (confirm("Are you sure you want delete?")) {
      
    const res = await fetch(`${apiUrl}/delete-product-image/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.status == 200) {
          const newproductImages = productImages.filter(productImage => productImage.id != id)
          setProductImages(newproductImages)
          toast.success(result.message)
        } else {
          // console.log("something went-deleteImage- wrong")
          toast.error(reset.massage)
        }
      })
    }

  }

  const changeImage = async (image) => {
    const res = await fetch(`${apiUrl}/change-product-default-image?product_id=${params.id}&image=${image}`, {
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
          toast.success(result.message)
          // setBrands(result.data)
        } else {
          console.log("something went-changeImage- wrong")
        }
      })

  }

  useEffect(() => {
    fetchCategories()
    fetchBrands()
    fetchSizes()
  }, [])

  return (
    <Layout>

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
                <label htmlFor="">Compare Price</label>
                <input type="text" placeholder='Compare Price'
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
              <label className="form-label">Sizes</label>
              <br />
              {
                sizes && sizes.map(size => {
                  return (
                    <div key={size.id} className="form-check-inline ps-3">
                      <input
                        {
                        ...register("sizes")
                        }
                        checked={sizesChecked.includes(size.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSizesChecked([...sizesChecked, size.id])
                          } else {
                            setSizesChecked(sizesChecked.filter(sid => size.id != sid))
                          }
                        }}
                        type="checkbox" className='form-check-input' value={size.id} id={`size-${size.id}`} />
                      <label htmlFor={`size-${size.id}`} className='form-check-label ps-2'>{size.name}</label>
                    </div>
                  )
                })
              }
            </div>

            <div className="mb-3">

              <label htmlFor="featured" className="form-label">featured</label>
              <select id="featued"
                className={`form-control ${errors.status && 'is-invalid'}`}
                {
                ...register("is_featured", {
                  required: 'The Featured field is required'
                })
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
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
                  productImages && productImages.map((productImage, index) => {
                    return (
                      <div key={index} className="col-3 m-1">
                        <div className="card shadow">
                          <img src={productImage.image_url} alt="" className="w-100" />
                        </div>
                        <button type='button' className='btn btn-danger w-100 mb-2' onClick={() => deleteImage(productImage.id)}>Delete</button>
                        <button type='button' className='btn btn-secondary w-100' onClick={() => changeImage(productImage.image)}>Set as Default</button>
                      </div>
                    )
                  })
                }
              </div>
            </div>

            <button
              disabled={disabled}
              type="submit" className="btn btn-primary">Update</button>
          </div>
        </form >
      </div >
    </Layout>
  );
}

export default Edit