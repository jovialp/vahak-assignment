import { useEffect, useState } from "react";
import styles from "./checkbox.module.scss";

const Checkbox = (props: any) => {
  const { name, label, onChange, defaultValue, errorMessage } = props;
  const [value, setValue] = useState("");

  useEffect(() => {
    if (`${defaultValue}` || defaultValue === "") {
      setValue((`${defaultValue}` === "true" && "true") || "false");
    }
  }, [defaultValue]);

  return (
    <div className={styles["checkboxContainer"]}>
      <input
        type={"checkbox"}
        id={name}
        name={name}
        placeholder={label}
        onChange={(e) => {
          if (onChange) onChange(e.target.value === "true" ? false : true);
          else setValue(e.target.value === "true" ? "false" : "true");
        }}
        value={value}
        checked={value === "true" ? true : false}
      />
      <label> {label}</label>
      {errorMessage && (
        <div className={styles["errorMessage"]}>{errorMessage || ""}</div>
      )}
    </div>
  );
};

export default Checkbox;
