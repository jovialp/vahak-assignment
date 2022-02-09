import Text from "../../../components/Text/Text";
import styles from "./styles.module.scss";

const StepTwo = (props: any) => {
  const { nextStep } = props;

  return (
    <div className={styles["sectionWrapper"]}>
      <div className={styles["stepContainer"]}>
        <div>
          <Text name="amount" label="0" />₹
          <button
            type="button"
            // onClick={setAmount}
            className={styles["nextButton"]}
          >
            Next
          </button>
          <Text name="fullName" label="Enter your Name" />
          <Text name="remarks" label="Enter Remarks(optional)" />
          <button
            type="button"
            onClick={nextStep}
            className={styles["nextButton"]}
          >
            Verify via OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
