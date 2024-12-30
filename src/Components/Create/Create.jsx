import React, { Fragment, useContext ,useState } from 'react';
import './Create.css';
import Header from '../../Components/Header/Header';
import {FirebaseContext , AuthContext} from '../../store/Context'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const Create = () => {

  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState(null)

  const {storage} = useContext(FirebaseContext)

  const handleSubmit = () =>{
    if (!image) {
      alert("Please select an image to upload");
      return;
    }
  
    const storageRef = ref(storage, `/images/${image.name}`);
    uploadBytes(storageRef, image)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => {
        console.log("File available at:", url);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname" value={price} onChange={(e) =>setPrice(e.target.value)}>Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" />
            <br />
        
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ' '}></img>
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
