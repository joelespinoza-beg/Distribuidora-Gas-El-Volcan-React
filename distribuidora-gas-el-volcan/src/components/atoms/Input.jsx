function Input(props) {
  const tipo = props.tipo || "text";

  return (
    <input
      type={tipo}
      className={`form-control ${props.className || ''}`}
      value={props.valor}
      onChange={props.onChange}
      placeholder={props.placeholder}
      name={props.nombre}
      style={props.style}
    />
  );
}

export default Input;