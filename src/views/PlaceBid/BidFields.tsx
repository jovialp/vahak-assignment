import { useEffect, useState } from "react";
import Checkbox from "../../components/Checkbox/Checkbox";
import Currency from "../../components/Currency/Currency";
import Phone from "../../components/Phone/Phone";
import Text from "../../components/Text/Text";
import { IStepProps } from "./JourneyFields";
import styles from "./styles.module.scss";

const BidFields = (props: IStepProps) => {
  const { formik, data, nextStep, updateBidData } = props;

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
    if (
      amount &&
      amount > 0 &&
      mobileNumber &&
      fullName &&
      Object.entries(formik.errors).length < 1
    ) {
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

            <Checkbox
              name="rateNegotiable"
              label="Rate Negotiable"
              onChange={(val: boolean) => {
                setRateNegotiable(val);
              }}
              defaultValue={rateNegotiable}
            />
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

                      if (val.toString().length < 10) {
                        formik.setErrors({
                          mobileNumber: "Invalid Mobile Number",
                        });
                        formik.handleChange("mobileNumber")(val);
                      } else {
                        formik.setFieldValue("mobileNumber", val);
                        const formikErrors = { ...formik.errors };
                        delete formikErrors.mobileNumber;
                        formik.setErrors(formikErrors);
                      }
                    }}
                    defaultValue={mobileNumber}
                    errorMessage={formik.errors.mobileNumber}
                  />
                  <Text
                    name="fullName"
                    label="Enter your Name"
                    onChange={(val: string) => {
                      setFullName(val);
                      formik.handleChange("fullName")(val);
                      if (mobileNumber?.toString().length === 10) {
                        const formikErrors = { ...formik.errors };
                        delete formikErrors.mobileNumber;
                        formik.setErrors(formikErrors);
                      }
                    }}
                    defaultValue={fullName}
                    required={true}
                    errorMessage={formik.errors.fullName}
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
                <button onClick={verifyOTP} className={styles["nextButton"]}>
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

export default BidFields;
