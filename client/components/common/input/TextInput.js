import React from "react";

function TextInput({
  onChangeText,
  value,
  label,
  labelId,
  placeholder,
  inputType = "text",
  name,
}) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="w-full">
        <label
          for={labelId}
          className="form-label inline-block mb-2 text-gray-700"
        >
          {label}
        </label>
        <input
          type={inputType}
          name={name}
          className="
            form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
          "
          id={labelId}
          placeholder={placeholder}
          onChange={onChangeText}
          value={value}
        />
      </div>
    </div>
  );
}

export default TextInput;
