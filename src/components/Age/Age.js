import React from 'react'

const Age = ({ ageRange }) => {
  if( ageRange.length > 0 ) {
      return (
        <div>
            <div className='white f1'>
                {`Your age is between ${ageRange}`}
            </div>
        </div>
    )
  }
}

export default Age;