

import React from "react";

const StepOne = ({ inputHandler, input }) => {
  
  const handleInputChange = (e) => {
    inputHandler(e); // Propagate input change to parent component
    
    // Check validation for the current field
    const { name, value, validity } = e.target;
    const errorMessage = validity.valid ? "" : "Invalid input";
    // Here, you can define your validation logic based on the field's name
    
    // Display error message if any
    const errorContainer = document.getElementById(`${name}_error`);
    if (errorContainer) {
      errorContainer.textContent = errorMessage;
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      fileToBase64(file)
        .then(base64Image => {
          inputHandler({ target: { name: 'payment_screenshot', value: base64Image } });
          const errorContainer = document.getElementById(`payment_screenshot_error`);
          if (errorContainer) {
            errorContainer.textContent = '';
          }
        })
        .catch(error => {
          console.error('Error converting file to base64:', error);
        });
  
      // Display the file name or any other relevant information
      const fileNameContainer = document.getElementById(`payment_screenshot_filename`);
      if (fileNameContainer) {
        fileNameContainer.textContent = file.name;
      }
    }
  };
  

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function(event) {
        const base64String = event.target.result.split(',')[1];
        resolve(base64String);
      };

      reader.onerror = function(error) {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  
  
  return (
    <div className="flex w-full px-5">
      <form className="w-full flex flex-col gap-3">
        <div className="flex flex-col w-full">
          <label className="text-gray-200 md:text-base xl:text-base capitalize py-1 font-semibold text-sm" htmlFor="team_name">Team Name</label>
          <input value={input.team_name} name="team_name" onChange={handleInputChange} placeholder="Enter your Team name" required className="focus:font-semibold formInputGlass px-4 text-sm text-white md:text-base py-2 focus:outline-blue-700 focus:outline-2 outline-none border-none" type="text" id="team_name" />
          <span id="team_name_error" className="text-red-500"></span>
        </div>
        <div className="flex flex-col py-1">
          <label className="text-gray-200 md:text-base xl:text-base capitalize py-1 font-semibold text-sm" htmlFor="team_member_1_name">Name</label>
          <input value={input.team_member_1_name} name="team_member_1_name" onChange={handleInputChange} placeholder="Enter your name" required pattern="[A-Za-z\s]+" title="Only alphabets are allowed" className="focus:font-semibold formInputGlass px-4 text-sm rounded-sm text-white bg-slate-200 md:text-base py-2 focus:outline-blue-700 focus:outline-3 outline-none border-none" type="text" id="team_member_1_name" />
          <span id="team_member_1_name_error" className="text-red-500"></span>
        </div>
        <div className="flex flex-col py-1">
          <label className="text-gray-200 md:text-base xl:text-base capitalize py-1 font-semibold text-sm" htmlFor="team_member_1_department">Department</label>
          <input value={input.team_member_1_department} name="team_member_1_department" onChange={handleInputChange} placeholder="Enter your Dept name" required className="focus:font-semibold formInputGlass px-4 text-sm rounded-sm text-white bg-slate-200 md:text-base py-2 focus:outline-blue-700 focus:outline-3 outline-none border-none" type="text" id="team_member_1_department" />
          <span id="team_member_1_department_error" className="text-red-500"></span>
        </div>
        <div className="flex flex-col py-1">
          <label className="text-gray-200 md:text-base xl:text-base capitalize py-1 font-semibold text-sm" htmlFor="team_member_1_phone">Phone</label>
          <input value={input.team_member_1_phone} name="team_member_1_phone" onChange={handleInputChange} placeholder="Enter your Phone number" required pattern="[0-9]{10}" title="Phone number must be 10 digits" className="focus:font-semibold formInputGlass px-4 text-sm rounded-sm text-white bg-slate-200 md:text-base py-2 focus:outline-blue-700 focus:outline-3 outline-none border-none" type="text" id="team_member_1_phone" />
          <span id="team_member_1_phone_error" className="text-red-500"></span>
        </div>
        <div className="flex flex-col py-1">
          <label className="text-gray-200 md:text-base xl:text-base capitalize py-1 font-semibold text-sm" htmlFor="team_member_1_email">Email</label>
          <input value={input.team_member_1_email} name="team_member_1_email" onChange={handleInputChange} placeholder="Enter your Email" required pattern="[^\s@]+@[^\s@]+\.[^\s@]+" title="Enter a valid email address" className="focus:font-semibold formInputGlass px-4 text-sm rounded-sm text-white bg-slate-200 md:text-base py-2 focus:outline-blue-700 focus:outline-3 outline-none border-none" type="email" id="team_member_1_email" />
          <span id="team_member_1_email_error" className="text-red-500"></span>
        </div>
        <div className="flex flex-col py-1">
          <label className="text-gray-200 md:text-base xl:text-base capitalize py-1 font-semibold text-sm" htmlFor="team_member_1_register_number">Roll Number</label>
          <input value={input.team_member_1_register_number} name="team_member_1_register_number" onChange={handleInputChange} placeholder="Enter your Roll no number" required pattern="[0-9]{10}" title="Roll number must be 10 digits" className="focus:font-semibold formInputGlass px-4 text-sm rounded-sm text-white bg-slate-200 md:text-base py-2 focus:outline-blue-700 focus:outline-3 outline-none border-none" type="text" id="team_member_1_register_number" />
          <span id="team_member_1_register_number_error" className="text-red-500"></span>
        </div>
        <div className="flex flex-col py-1">
          <label className="text-gray-200 md:text-base xl:text-base capitalize py-1 font-semibold text-sm" htmlFor="transaction_id">Transaction ID</label>
          <input value={input.transaction_id} name="transaction_id" onChange={handleInputChange} placeholder="Enter Transaction ID" required pattern="[0-9]{15}" title="Transaction Id must be 15 digits" className="focus:font-semibold formInputGlass px-4 text-sm rounded-sm text-white bg-slate-200 md:text-base py-2 focus:outline-blue-700 focus:outline-3 outline-none border-none" type="text" id="transaction_id" />
          <span id="transaction_id_error" className="text-red-500"></span>
        </div>
        <div className="flex flex-col py-1">
  <label className="text-gray-200 md:text-base xl:text-base capitalize py-1 font-semibold text-sm" htmlFor="payment_screenshot">Payment Screenshot</label>
  <input name="payment_screenshot" onChange={handleFileSelect} required className="focus:font-semibold formInputGlass px-4 text-sm rounded-sm text-white bg-slate-200 md:text-base py-2 focus:outline-blue-700 focus:outline-3 outline-none border-none" type="file" accept="image/*" id="payment_screenshot" />
  <span id="payment_screenshot_error" className="text-red-500"></span>
  <div id="payment_screenshot_filename" className="text-gray-500"></div>
</div>

      </form>
    </div>
  );
};

export default StepOne