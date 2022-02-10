import { useEffect, useState } from "react";
import styles from "./text.module.scss";

const Text = (props: any) => {
  const { name, label, onChange, defaultValue, required, errorMessage } = props;
  const [value, setValue] = useState("");

  useEffect(() => {
    if (defaultValue || defaultValue === "") {
      setValue(defaultValue || "");
    }
  }, [defaultValue]);

  return (
    <div className={styles["textContainer"]}>
      <div className={styles["textWrap"]}>
        {/* <label htmlFor={name}>{label}</label> */}
        <span className={styles["textLabel"]}>
          {label} {required ? "*" : ""}
        </span>
        <input
          id={name}
          name={name}
          placeholder={label}
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
            else setValue(e.target.value);
          }}
          value={value}
          className={styles["textInput"]}
        />
      </div>
      {errorMessage && (
        <div className={styles["errorMessage"]}>{errorMessage || ""}</div>
      )}
    </div>
  );
};

export default Text;
