import { useState } from "react";
import styles from "./text.module.scss";

const Text = (props: any) => {
  const { name, label, onChange, defaultValue, required } = props;
  let [value, setValue] = useState("");
  if (defaultValue) value = defaultValue;

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
    </div>
  );
};

export default Text;
