import React from "react";

const GenderSelect = ({ selectGender, onGenderChange }) => {
  return (
    <div className="flex justify-around">
      <div className="form-control">
        <label htmlFor="male" className={`label cursor-pointer`}></label>
        <span className="label-text mr-1">Male</span>
        <input
          type="radio"
          name="gender"
          id="male"
          value={"male"}
          checked={selectGender === "male"}
          onChange={onGenderChange}
          className="radio border-slate-100"
        />
      </div>
      <div className="form-control">
        <label htmlFor="female" className={`label cursor-pointer`}></label>
        <span className="label-text mr-1">Female</span>
        <input
          type="radio"
          name="gender"
          id="female"
          value={"female"}
          checked={selectGender === "female"}
          onChange={onGenderChange}
          className="radio border-slate-100"
        />
      </div>
      <div className="form-control">
        <label
          htmlFor="others"
          className={`label gap-2 cursor-pointer`}
        ></label>
        <span className="label-text mr-1">Others</span>
        <input
          type="radio"
          name="gender"
          id="others"
          value={"others"}
          checked={selectGender === "others"}
          onChange={onGenderChange}
          className="radio border-slate-100"
        />
      </div>
    </div>
  );
};

export default GenderSelect;
