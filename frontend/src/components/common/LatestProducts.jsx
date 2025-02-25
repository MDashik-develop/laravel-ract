import React, { useEffect, useState } from 'react'
import { apiUrl } from './http'

function LatestProducts() {

    const [products, setProducts] = useState([])

    const LatestProducts = async () => {
        await fetch(apiUrl + '/get-latest-products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                setProducts(result.data)
            });
    }

    useEffect(() => {
        LatestProducts()
    }, [])

    return (
        <section>
            <div className="container">
                <h2>New Arrivals</h2>
                <div className="row mt-4">
                    {
                        products && products.map((product, index) => (
                            <div className="col-md-3 col-6" key={index}>
                                <div className="product card border-0">
                                    <div className="card-img">
                                        <img src={product.image_url} alt="product" className="img-fluid" />
                                    </div>
                                    <div className="card-body">
                                        <a href="">{product.title}</a>
                                        <div className="price">
                                            ${product.price} &nbsp;
                                            {
                                                product.compare_price && <span className='text-decoration-line-through'>${product.compare_price}</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default LatestProducts