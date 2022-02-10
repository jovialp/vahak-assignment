import { useState } from "react";
import Otp from "../../../components/Otp/Otp";
import { IStepProps } from "./StepOne";
import styles from "./styles.module.scss";

interface IStepThreeProps extends IStepProps {
  gotoStep: any;
}

const StepThree = (props: IStepThreeProps) => {
  const { data, nextStep, gotoStep } = props;
  const { mobileNumber } = data;

  const [otp, setOtp] = useState<number>();

  const verifyOtp = () => {
    if (otp === 1234) {
      nextStep();
    }
  };

  return (
    <div className={styles["sectionWrapper"]}>
      <div className={styles["stepContainer"]}>
        <div className={styles["mobileNumberSection"]}>
          <p>
            We've sent an OTP to your mobile number, Please enter it below to
            submit your bid{" "}
            <span className={styles["mobileNumber"]}>
              {mobileNumber}{" "}
              <span
                onClick={(e) => {
                  e.preventDefault();
                  gotoStep(2);
                }}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Edit
              </span>
            </span>
          </p>
        </div>
        <div>
          <div style={{ padding: "0 20px" }}>
            <Otp
              name="otp"
              onChange={(val: number) => {
                setOtp(val);
                if (val === 1234) {
                  nextStep();
                }
              }}
              defaultValue={otp}
            />
          </div>

          <div className={styles["resendOtpLinkWrap"]}>
            <span
              onClick={(e) => {
                e.preventDefault();
              }}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Resend OTP Again
            </span>
          </div>

          <button
            type="button"
            onClick={verifyOtp}
            className={styles["nextButton"]}
          >
            Verify via OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
