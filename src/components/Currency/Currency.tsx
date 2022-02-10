import { useEffect, useState } from "react";
import styles from "./currency.module.scss";
const Currency = (props: any) => {
  const { name, label, onChange, defaultValue } = props;
  let [value, setValue] = useState("");
  const [width, setWidth] = useState(
    defaultValue && defaultValue.toString().length > 0
      ? `${(defaultValue.toString().length || 1) * 27}px`
      : "27px"
  );
  if (defaultValue) value = defaultValue;

  useEffect(() => {
    if (defaultValue || defaultValue == "") {
      setValue(defaultValue);
      setWidth(`${(defaultValue.toString().length || 1) * 27}px`);
    }
  }, [defaultValue]);

  return (
    <div className={styles["currencyWrap"]}>
      {/* <label htmlFor={name}>{label}</label> */}
      <div>₹</div>
      <input
        id={name}
        name={name}
        placeholder={label}
        min={1}
        max={99999999}
        type={"text"}
        onChange={(e) => {
          const numberValue = parseInt(e.target.value);
          if (numberValue <= 99999999 && numberValue > 0) {
            if (onChange) onChange(numberValue);
            else setValue(`${numberValue}`);
            setWidth(`${(e.target.value.length || 1) * 27}px`);
          } else if (isNaN(numberValue)) {
            if (onChange) onChange("");
            else setValue("");
            setWidth(`27px`);
          }
        }}
        value={value}
        className={styles["textCurrency"]}
        style={{ width: width }}
      />
    </div>
  );
};

export default Currency;
