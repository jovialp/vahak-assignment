import { useEffect, useState } from "react";
import { IBidData } from "..";
import Select from "../../../components/Select/Select";
import Text from "../../../components/Text/Text";
import styles from "./styles.module.scss";

interface IStepOneProps {
  data: IBidData;
  nextStep: any;
  updateBidData: any;
}

const StepOne = (props: IStepOneProps) => {
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
    const submitData = {
      source: source,
      destination: destination,
      carType: carType,
      personCount: personCount,
    };
    updateBidData(submitData);
    nextStep();
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
            <Text
              name="sourceLocation"
              label="Source Location"
              onChange={(val: string) => {
                setSource(val);
              }}
              defaultValue={source}
            />

            <Text
              name="destination"
              label="Destination"
              onChange={(val: string) => {
                setDestination(val);
              }}
              defaultValue={destination}
            />
          </div>

          <Select
            name="carType"
            label="Enter Car Type"
            options={carTypeOptions}
            onChange={(val: string) => {
              setCarType(val);
            }}
            // defaultValue={source}
          />

          <Text
            name="travellerCount"
            label="Number of Travelers"
            onChange={(val: number) => {
              setPersonCount(val);
            }}
            defaultValue={personCount}
          />

          <button
            type="button"
            onClick={updateData}
            className={styles["nextButton"]}
          >
            Enter Bid Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
