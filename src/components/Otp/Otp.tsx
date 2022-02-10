import { useEffect, useState } from "react";
import styles from "./otp.module.scss";

const Otp = (props: any) => {
  const { name, label, onChange, defaultValue } = props;
  let [value, setValue] = useState("");
  if (defaultValue) value = defaultValue;

  useEffect(() => {
    if (defaultValue || defaultValue == "") {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className={styles["otpWrap"]}>
      {/* <label htmlFor={name}>{label}</label> */}
      <input
        id={name}
        name={name}
        placeholder={label}
        onChange={(e) => {
          const numberValue = parseInt(e.target.value);
          if (numberValue <= 9999 && numberValue > 0) {
            if (onChange) onChange(numberValue);
            else setValue(`${numberValue}`);
          } else if (isNaN(numberValue)) {
            if (onChange) onChange("");
            else setValue("");
          }
        }}
        value={value}
        className={styles["textOtp"]}
        maxLength={4}
        pattern="\d*"
      />
    </div>
  );
};

export default Otp;
