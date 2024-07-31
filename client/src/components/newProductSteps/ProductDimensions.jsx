 import React from "react";
 
 // Product Dimensions Section
 const ProductDimensions = ({ onNext, onPrevious, rows, handleChange }) => (
    <div>
      {/* Length */}
      <div>
        <label
          htmlFor="length"
          className="mt-14 block text-sm font-medium text-gray-700"
        >
          Length
        </label>
        <div className="flex items-center mt-1">
          <input
            type="text"
            id="length"
            name="length"
            value={rows.productLength}
            className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange ={handleChange}
            onBlur={handleChange}
            placeholder="Enter item length"
          />
          <select className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="mm">mm</option>
            <option value="ft">ft</option>
          </select>
        </div>
      </div>

      {/* Width */}
      <div>
        <label
          htmlFor="width"
          className="mt-4 block text-sm font-medium text-gray-700"
        >
          Width
        </label>
        <div className="flex items-center mt-1">
          <input
            type="text"
            id="width"
            name="width"
            value={rows.width}
            onChange ={handleChange}
            onBlur={handleChange}
            className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter item width"
          />
          <select className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="mm">mm</option>
            <option value="ft">ft</option>
          </select>
        </div>
      </div>

      {/* Height */}
      <div>
        <label
          htmlFor="height"
          className="mt-4 block text-sm font-medium text-gray-700"
        >
          Height
        </label>
        <div className="flex items-center mt-1">
          <input
            type="text"
            id="height"
            name="height"
            value={rows.height}
            onChange ={handleChange}
            onBlur={handleChange}
            className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter item height"
          />
          <select className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="mm">mm</option>
            <option value="ft">ft</option>
          </select>
        </div>
      </div>

      {/* Would like to incorporate previous options size answers to this 
      so if they choose yes the size answers come up and you can add more sizes*/}
      {/* Multiple Options  */}

      {/* Still Need To Implement this logic*/}
      <div className="mt-6">
        <span className="block text-sm font-medium text-gray-700">
          Does this come in multiple options?
        </span>
        <div className="flex space-x-4 mt-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="multipleSizesNo"
              name="multipleSizes"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="multipleSizesNo"
              className="ml-2 block text-sm text-gray-700"
            >
              No
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="multipleSizesYes"
              name="multipleSizes"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="multipleSizesYes"
              className="ml-2 block text-sm text-gray-700"
            >
              Yes
            </label>
          </div>
        </div>
      </div>

      {/* Next/Previous Buttons */}
      <div className="flex space-x-4 mt-10">
        <button
          onClick={onPrevious}
          className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );

  export default ProductDimensions