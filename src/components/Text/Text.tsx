const Text = (props: any) => {
  const { name, label, onChange, defaultValue } = props;
  let value = "";
  if (defaultValue) value = defaultValue;

  return (
    <div style={{ width: "100%" }}>
      {/* <label htmlFor={name}>{label}</label> */}
      <input
        id={name}
        name={name}
        placeholder={label}
        style={{ width: "100%", margin: "30px 0 0" }}
        onChange={(e) => {
          onChange(e.target.value);
          value = e.target.value;
        }}
        value={value}
      />
    </div>
  );
};

export default Text;
