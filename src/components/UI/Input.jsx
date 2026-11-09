function Input({ id, label, ...inputProps }) {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...inputProps} />
    </div>
  );
}

export default Input;
