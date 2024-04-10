import React, { useState } from "react";
import { AiOutlineArrowRight } from 'react-icons/ai';
import axios from 'axios';
import {message} from 'antd'; 
import StepOne from "./StepOne";




// Check if the input is a file and if it's valid


const Register = () => {
  const [input, setInput] = useState({
    team_name: "",
    team_member_1_name: "",
    team_member_1_department: "",
    team_member_1_phone: "",
    team_member_1_email: "",
    team_member_1_register_number: "",
    transaction_id: "",
    payment_screenshot:"",
    
  });

 

  const [status, setStatus] = useState(null);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const fileToBase64 = (filePath) => {
    return new Promise((resolve, reject) => {
      fetch(filePath)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
          return response.blob();
        })
        .then(blob => {
          const reader = new FileReader();
          reader.onload = function(event) {
            const base64String = event.target.result.split(',')[1];
            resolve(base64String);
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.readAsDataURL(blob);
        })
        .catch(error => reject(error));
    });
  };
  

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
  
      // Check if any of the fields are empty
      const emptyFields = Object.values(input).some(value => value === "");
      if (emptyFields) {
        const errorMessage = "Please fill in all fields";

         message.error(errorMessage);
        throw new Error(errorMessage);
      }
  
      // Check if any field is displaying an invalid input message
      const invalidFields = Object.keys(input).filter(fieldName => {
        const errorContainer = document.getElementById(`${fieldName}_error`);
        return errorContainer && errorContainer.textContent === "Invalid input";
      });
  
      if (invalidFields.length > 0) {
        const errorMessage = "Form can't be submitted due to invalid input";
        message.error(errorMessage);
        throw new Error(errorMessage);
      }

      console.log(input.payment_screenshot)
      // if (input.payment_screenshot) {
      //   console.log('inside');
      //   fileToBase64(input.payment_screenshot)
      //     .then(base64Image => {
      //       input.payment_screenshot = base64Image;
      //     })
      //     .catch(error => {
      //       console.error('Error converting file to base64:', error);
      //     });
      // }
      
      const res = await axios.post("http://localhost:5001/submit-form", input);
      console.log(input)
      console.log(res.status, res.data);
      setStatus(res.status);
      const messageText = `Submitted Form Successfully.`;
      message.success(messageText);
   // Send the base64 string to the backend
         
      
      // Reset form fields after successful submission
      setInput({
        team_name: "",
        team_member_1_name: "",
        team_member_1_department: "",
        team_member_1_phone: "",
        team_member_1_email: "",
        team_member_1_register_number: "",
        transaction_id: "",
    payment_screenshot: null,
      });
    } catch (error) {
      console.log(error.message);
      setStatus(400);
    }
  };
  
  

  return (
    <div name="register" className="w-full h-screen  flex flex-col gap-5   justify-center items-center ">
      <h1 className=" font-semibold text-xl lg:text-3xl">Register</h1>
      <div className="w-[95%]  formglass flex flex-col items-center rounded-md gap-7 py-7 justify-around ">
        <StepOne inputHandler={inputHandler} input={input} />
        <div className="w-[90%] flex justify-between items-center">
       <center>   <button className="flex items-center gap-2 justify-center font-bold px-3 py-1  rounded-md w-[110px] btnGlass " onClick={handleSubmit}>Submit</button></center>
        </div>
      </div>
    </div>
  );
};

export default Register;
