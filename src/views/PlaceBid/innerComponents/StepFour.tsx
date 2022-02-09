import Select from "../../../components/Select/Select";
import Text from "../../../components/Text/Text";
import styles from "./styles.module.scss";

const StepFour = (props: any) => {
  const { nextStep } = props;

  return (
    <div className={styles["sectionWrapper"]}>
      <div className={styles["stepContainer"]}>
        <div>
          <div className={styles["fieldGroup"]}>
            <Text name="sourceLocation" label="Source Location" />

            <Text name="destination" label="Destination" />
          </div>

          <button
            type="button"
            onClick={nextStep}
            className={styles["nextButton"]}
          >
            StepFour
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
