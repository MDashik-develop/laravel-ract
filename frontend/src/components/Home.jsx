import React from 'react'
import Layout from './common/Layout'
import LatestProducts from './common/LatestProducts'
import FeaturedProducts from './common/FeaturedProducts'

function Home() {
    return (
        <Layout>Home
            <LatestProducts />
            <FeaturedProducts />
        </Layout>
    )
}

export default Home