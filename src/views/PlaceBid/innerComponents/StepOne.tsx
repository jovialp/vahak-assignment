import { useEffect, useState } from "react";
import { IBidData } from "..";
import Select from "../../../components/Select/Select";
import Text from "../../../components/Text/Text";
import styles from "./styles.module.scss";

export interface IStepProps {
  data: IBidData;
  nextStep: any;
  updateBidData: any;
}

const StepOne = (props: IStepProps) => {
  const { data, nextStep, updateBidData } = props;

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

  const updateData = () => {
    if (source && destination && carType) {
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
                name="sourceLocation"
                label="Source Location"
                onChange={(val: string) => {
                  setSource(val);
                }}
                defaultValue={source}
                required={true}
              />
            </div>
            <div className={styles["fieldGroup__item"]}>
              <Text
                name="destination"
                label="Destination"
                onChange={(val: string) => {
                  setDestination(val);
                }}
                defaultValue={destination}
                required={true}
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
            }}
            defaultValue={carTypeOptions.find((el) => el === carType)}
            required={true}
          />
          <Text
            name="travellerCount"
            label="Number of Travelers"
            onChange={(val: number) => {
              setPersonCount(val);
            }}
            defaultValue={personCount}
          />
        </div>

        <button
          type="button"
          onClick={updateData}
          className={styles["nextButton"]}
        >
          Enter Bid Details
        </button>
      </div>
    </div>
  );
};

export default StepOne;
