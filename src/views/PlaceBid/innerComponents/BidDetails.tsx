import { IBidData } from "..";
import styles from "./styles.module.scss";

interface IBidDetailsProps {
  data: IBidData;
  currentStep: number;
  gotoStep: any;
}

const BidDetails = (props: IBidDetailsProps) => {
  const { data, currentStep, gotoStep } = props;
  const { source, destination, carType, personCount } = data;

  return currentStep > 1 ? (
    <div className={styles["sectionWrapper"]}>
      <div className={styles["stepContainer"]}>
        <div className={styles["journeyDetails"]}>
          <div className={styles["journeyDetails__header"]}>
            <h6>Journey Details</h6>
            <div>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  gotoStep(1);
                }}
                style={{ textDecoration: "unset" }}
              >
                Edit
              </a>
            </div>
          </div>

          <div className={styles["journeyDetails__content"]}>
            <p>
              {source} - {destination}
            </p>
            <p>
              {personCount} Persons, {carType}
            </p>
          </div>
        </div>
        <br />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default BidDetails;
