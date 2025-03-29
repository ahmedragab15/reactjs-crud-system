interface Iprops {
msg:string
}

const ErrorMessage = ({msg}: Iprops) => {
  return ( msg ? <span className="block text-sm font-semibold text-red-700"> {msg} </span> : null
  );
};

export default ErrorMessage;