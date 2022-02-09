import style from "./step.module.scss";

const Step = (props: any) => {
  const { message } = props;
  return (
    <div className={style["stepWrapper"]}>
      <h3>{message}</h3>
    </div>
  );
};

export default Step;
