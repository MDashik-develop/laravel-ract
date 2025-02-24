import React, { useEffect, useState } from 'react'
import Layout from '../../common/Layout'
import { Link } from 'react-router-dom'
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';
import Loader from '../../common/Loader';
import Nostate from '../../common/Nostate';

function Show() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchProducts = async () => {
    setLoader(true);
    const res = await fetch(`${apiUrl}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      }
    })
      .then(res => res.json())
      .then(result => {
        setLoader(false);
        if (result.status == 200) {
          console.log(result.data)
          setProducts(result.data);
        } else {
          console.log("something went wrong-fetchProducts-")
        }
      })
  }

  const deleteProduct = async (id) => {

    if (confirm('Are you sure you want to delete?')) {
      const res = await fetch(`${apiUrl}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        }
      }).then(res => res.json())
        .then(result => {
          if (result.status == 200) {
            const newProducts = products.filter(product => product.id !== id)
            setProducts(newProducts)
            toast.success(result.message)
          } else {
            console.log("something went -deleteProduct- wrong")
          }
        })
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <Layout>
      <div className="row justify-content-center">
        <div className='col-10'>
          <div className='row my-2'>
            <div className='col-9'>
              <h2>Product</h2>
            </div>
            <div className='col-3  row justify-content-end align-items-center'>
              <Link to="/admin/products/create" className='bg-warning text-center py-2 px-2 rounded'>Create</Link>
            </div>
          </div>

          <div className='card shadow'>
            <div className='card-body p-4'>
              {
                loader == true && <Loader />
              }

              {
                loader == false && products.length == 0 && <Nostate text="Record not found" />
              }

              {
                products && products.length > 0 &&

                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th width="50">Id</th>
                      <th>Image</th>
                      <th>title</th>
                      <th width="20">Price</th>
                      <th width="20">Qty</th>
                      <th width="20">Sku</th>
                      <th width="30">Status</th>
                      <th width="100">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products.map(product => {
                        return (

                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                              {
                                (product.image_url == "") ? <img src="https://placehold.co/50x50"/> : <img src={product.image_url} alt="" width={50} />
                              }
                            </td>
                            <td>{product.title}</td>
                            <td>${product.price}</td>
                            <td>{product.qty}</td>
                            <td>{product.sku}</td>
                            <td>
                              {
                                product.status == 1 ? (
                                  <span className='badge bg-success'>Active</span>
                                ) : (
                                  <span className='badge bg-danger'>Inactive</span>
                                )
                              }
                            </td>
                            <td>
                              <Link to={`/admin/products/edit/${product.id}`} className='m-1'>
                                <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="blue" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="blue" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                              </Link>
                              <Link onClick={() => deleteProduct(product.id)} className='m-1'>
                                <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                              </Link>
                            </td>
                          </tr>
                        )
                      })
                    }

                  </tbody>
                </table>
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Show