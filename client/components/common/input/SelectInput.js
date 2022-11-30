import React from 'react'

function SelectInput({
  onChangeOption,
  value,
  label,
  labelId,
  options,
  name
}) {
  return (
    <div className="flex items-center gap-2 w-full text-black">
      <div className="w-full">
        <label
          for={labelId}
          className="form-label inline-block mb-2 text-gray-700"
        >
          {label}
        </label>
        <select 
          className="
            form-control block w-full px-3 pl-1 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
          "
          id={labelId}
          onChange={onChangeOption}
          value={value}
          name={name}
        >
          <option selected="selected">No Value</option>
          {options.map((option, index) => {
            return <option key={index} value={option}>{option}</option>
          })}
        </select>
      </div>
    </div>
  );
}

export default SelectInput;