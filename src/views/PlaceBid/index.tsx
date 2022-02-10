import React, { useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";

import Step from "../../components/Step/Step";

import JourneyFields from "./JourneyFields";
import BidFields from "./BidFields";
import VerifyOtp from "./VerifyOtp";
import SubmitBid from "./SubmitBid";
import BidDetails from "./PlaceBidDetails";

export interface IBidData {
  source: string;
  destination: string;
  carType: string;
  personCount?: number;
  amount?: number;
  rateNegotiable?: boolean;
  rateSubmited?: boolean;
  mobileNumber?: number;
  fullName: string;
  remarks?: string;
}

const journeyFieldsSchema = Yup.object().shape({
  source: Yup.string().required(`Source Location is Required`),
  destination: Yup.string().required("Destination is Required"),
  carType: Yup.string().required("Car Type is Required"),
  personCount: Yup.string().required("Travelers is Required"),
});

const bidFieldsSchema = Yup.object().shape({
  fullName: Yup.string().required(`Name is Required`),
  mobileNumber: Yup.number().required(`Mobile Number is Required`),
});

const PlaceBid = () => {
  const [message, setMessage] = useState<string>("Place your Bid(1/4 step)");
  const [validationSchema, setSchema] = useState<any>(journeyFieldsSchema);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [bidData, setBidData] = useState<IBidData>({
    source: "",
    destination: "",
    carType: "",
    personCount: undefined,
    fullName: "",
    mobileNumber: undefined,
  });

  const updateBidData = (data: any) => {
    const updatedData = {
      ...bidData,
      source: data.source || bidData.source,
      destination: data.destination || bidData.destination,
      carType: data.carType || bidData.carType,
      personCount: data.personCount || bidData.personCount,
      amount: data.amount || bidData.amount,
      rateNegotiable: data.rateNegotiable || bidData.rateNegotiable,
      rateSubmited: data.rateSubmited || bidData.rateSubmited,
      mobileNumber: data.mobileNumber || bidData.mobileNumber,
      fullName: data.fullName || bidData.fullName,
      remarks: data.remarks || bidData.remarks,
    };
    setBidData(updatedData);
  };

  const increaseStep = (step: number) => {
    setCurrentStep(step + 1);
  };

  const switchStep = (step: number) => {
    switch (step) {
      case 0:
        setSchema(journeyFieldsSchema);
        setMessage("Place your Bid(1/4 step)");
        increaseStep(step);
        break;
      case 1:
        setSchema(bidFieldsSchema);
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

  const renderCurrentSection = (
    formik: FormikProps<IBidData>,
    step: number
  ) => {
    switch (step) {
      case 1:
        return (
          <JourneyFields
            formik={formik}
            data={bidData}
            nextStep={nextStep}
            updateBidData={updateBidData}
          />
        );

      case 2:
        return (
          <BidFields
            formik={formik}
            data={bidData}
            nextStep={nextStep}
            updateBidData={updateBidData}
          />
        );

      case 3:
        return (
          <VerifyOtp
            formik={formik}
            data={bidData}
            nextStep={nextStep}
            updateBidData={updateBidData}
            gotoStep={gotoStep}
          />
        );

      case 4:
        return <SubmitBid nextStep={nextStep} />;

      default:
        return (
          <JourneyFields
            formik={formik}
            data={bidData}
            nextStep={nextStep}
            updateBidData={updateBidData}
          />
        );
    }
  };

  return (
    <Formik
      initialValues={bidData}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(bidData, null, 2));
        actions.setSubmitting(false);
      }}
    >
      {(formik) => (
        <Form>
          <div>
            <Step message={message} />
            <BidDetails
              currentStep={currentStep}
              gotoStep={gotoStep}
              data={bidData}
            />

            {renderCurrentSection(formik, currentStep)}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PlaceBid;
