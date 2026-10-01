function Boton(props) {
  const variante = props.variante || "primary";
  const type = props.type || props.tipo || "button";

  return (
    <button
      type={type}
      className={`btn btn-${variante} ${props.className || ''}`.trim()}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
    >
      {props.texto}
    </button>
  );
}

export default Boton;