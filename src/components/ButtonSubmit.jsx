import React from 'react';

function ButtonSubmit({children}) {
  return (
    <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md duration-200">
      {children}
    </button>
  );
}

export default ButtonSubmit;