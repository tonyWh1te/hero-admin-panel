const Spinner = ({ classes = '' }) => {
  return (
    <div
      className={`spinner-border mx-auto ${classes}`}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
