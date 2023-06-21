import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import React, { useRef, ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from "@/stores/store";
import { popupAction, setIsLoading, setResult } from "@/stores/toggleSlice";

const Home: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<any>();

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files && event.target.files[0]) {
        const image = event.target.files[0];
        setImage(image);
        console.log("image", image);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const submitFile = async () => {
    // try {
    dispatch(setIsLoading(true));
    dispatch(popupAction());
    const data = new FormData();
    data.append("file", image);
    const res = await axios.post(`/api/analysic_file`, data, {
      timeout: 900000  // Thời gian chờ là 5 giây (5000 millisecond)
    });
    console.log(res);
    if (res.status === 200) {
      const { conclusion } = res.data;
      if (conclusion) {
        dispatch(setResult(conclusion));
      }
    }
    dispatch(setIsLoading(false));
    // } catch (error) {
    //   console.log("error: ", error);
    // }
  };

  return (
    <div className="flex flex-col justify-items-start items-center w-full">
      <div className="flex flex-row my-4">
        <Image
          alt="Flowbite logo"
          height="100"
          src="https://flowbite.com/docs/images/logo.svg"
          width="100"
        />
        <span className="self-center whitespace-nowrap pl-3 text-7xl font-semibold dark:text-white">
          AnalysicAPK
        </span>
      </div>
      <div className="w-[40%] text-center my-4">
        Analyse suspicious files, domains, IPs and URLs to detect malware and
        other breaches, automatically share them with the security community.
      </div>
      <div className="pb-2 w-[50%] border-b mb-4"></div>
      <Image alt="Flowbite logo" height="150" src="/security.png" width="150" />
      <div className="my-4">
        <input type="file" onChange={uploadFile} />
      </div>
      <Button onClick={submitFile} outline gradientDuoTone="greenToBlue">
        Analysic File
      </Button>
    </div>
  );
};

Home.Layout = MainLayout;

export default Home;
