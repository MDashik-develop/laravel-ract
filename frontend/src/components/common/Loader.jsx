import React from 'react'

function Loader() {
  return (
    <div className='text-center py-5'>
        <div className='spinner-border' role='status'>
            <span className='visually-hidden'>loading...</span>
        </div>
    </div>
  )
}

export default Loader