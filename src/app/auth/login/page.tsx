"use client";

import { auth } from "@/app/firebase";
import { error } from "console";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const Register = () => {
  const router = useRouter();

  const {
    // react側が用意しているプロパティ
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          alert("存在しないユーザーです。");
        } else {
          alert(error.message);
        }
      });
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md w-96"
        >
          <h1 className="mb-4 text-2xl text-gray-700 font-medium font-">
            ログイン
          </h1>
          <div className="mb-4">
            <label className="block text-sm font-medium">メールアドレス</label>
            <input
              // requiredの値がエラーとして表示される
              {...register("email", {
                required: "メールアドレスは必須です",
                // 正規表現
                pattern: {
                  value:
                    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                  message: "正しい形式で入力してください",
                },
              })}
              type="text"
              className="mt-1 border-2 rounded-md w-full p-2"
            />
            {/* emailのバリデーションエラー */}
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">パスワード</label>
            <input
              {...register("password", {
                required: "パスワードは必須です",
                // 文字数制御
                minLength: {
                  value: 6,
                  message: "6文字以上で入力してください。",
                },
              })}
              type="password"
              className="mt-1 border-2 rouded-mt w-full p-2"
            />
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password?.message}
            </span>
          )}
          <div className="justify-end flex pb-3">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-md"
            >
              ログイン
            </button>
          </div>
          <div>
            <span>アカウントをお持ちでない方：</span>
            <Link
              href={"/auth/register"}
              className="text-blue-500 hover:text-blue-800 font-bold"
            >
              新規登録へ
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
