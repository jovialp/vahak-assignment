import { useEffect, useState } from "react";
import { IBidData } from ".";
import Select from "../../components/Select/Select";
import Text from "../../components/Text/Text";
import styles from "./styles.module.scss";

export interface IStepProps {
  formik: any;
  data: IBidData;
  nextStep: any;
  updateBidData: any;
}

const JourneyFields = (props: IStepProps) => {
  const { formik, data, nextStep, updateBidData } = props;

  const {
    source: currentSource,
    destination: currentDestination,
    carType: currentCarType,
    personCount: currentPersonCount,
  } = data;

  const carTypeOptions = ["HatchBack", "Sedan", "SUV"];

  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [carType, setCarType] = useState<string>("");
  const [personCount, setPersonCount] = useState<number>();
  const [personCountErrorMessage, setPersonCountErrorMessage] =
    useState<string>();

  const updateData = () => {
    if (source && destination && carType && !personCountErrorMessage) {
      const submitData = {
        source: source,
        destination: destination,
        carType: carType,
        personCount: personCount,
      };
      updateBidData(submitData);
      nextStep();
    }
  };

  useEffect(() => {
    if (currentSource) {
      setSource(currentSource);
    }
    if (currentDestination) {
      setDestination(currentDestination);
    }
    if (currentCarType) {
      setCarType(currentCarType);
    }
    if (currentPersonCount) {
      setPersonCount(currentPersonCount);
    }
  }, [currentSource, currentDestination, currentCarType, currentPersonCount]);

  return (
    <div className={styles["sectionWrapper"]}>
      <div className={styles["stepContainer"]}>
        <div>
          <div className={styles["fieldGroup"]}>
            <div className={styles["fieldGroup__item"]}>
              <Text
                name="source"
                label="Source Location"
                onChange={(val: string) => {
                  setSource(val);
                  formik.handleChange("source")(val);
                }}
                defaultValue={source}
                required={true}
                errorMessage={formik.errors.source}
              />
            </div>
            <div className={styles["fieldGroup__item"]}>
              <Text
                name="destination"
                label="Destination"
                onChange={(val: string) => {
                  setDestination(val);
                  formik.handleChange("destination")(val);
                }}
                defaultValue={destination}
                required={true}
                errorMessage={formik.errors.destination}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            marginRight: "20px",
          }}
        >
          <Select
            name="carType"
            label="Enter Car Type"
            options={carTypeOptions}
            onChange={(val: string) => {
              setCarType(val);
              formik.handleChange("carType")(val);
            }}
            defaultValue={carTypeOptions.find((el) => el === carType)}
            required={true}
            errorMessage={formik.errors.carType}
          />
          <Text
            name="personCount"
            label="Number of Travelers"
            onChange={(val: number) => {
              if (!isNaN(val)) {
                if (!carType) {
                  setPersonCountErrorMessage("Select Car Type");
                  formik.setErrors({ personCount: "Select Car Type" });
                } else if ((carType !== "SUV" && val > 4) || val > 6) {
                  setPersonCountErrorMessage("Travelers exceeds limit");
                  formik.setErrors({ personCount: "Travelers exceeds limit" });
                } else if (!val) {
                  formik.handleChange("personCount")(val);
                  formik.setErrors({ personCount: "Travelers is Required" });
                  setPersonCountErrorMessage("Travelers is Required");
                } else {
                  formik.handleChange("personCount")(val);
                  setPersonCountErrorMessage("");
                }
              } else if (val) {
                setPersonCountErrorMessage("Invalid input");
                formik.setErrors({ personCount: "Invalid input" });
              }
              setPersonCount(val);
            }}
            defaultValue={personCount}
            errorMessage={personCountErrorMessage || formik.errors.personCount}
          />
        </div>

        <button onClick={updateData} className={styles["nextButton"]}>
          Enter Bid Details
        </button>
      </div>
    </div>
  );
};

export default JourneyFields;
