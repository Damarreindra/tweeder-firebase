import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import app from "../../firebase";
import {
  Avatar,
  Box,
  Flex,
  Image,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Icon,
  Button,
} from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";
import { Formik, Form, Field } from "formik";

function EditPictureForm() {
  const [user, setUser] = useState(null);
  const [header, setHeader] = useState("");
  const [headerPreview, setHeaderPreview] = useState("");
  const [profile, setProfile] = useState("");
  const [profilePreview, setProfilePreview] = useState("");
  const [name, setName] = useState("");
  const db = getFirestore(app);
  const auth = getAuth(app);
  // let uu = auth.currentUser
  // console.log(
  //  uu
  // );
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({ user, ...userData });
          setName(userData.name || "");
          setHeader(userData.header || "");
          setProfile(user.photoURL);
        } else {
          setUser(user);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

 

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(file);
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };



  const handleSubmit = async (values, actions) => {
    try {
      // Upload the header image to Cloudinary
      const data = new FormData();
      data.append("file", profile);
      data.append("upload_preset", "tutorial");
      data.append("cloud_name", "dttd52ltg");
  
      const response = await fetch("https://api.cloudinary.com/v1_1/dttd52ltg/image/upload", {
        method: "POST",
        body: data,
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error.message || "Image upload failed");
      }
  
      const profileURL = result.url;
  
      // Update user profile in Firebase Authentication
      const auth = getAuth();
      const user = auth.currentUser;
     
      if (user) {
        await  updateProfile(user,{
          photoURL: profileURL,
        })
        console.log("Profile photo URL successfully updated!");
      }
  
      // Update Firestore document
      const userDocRef = doc(db, "users", user.uid);
      if(values.name == ""){
        await updateDoc(userDocRef, {
          name: name,
        });
      }else{
        await updateDoc(userDocRef, {
          name: values.name,
        });
      }
     
      console.log("Document successfully updated!");
      window.location.reload()
    } catch (error) {
      console.error("Error updating profile or document:", error);
    } finally {
      actions.setSubmitting(false); // Reset submitting state

    }
  };
  
  return (
    <Formik
      initialValues={{ name: name }}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <Box>
            <Flex
             
            >
              <Image src={headerPreview || header} maxH={250}  />
              <Input
                type="file"
                accept="image/*"
                id="headerInput"
                style={{ display: "none" }}
      
              />
            </Flex>
            <Flex pl={[2, 5]} justify="space-between" flexWrap="wrap">
              <Flex
                as="button"
                type="button" 
                position="relative"
                justify="center"
                alignItems="center"
                onClick={() => document.getElementById("profileInput").click()}
              >
                <Avatar
                  border="solid 2px"
                  mt={[-6, -8, -10, -16]}
                  size="2xl"
                  src={profilePreview || profile}
                />
                <Icon as={FaCamera} position="absolute" alignItems="center" color="white" />
                <Input
                  type="file"
                  accept="image/*"
                  id="profileInput"
                  style={{ display: "none" }}
                  onChange={handleProfileChange}
                />
              </Flex>
            </Flex>
            <Box maxW="sm" mx="auto" p={4}>
              <VStack spacing={4}>
                <FormControl id="name">
                  <FormLabel fontSize="sm" fontWeight="bold" color="gray.500">
                    Name
                  </FormLabel>
                  <Field
                    name="name"
                    placeholder={name}
                    value={formikProps.values.name}
                    onChange={formikProps.handleChange}
                  />
                </FormControl>
              </VStack>
            </Box>
            <Button type="submit">Update</Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default EditPictureForm;
