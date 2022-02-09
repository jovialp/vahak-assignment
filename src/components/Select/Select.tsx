const Select = (props: any) => {
  const { name, label, options, onChange } = props;
  return (
    <div>
      {/* <label htmlFor={name}>{label}</label> */}
      <select
        id={name}
        name={name}
        placeholder={label}
        style={{ width: "100%", margin: "30px 0 0" }}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {options.map((option: string) => {
          return <option key={option} value={option} label={option} />;
        })}
      </select>
    </div>
  );
};

export default Select;
