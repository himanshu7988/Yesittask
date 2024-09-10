"use client";

import { useDispatch, useSelector } from "react-redux";
import { increaseNumber, decreaseNumber } from "@/store/actions/globalActions";
import Link from "next/link";

export default function Home() {
  const { count } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-full">
      <div className="text-3xl font-semibold ">
        State management using Redux
      </div>
      <div className="flex justify-center items-center">
        <button
          className="w-10 aspect-square bg-slate-200 text-3xl flex justify-center items-center cursor-pointer border-2 border-slate-300 hover:border-slate-400"
          onClick={() => dispatch(decreaseNumber())}
        >
          -
        </button>
        <span className="min-w-10 aspect-square bg-slate-100 text-3xl flex justify-center items-center border-t-2 border-b-2 border-slate-300">
          {count}
        </span>
        <button
          className="w-10 aspect-square bg-slate-200 text-3xl flex justify-center items-center cursor-pointer border-2 border-slate-300 hover:border-slate-400"
          onClick={() => dispatch(increaseNumber())}
        >
          +
        </button>
      </div>
      <Link href="/add">
        <button className="bg-blue-500 text-white text-md font-semibold px-4 py-2 flex justify-center items-center cursor-pointer border-2 border-slate-300 hover:border-slate-400 hover:bg-blue-600">
          Go to User Form
        </button>
      </Link>
    </div>
  );
}
