function Button({ type, text, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="col-span-2 border rounded-md mt-4 bg-button-blue text-white font-bold pt-3 pb-3 pl-4 pr-4 hover:bg-sky-700"
    >
      {text}
    </button>
  );
}

export default Button;
