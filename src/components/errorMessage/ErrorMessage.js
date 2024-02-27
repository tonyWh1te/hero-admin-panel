const ErrorMessage = ({ children, classes = '' }) => {
  return <h5 className={`text-center text-danger ${classes}`}>{children}</h5>;
};

export default ErrorMessage;
