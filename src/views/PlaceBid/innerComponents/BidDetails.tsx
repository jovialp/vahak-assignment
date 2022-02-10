import { IBidData } from "..";
import styles from "./styles.module.scss";

interface IBidDetailsProps {
  data: IBidData;
  currentStep: number;
  gotoStep: any;
}

const BidDetails = (props: IBidDetailsProps) => {
  const { data, currentStep, gotoStep } = props;
  const {
    source,
    destination,
    carType,
    personCount,
    amount,
    fullName,
    mobileNumber,
    remarks,
  } = data;

  return currentStep > 1 ? (
    <div className={styles["sectionWrapper"]}>
      <div className={styles["stepContainer"]}>
        <div className={styles["bidDetails"]}>
          <div className={styles["bidDetails__header"]}>
            <h6>Journey Details</h6>
            <div>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  gotoStep(1);
                }}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Edit
              </span>
            </div>
          </div>

          <div className={styles["bidDetails__content"]}>
            <p>
              {source} - {destination}
            </p>
            <p>
              {personCount} Persons, {carType}
            </p>
          </div>
        </div>

        {currentStep > 2 && (
          <div className={styles["bidDetails"]}>
            <div className={styles["bidDetails__header"]}>
              <h6>BID Details</h6>
            </div>
            <div className={styles["bidDetails__wrap"]}>
              <div>
                <p>+91-{mobileNumber}</p>
                <p>{fullName}</p>
                <p>{remarks}</p>
              </div>
              <div className={styles["bidDetails__amountSection"]}>
                <p className={styles["bidDetails__amount"]}>₹{amount}</p>
                <h6 className={styles["bidDetails__amountType"]}>
                  Fixed Price
                </h6>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default BidDetails;
