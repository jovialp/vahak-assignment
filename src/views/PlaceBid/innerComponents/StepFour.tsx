import styles from "./styles.module.scss";

const StepFour = (props: any) => {
  const { nextStep } = props;

  return (
    <div className={styles["sectionWrapper"]}>
      <div className={styles["stepContainer"]}>
        <div>
          <button
            type="submit"
            onClick={nextStep}
            className={styles["nextButton"]}
          >
            Submit Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
