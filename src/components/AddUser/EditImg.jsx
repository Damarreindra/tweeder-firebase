import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Form from "react-bootstrap/Form";
import "./AddImg.css";
import { addProfileImg, editProfileImg } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
function EditImg() {
  const [image, setImage] = useState("");
  const uname = localStorage.getItem("uname");
  const uid = localStorage.getItem('id')
  const pfp = localStorage.getItem('img')
  const [open, setOpen] = useState(true)
  
  const dispatch = useDispatch();

   useEffect(()=>{
    dispatch(addProfileImg())
   },[dispatch])
  const { addProfileImgResult, addProfileImgLoading } = useSelector((state) => state.ImageReducer)
  
  const [url, setUrl] = useState("");
  if (!uname) {
    window.location = "/404";
  }

  const defImg =
    "https://user-images.githubusercontent.com/80618060/204520189-e69b68c3-209a-4a6b-9905-ad8cc677e3ed.png";

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "tutorial");
    data.append("cloud_name", "dttd52ltg");
    fetch("https://api.cloudinary.com/v1_1/dttd52ltg/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    if (!url) {
      setTimeout(() => {
        setOpen(false)
      }, 2000); // close after 2000ms
    }
  }, [url]);

  const handleSubmit = () =>{
    dispatch(editProfileImg({profile_img: url}))
}
console.log(addProfileImgLoading);
  return (
    <>
    {url ? 
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
   :     
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mt-5 col-md-7">
          <div className="card mb-4">
            <div className="row g-0">
              <div className="col-md-6 mx-auto">
                <div className="card-body text-center">
                  <h2 className="card-title border-bottom mb-4 text-success">
                  Set Your Profile Picture
                  </h2>
                  <img
                    className="def-img mx-auto"
                    src={url}
                    alt=""
                    srcset=""
                  />
                  <h5 className="card-title mb-3">{uname}</h5>
                  <div action="" id="form">
                    
                    <div>
                      <Form.Control
                        type="file"
                       
                        onChange={(e) => setImage(e.target.files[0])}
                      />

                      <button
                        className="btn btn-success mt-3"
                        onClick={uploadImage}
                      >
                        Upload
                      </button>
                      </div>  
                      
                      <button
                        className="btn btn-success mt-3"
                        onClick={()=>handleSubmit()}
                      >
                        Next
                      </button>
                     
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    }

    </>
  );
}

export default EditImg;
