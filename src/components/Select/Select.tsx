import styles from "./select.module.scss";
const Select = (props: any) => {
  const { name, label, options, onChange, defaultValue, required } = props;
  return (
    <div className={styles["textContainer"]}>
      <div className={styles["textWrap"]}>
        {/* <label htmlFor={name}>{label}</label> */}
        <span className={styles["textLabel"]}>
          {label} {required ? "*" : ""}
        </span>
        <select
          id={name}
          name={name}
          placeholder={label}
          style={{ width: "100%", margin: "30px 0 0" }}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          className={styles["textInput"]}
          value={defaultValue}
        >
          <option value={""} label={"Select Car Type"} />
          {options.map((option: string) => {
            return <option key={option} value={option} label={option} />;
          })}
        </select>
      </div>
    </div>
  );
};

export default Select;
