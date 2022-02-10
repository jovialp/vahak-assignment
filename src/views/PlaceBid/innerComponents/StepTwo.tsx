import { useEffect, useState } from "react";
import Currency from "../../../components/Currency/Currency";
import Phone from "../../../components/Phone/Phone";
import Text from "../../../components/Text/Text";
import { IStepProps } from "./StepOne";
import styles from "./styles.module.scss";

const StepTwo = (props: IStepProps) => {
  const { data, nextStep, updateBidData } = props;

  const {
    amount: currentAmount,
    rateNegotiable: currentRateNegotiable,
    rateSubmited: currentRateSubmited,
    mobileNumber: currentMobileNumber,
    fullName: currentFullName,
    remarks: currentRemarks,
  } = data;

  const [amount, setAmount] = useState<number>();
  const [rateNegotiable, setRateNegotiable] = useState<boolean>();
  const [rateSubmited, setRateSubmited] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<number>();
  const [fullName, setFullName] = useState<string>();
  const [remarks, setRemarks] = useState<string>();

  const updateData = () => {
    const submitData = {
      amount: amount,
      rateNegotiable: rateNegotiable,
      rateSubmited: true,
      mobileNumber: mobileNumber,
      fullName: fullName,
      remarks: remarks,
    };
    updateBidData(submitData);
  };

  const submitRate = () => {
    if (amount && amount > 0) {
      setRateSubmited(true);
      updateData();
    }
  };

  const verifyOTP = () => {
    if (amount && amount > 0 && mobileNumber && fullName) {
      updateData();
      nextStep();
    }
  };

  useEffect(() => {
    if (currentAmount) {
      setAmount(currentAmount);
    }
    if (currentRateNegotiable) {
      setRateNegotiable(currentRateNegotiable);
    }
    if (currentRateSubmited) {
      setRateSubmited(currentRateSubmited);
    }
    if (currentMobileNumber) {
      setMobileNumber(currentMobileNumber);
    }
    if (currentFullName) {
      setFullName(currentFullName);
    }
    if (currentRemarks) {
      setRemarks(currentRemarks);
    }
  }, [
    currentAmount,
    currentRateNegotiable,
    currentRateSubmited,
    currentMobileNumber,
    currentFullName,
    currentRemarks,
  ]);

  return (
    <div className={styles["sectionWrapper"]}>
      <div className={styles["stepContainer"]}>
        <div>
          <div style={{ padding: "0 20px" }}>
            <Currency
              name="amount"
              label="0"
              onChange={(val: number) => {
                setAmount(val);
              }}
              defaultValue={amount}
            />

            <input
              type={"checkbox"}
              id={"rateNegotiable"}
              name={"rateNegotiable"}
              onChange={(e) => {
                setRateNegotiable(e.target.value === "true");
              }}
              value={rateNegotiable ? "true" : "false"}
            />

            <label> Rate Negotiable</label>
          </div>
          {!rateSubmited ? (
            <div>
              <button
                type="button"
                onClick={submitRate}
                className={styles["nextButton"]}
                disabled={!amount}
              >
                Next
              </button>
            </div>
          ) : (
            <div>
              <div className={styles["breakLine"]}></div>
              <div
                style={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                <div
                  style={{
                    marginRight: "20px",
                  }}
                >
                  <Phone
                    name="mobileNumber"
                    label="Enter your 10 digits Mobile Number"
                    onChange={(val: number) => {
                      setMobileNumber(val);
                    }}
                    defaultValue={mobileNumber}
                  />
                  <Text
                    name="fullName"
                    label="Enter your Name"
                    onChange={(val: string) => {
                      setFullName(val);
                    }}
                    defaultValue={fullName}
                    required={true}
                  />
                  <Text
                    name="remarks"
                    label="Enter Remarks(optional)"
                    onChange={(val: string) => {
                      setRemarks(val);
                    }}
                    defaultValue={remarks}
                  />
                </div>
                <button
                  type="button"
                  onClick={verifyOTP}
                  className={styles["nextButton"]}
                >
                  Verify via OTP
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
