import { useEffect, useState } from "react";
import styles from "./phone.module.scss";
import whatsapp from "../../assets/whatsapp.png";
import Checkbox from "../Checkbox/Checkbox";

const Phone = (props: any) => {
  const { name, label, onChange, defaultValue, required, errorMessage } = props;
  const [value, setValue] = useState<string>("");

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

        <span className={styles["textCode"]}>+91 - </span>
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

        <div className={styles["updateSection"]}>
          <Checkbox name={"getUpdate"} label={"Get Updates on"} />{" "}
          <span>
            <img src={whatsapp} alt="whatsapp" />
            Whatsapp
          </span>
        </div>
      </div>
      {errorMessage && (
        <div className={styles["errorMessage"]}>{errorMessage || ""}</div>
      )}
    </div>
  );
};

export default Phone;
