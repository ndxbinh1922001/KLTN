import { useAppDispatch } from "@/stores/store";
import { popupAction } from "@/stores/toggleSlice";
import { useEffect } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:5000";

interface propPopup {
  result: string;
  isLoading: boolean;
}

const Popup = (prop: propPopup) => {
  const dispatch = useAppDispatch();
  const handleCloseToggle = () => {
    dispatch(popupAction());
  };
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("connect", () => {
      console.log("Kết nối với server thành công!");
    });

    socket.on("disconnect", () => {
      console.log("Đã ngắt kết nối với server.");
    });
    socket.on("message", (data) => {
      console.log("message:", data);
    });
    socket.on("response", (data) => {
      console.log("response:", data);
    });
    socket.emit("message", "This is some data");
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className="absolute top-0 z-[999] bg-[rgba(0,0,0,0.5)] h-screen w-screen">
      {prop.isLoading ? (
        <div className="w-1/5 sm:w-1/4 rounded-[16px] h-[180px] left-1/2 fixed top-[40%] translate-x-[-50%] bg-white flex flex-col justify-center items-center">
          {/* Loading */}
          <div className="loader"></div>
          <div className="mt-[15px]">Loading...</div>
        </div>
      ) : (
        <>
          {prop.result === "benign" ? (
            <div className=" w-1/5 sm:w-1/4 rounded-[16px] h-min left-1/2 fixed top-[40%] translate-x-[-50%] bg-white border-[2px] border-[#009A22]">
              <div className="flex flex-col items-center">
                <div className="mt-[17px] ml-[16px] text-[18px] font-normal text-[#181818] text-center mb-2">
                  Benign
                </div>
                <button
                  onClick={handleCloseToggle}
                  className="h-[35px] w-[150px] bg-gradient-to-r from-[#4ACC35] to-[#009A22] rounded-t-xl drop-shadow-xl text-white font-bold"
                >
                  OK
                </button>
              </div>
            </div>
          ) : (
            <div className=" w-1/5 sm:w-1/4 rounded-[16px] h-min left-1/2 fixed top-[40%] translate-x-[-50%] bg-white border-[2px] border-[#b72839]">
              <div className="flex flex-col items-center">
                <div className="mt-[17px] ml-[16px] text-[18px] font-normal text-[#181818] text-center mb-2">
                  Malware
                </div>
                <button
                  onClick={handleCloseToggle}
                  className="h-[35px] w-[150px] bg-gradient-to-r from-[#f45b44] to-[#b72839] rounded-t-xl drop-shadow-xl text-white font-bold"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Popup;
