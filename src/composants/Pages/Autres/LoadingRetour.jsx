import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import "../../Styles/StyleLoading.css"
import Index from '../../Acceuil/Index';

function LoadingRetour() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    
    return (
        <div className='loading'>
            {loading ? <ClipLoader className='spin' color={"#123abc"} loading={loading} size={50} /> : <Index /> }
        </div>
  )
}

export default LoadingRetour