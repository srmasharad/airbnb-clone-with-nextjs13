"use client";

import { useCallback, useState } from "react";

import useLoginModal from "app/hooks/useLoginModal";
import useRegisterModal from "app/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in successfully.");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggleRegisterModal = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
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
          <div>Don&apos;t have an account?</div>
          <div
            className="cursor-pointer text-slate-900 hover:underline"
            onClick={toggleRegisterModal}
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={() => {
        loginModal.onClose();
        reset();
      }}
      footer={footerContent}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <Heading title="Welcome Back!" subtitle="Login to your account" />

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

export default LoginModal;
