"use client";

import { useCallback, useState } from "react";

import useLoginModal from "app/hooks/useLoginModal";
import useRegisterModal from "app/hooks/useRegisterModal";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Hurray! Account created.");
        registerModal.onClose();
        loginModal.onOpen();
        reset();
      })
      .catch((error) => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  const toggleLoginModal = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const footerContent = (
    <div className="mt-5 flex flex-col gap-4 border-t-[1px] pt-6">
      <Button
        onClick={() => signIn("google")}
        outline
        label="Continue with Google"
        icon={IconBrandGoogle}
      />
      <Button
        onClick={() => signIn("github")}
        outline
        label="Continue with Github"
        icon={IconBrandGithub}
      />

      <div className="mt-4 text-center text-sm font-medium text-slate-500">
        <div className="flex flex-row items-center justify-center gap-1 text-center">
          <div>Already have an account?</div>
          <div
            className="cursor-pointer text-slate-900 hover:underline"
            onClick={toggleLoginModal}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={() => {
        registerModal.onClose();
        reset();
      }}
      footer={footerContent}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <Heading title="Welcome to Airbnb" subtitle="Create an account!" />

        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          type="password"
          id="password"
          label="Password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    </Modal>
  );
};

export default RegisterModal;
