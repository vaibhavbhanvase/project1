import { AppBar, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import ItemCard from './ItemCard';
import { useEffect } from 'react';

function NavBar() {

    const [selectedImage, setSelectedImage] = useState();
    const [data, setData] = useState([])
    const [modal, setModal] = useState(false)
    const [cartData, setCartData] = useState({
        title: "",
        price: "",
    })

   useEffect(() => {
    cartData.img = selectedImage
   }, [selectedImage])
   
    const handleChange = (e) => {
        const { name, value } = e.target
        setCartData((pre) => ({ ...pre,  id: uuidv4(), [name]: value }))
    }

    const imageChange = (e) => {
    const size = e.target.files[0].size

        if (size < 200000 ) {
            if (e.target.files && e.target.files.length > 0) {
                setSelectedImage(URL.createObjectURL(e.target.files[0]));
            }
        } else {
            alert("Image size should be less than 100kb")
        }
    };
   
    // console.log(URL.createObjectURL(selectedImage));

    const handleSubmit = (e) => {
        e.preventDefault()
        setData((pre)=> ([...pre, cartData]))
        setCartData({
            title: "",
            price: "",
        })
        
    }

  useEffect(() => {
   if (data) {
    localStorage.setItem("cardData", JSON.stringify(data))
   }
  }, [data])
  
  const getData = JSON.parse(localStorage.getItem("cardData"))
    return (
        <>


            <AppBar sx={{ backgroundColor: "lightcyan" }}>
                <Toolbar className='d-flex justify-content-end'>
                    <button className='btn btn-danger' onClick={() => setModal(true)}><LocalGroceryStoreIcon /> Buy Now</button>
                </Toolbar>
            </AppBar>


            <Modal
                size='md'
                isOpen={modal}
                style={{ marginTop: "100px" }}
            >
                <ModalHeader
                    toggle={() => setModal(!modal)}
                >
                    <h2>Leave Details</h2>
                </ModalHeader>
                <ModalBody
                    style={{ margin: "0 auto" }}
                >

                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Product Name <br />
                                <input type="text" className='form-control  ' name='title' value={cartData.title} onChange={handleChange} required/>
                            </label>
                        </div>
                        <div className='form-group   my-3'>
                            <label>Product Price <br />
                                <input type="number" className='form-control' name='price' value={cartData.price} onChange={handleChange} required/>
                            </label>
                        </div>

                        <div className="form-group">
                            <label>Choose File to Upload: </label>
                            <input type="file" className="form-control" onChange={imageChange} accept="image/png , image/jpeg, image/webp" multiple required/>
                            <p className='text-danger'>Size Below 200kb</p>
                        </div>

                        <div className='d-flex flex-row-reverse mt-3 ' >
                            <div className='mx-2'><button className='btn btn-success' type='submit'>Submit</button></div>
                            <div><button className='btn btn-danger ' onClick={() => setModal(false)}>Cancel</button></div>
                        </div>
                    </form>

                </ModalBody>
            </Modal>
            {selectedImage && <div style={{ margin: "100px" }} className='d-flex'>
                {getData?.map((item, index) => {
                    return(
                        <ItemCard title={item.title}
                            img={item.img}
                            price={item.price}
                            key={index}
                            item={item } />
                    )
                })}
            </div>
            }
        </>
    )
}

export default NavBar

