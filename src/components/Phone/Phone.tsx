import { useState } from "react";
import styles from "./phone.module.scss";

const Phone = (props: any) => {
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

        {value && <span className={styles["textCode"]}>+91 - </span>}
        <input
          id={name}
          name={name}
          placeholder={label}
          onChange={(e) => {
            const numberValue = parseInt(e.target.value);
            if (numberValue <= 9999999999 && numberValue > 0) {
              if (onChange) onChange(numberValue);
              else setValue(`${numberValue}`);
            } else if (isNaN(numberValue)) {
              if (onChange) onChange("");
              else setValue("");
            }
          }}
          value={value}
          className={styles["textInput"]}
        />
      </div>
    </div>
  );
};

export default Phone;
