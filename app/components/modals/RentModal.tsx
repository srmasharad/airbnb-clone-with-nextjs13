"use client";

import { useMemo, useState } from "react";

import useRentModal from "app/hooks/useRentModal";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { categories } from "../header/Categories";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import Counter from "../inputs/Counter";
import CountrySelect from "../inputs/CountrySelect";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
// import Map from "";
import Modal from "./Modal";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const router = useRouter();

  const rentModal = useRentModal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      imageSrc: "",
      category: "",
      roomCount: 1,
      bathroomCount: 1,
      guestCount: 1,
      location: null,
      price: 1,
    },
  });

  const watchCategory = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => setStep((prev) => prev - 1);

  const onNext = () => setStep((prev) => prev + 1);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return onNext();

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Successfully created your listing!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Oops! Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;

    return "Back";
  }, [step]);

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Airbnb Your Home"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={() => {
        rentModal.onClose();
        reset();
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Step 1 - Select Category */}
      {step === STEPS.CATEGORY && (
        <div className="flex flex-col gap-8">
          <Heading
            title="Which of these best describe your place?"
            subtitle="Pick a category"
          />

          <div className="flex flex-row flex-wrap gap-3 overflow-y-auto md:grid-cols-2">
            {categories.map((category) => (
              <div key={category.label} className="col-span-1">
                <CategoryInput
                  label={category.label}
                  icon={category.icon}
                  selected={watchCategory === category.label}
                  onClick={(category) => setCustomValue("category", category)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 - Select Location */}
      {step === STEPS.LOCATION && (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where is your place located?"
            subtitle="Help guests find you!"
          />

          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          />

          <Map center={location?.latlng} />
        </div>
      )}

      {/* Step 3 - Add Info */}
      {step === STEPS.INFO && (
        <div className="flex flex-col gap-8">
          <Heading
            title="Share some basics about your place"
            subtitle="What amenities do you have?"
          />

          <div role="list" className="divide-y divide-slate-200">
            <Counter
              title="Guests"
              subtitle="How many guests do you allow?"
              value={guestCount}
              onChange={(value) => setCustomValue("guestCount", value)}
            />
            <Counter
              title="Rooms"
              subtitle="How many rooms do you have?"
              value={roomCount}
              onChange={(value) => setCustomValue("roomCount", value)}
            />
            <Counter
              title="Bathrooms"
              subtitle="How many bathrooms do you have?"
              value={bathroomCount}
              onChange={(value) => setCustomValue("bathroomCount", value)}
            />
          </div>
        </div>
      )}

      {/* Step 4 - Select Images */}
      {step === STEPS.IMAGES && (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a photo of your place"
            subtitle="Show guests what your place looks like!"
          />

          <ImageUpload
            value={imageSrc}
            onChange={(value) => setCustomValue("imageSrc", value)}
          />
        </div>
      )}

      {/* Step 4 - Write Description */}
      {step === STEPS.DESCRIPTION && (
        <div className="flex flex-col gap-8">
          <Heading
            title="How would you describe your place?"
            subtitle="Short and sweet works best!"
          />

          <div className="flex flex-col gap-5">
            <Input
              id="title"
              label="Title"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="description"
              label="Description"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>
      )}

      {/* Step 5 - Price */}
      {step === STEPS.PRICE && (
        <div className="flex flex-col gap-8">
          <Heading
            title="Lastly, set your price"
            subtitle="How much do you charge per night?"
          />

          <div className="flex flex-col gap-5">
            <Input
              id="price"
              label="Price"
              disabled={isLoading}
              register={register}
              errors={errors}
              formatPrice
              required
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default RentModal;
