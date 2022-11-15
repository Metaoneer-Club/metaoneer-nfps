import React from "react";
import { NextPage } from "next";
import { AutoImage } from "~/utils";

const MyPage: NextPage = () => {
  return (
    <div className="min-h-screen grid place-items-center bg-slate-50">
      <div className="font-sans -mt-48 w-full flex justify-center items-center">
        <div className="w-96 mx-auto bg-white shadow-xl hover:shadow">
          <div className="relative w-32 h-32 mx-auto -mt-20 border-8 border-white rounded-full overflow-hidden">
            <AutoImage
              src="/team/Orbit.png"
              alt="profile"
              className="scale-[140%] -mt-3 object-contain"
            />
          </div>
          <div className="text-center mt-2 text-3xl font-bold">Orbit</div>
          <div className="text-center mt-2 font-light text-sm">@orbit__dev</div>
          <div className="text-center font-normal text-lg">Metaoneer</div>
          <div className="px-6 text-center mt-2 font-light text-sm">
            <p>Front-end Developer</p>
          </div>
          <hr className="mt-8" />
          <div className="flex p-4">
            <div className="w-1/2 text-center">
              <span className="font-bold">1.8 k</span> Followers
            </div>
            <div className="w-0 border border-gray-300"></div>
            <div className="w-1/2 text-center">
              <span className="font-bold">2.0 k</span> Following
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
