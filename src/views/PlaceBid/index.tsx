import React, { useState } from "react";
import { Form, Formik } from "formik";
import Step from "../../components/Step/Step";
import StepOne from "./innerComponents/StepOne";
import StepTwo from "./innerComponents/StepTwo";
import StepThree from "./innerComponents/StepThree";
import StepFour from "./innerComponents/StepFour";
import BidDetails from "./innerComponents/BidDetails";

export interface IBidData {
  source: string;
  destination: string;
  carType: string;
  personCount?: number;
}

const PlaceBid = () => {
  const [message, setMessage] = useState<string>("Place your Bid(1/4 step)");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [bidData, setBidData] = useState<IBidData>({
    source: "",
    destination: "",
    carType: "",
    personCount: 0,
  });

  const updateBidData = (data: any) => {
    console.log("data-->", data);
    const updatedData = {
      ...bidData,
      source: data.source || bidData.source,
      destination: data.destination || bidData.destination,
      carType: data.carType || bidData.carType,
      personCount: data.personCount || bidData.personCount,
    };
    setBidData(updatedData);
  };

  const increaseStep = (step: number) => {
    setCurrentStep(step + 1);
  };

  const switchStep = (step: number) => {
    switch (step) {
      case 0:
        setMessage("Place your Bid(1/4 step)");
        increaseStep(step);
        break;
      case 1:
        setMessage("Place your Bid(2/4 step)");
        increaseStep(step);
        break;

      case 2:
        setMessage("Verify OTP(3/4 step)");
        increaseStep(step);
        break;

      case 3:
        setMessage("Summary & Submit Bid(4/4 step)");
        increaseStep(step);
        break;
    }
  };

  const nextStep = () => {
    switchStep(currentStep);
  };

  const gotoStep = (step: number) => {
    switchStep(step - 1);
  };

  const renderCurrentSection = (step: number) => {
    switch (step) {
      case 1:
        return (
          <StepOne
            data={bidData}
            nextStep={nextStep}
            updateBidData={updateBidData}
          />
        );

      case 2:
        return <StepTwo nextStep={nextStep} />;

      case 3:
        return <StepThree nextStep={nextStep} />;

      case 4:
        return <StepFour nextStep={nextStep} />;

      default:
        return (
          <StepOne
            data={bidData}
            nextStep={nextStep}
            updateBidData={updateBidData}
          />
        );
    }
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      <Form>
        <div>
          <Step message={message} />
          <BidDetails
            currentStep={currentStep}
            gotoStep={gotoStep}
            data={bidData}
          />

          {renderCurrentSection(currentStep)}
        </div>
      </Form>
    </Formik>
  );
};

export default PlaceBid;
