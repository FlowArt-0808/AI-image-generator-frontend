"use client";

import Image from "next/image";
import { Header } from "./_features/header";
import { useEverythingContext } from "./_provider/everythingProvider";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export default function Home() {
  const [label, setLabel] = React.useState("personal");
  return (
    <div className=" flex flex-col gap-7 items-center ">
      <Header />

      <div className="flex gap-0 bg-gray-100 rounded-lg p-1">
        <Button
          variant="ghost"
          className="bg-white rounded-md shadow-sm font-semibold text-black hover:bg-white"
        >
          Image analysis
        </Button>
        <Button
          variant="ghost"
          className="text-gray-400 font-normal hover:bg-transparent"
        >
          Ingredient recognition
        </Button>
        <Button
          variant="ghost"
          className="text-gray-400 font-normal hover:bg-transparent"
        >
          Image creator
        </Button>
      </div>
    </div>
  );
}
