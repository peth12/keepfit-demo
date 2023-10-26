/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { NavbarLandingPage } from "../components/NavbarLogin";
import { Zoom, Slide, Fade } from "react-awesome-reveal";
import { BiSwim, BiCycling } from "react-icons/bi";
import { GiBodyBalance } from "react-icons/gi";
import { GiBoxingGlove } from "react-icons/gi";
import { FaRunning } from "react-icons/fa";

const LandingPage = () => {
  return (
    <>
      <NavbarLandingPage />
      <div className="flex-col ">
        {/* section 1 card ui show */}
        <section className="w-full h-auto bg-gradient-to-r from-red-500 to-amber-500 relative overflow-x-hidden">
          <main className="w-full lg:h-screen md:h-[50vh] h-screen relative bg-zinc-900 overflow-x-hidden pt-[60px] ">
            <Zoom className="h-full">
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className=" w-full md:h-full h-1/2 object-cover"
                alt="HeroImg1"
              />
            </Zoom>

            <div className="md:w-[50%] w-full md:h-full h-1/2 absolute md:top-0 top-1/2 right-0 backdrop-blur-md bg-opacity-30 bg-white flex flex-col md:justify-center justify-start lg:gap-8 md:gap-4 gap-2 lg:px-20 md:px-6 px-4 overflow-x-hidden ">
              <h1 className="lg:text-8xl md:text-4xl text-4xl md:mt-10 mt-10 text-zinc-100 font-extrabold flex italic">
                <Slide direction="right" className=" p-3">
                  <span className="text-[#171717]">
                    Keep<span className="text-primary">Fit</span>
                  </span>
                </Slide>
              </h1>
              <p className="lg:text-lg text-base text-black font-bold my-4 leading-relaxed">
                <Slide direction="left">
                  "The Only Bad Workout is the One That Didn't Happen. Commit to
                  Your Health, Fuel Your Fire, and Conquer Your Limits."
                </Slide>
              </p>
              <div className="flex items-center gap-8">
                <Slide direction="up">
                  <button className="rounded-xl px-10 font-bold text-black  py-2.5 border-2 border-primary hover:bg-gradient-to-r whitespace-nowrap from-red-500 to-amber-500 ">
                    <a href="/Signup">Sign up</a>
                  </button>
                </Slide>
                <div className="flex gap-2">
                  <Slide direction="up">
                    <p className="text-black hidden md:block">
                      Do you have an account?
                    </p>
                    <a
                      href="Login"
                      className="flex items-center gap-2 text-red-500 hover:text-amber-500 group"
                    >
                      Login
                    </a>
                  </Slide>
                </div>
              </div>
            </div>
          </main>
        </section>
        {/* section 2 */}

        <section className="w-full h-auto flex items-center bg-white">
          <main className="w-full md:h-[700px] grid md:grid-cols-2 items-start lg:mx-20 md:mx-10 mx-6 gap-10 md:gap-10 py-12 md:py-0">
            <div className="h-full w-full md:order-1 order-2 flex flex-col justify-start items-start gap-4 pb-8 md:pb-12 pt-[50px]">
              <Fade>
                <div className="flex flex-col mt-10 items-start relative before:absolute before:-bottom-6 before:left-0 before:w-20 before:h-1 before:rounded-lg before:bg-gradient-to-r before:from-amber-500 before:to-red-500 z-10">
                  <h1 className="text-black lg:text-5xl md:text-4xl text-3xl">
                    Change your Future
                  </h1>
                </div>
                <h2 className="text-black mt-10 mb-4 text-lg"></h2>
                <p className="text-black text-justify text-2xl">
                  "Don't Wish for It, Work for It. Your Body is the Canvas, and
                  Your Effort is the Paint."
                </p>
              </Fade>
            </div>

            <div className="w-full md:h-[400px] h-[300px] md:order-2 order-1 ">
              <Fade>
                <img
                  src="https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2232"
                  alt="Welcome Image"
                  className=" w-full h-full pt-[100px]"
                />
              </Fade>
            </div>
          </main>
        </section>
        {/* Section3 */}
        <section className="w-full h-auto flex items-center bg-white ">
          <main className="w-full lg:h-[800px] grid md:grid-cols-2 items-center gap-10 md:gap-0 lg:gap-0 ">
            <div className="w-full md:h-[800px] h-[300px]  hidden md:block">
              <img
                src="https://media.istockphoto.com/id/1225923651/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AB%E0%B8%8D%E0%B8%B4%E0%B8%87%E0%B8%AA%E0%B8%B9%E0%B8%87%E0%B8%A7%E0%B8%B1%E0%B8%A2%E0%B8%A3%E0%B9%88%E0%B8%B2%E0%B9%80%E0%B8%A3%E0%B8%B4%E0%B8%87%E0%B8%AD%E0%B8%AD%E0%B8%81%E0%B8%81%E0%B9%8D%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2%E0%B8%94%E0%B8%B1%E0%B8%A1%E0%B9%80%E0%B8%9A%E0%B8%A5%E0%B8%84%E0%B8%B9%E0%B9%88%E0%B8%AB%E0%B8%99%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%A2%E0%B8%B4%E0%B9%89%E0%B8%A1.jpg?s=612x612&w=0&k=20&c=PFG-Biqx6syxnYjvYPcbx_uViiqjQzWegoUs7d-k55g="
                alt="Offer Image"
                className="w-auto h-auto "
              />
            </div>
            <div className="h-full w-full lg:px-10 px-4 flex flex-col lg:justify-start md:justify-start justify-center items-start md:gap-20 lg:gap-24 gap-16">
              <Fade className="w-full">
                <div className="w-full flex flex-col   items-center relative before:absolute before:-bottom-6 before:left-38 before:w-20 before:h-1 before:rounded-lg before:bg-gradient-to-r before:from-amber-500 before:to-red-500 z-10">
                  <h1 className="text-black lg:text-5xl md:text-4xl text-3xl">
                    Activity
                  </h1>
                </div>
                <ul className="flex flex-col lg:gap-8 gap-6 pb-16">
                  <li className="flex lg:gap-6 gap-4 items-start justify-start">
                    <span>
                      <GiBodyBalance
                        className="fill-primary ml-3  "
                        size={40}
                      />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base text-black font-semibold">
                        Yoga
                      </h3>
                      <p className="text-black text-justify">
                        This activity might be slow-moving, but it's the perfect
                        way to restore your internal balance
                      </p>
                    </div>
                  </li>

                  <li className="flex lg:gap-6 gap-4 items-start justify-start">
                    <span className="text-amber-600 ">
                      <BiSwim className="fill-primary ml-3 " size={40} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base text-black font-semibold">
                        Swimming
                      </h3>
                      <p className="text-black text-justify">
                        Full-body workout with low impact on joints.
                      </p>
                    </div>
                  </li>
                  <li className="flex lg:gap-6 gap-4 items-start justify-start">
                    <span className="text-amber-600 ">
                      <BiCycling className="fill-primary ml-3 " size={40} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base text-black font-semibold">
                        Cycling
                      </h3>
                      <p className="text-black text-justify">
                        Leg strength and cardio on two wheels.
                      </p>
                    </div>
                  </li>
                  <li className="flex lg:gap-6 gap-4 items-start justify-start">
                    <span className="text-amber-600 ">
                      <FaRunning className="fill-primary ml-3 " size={40} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base text-black font-semibold">
                        Running
                      </h3>
                      <p className="text-black text-justify">
                        Cardiovascular exercise for stamina and mental clarity.
                      </p>
                    </div>
                  </li>
                  <li className="flex lg:gap-6 gap-4 items-start justify-start">
                    <span className="text-amber-600 ">
                      <GiBoxingGlove className="fill-primary ml-3 " size={40} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base text-black font-semibold">
                        Boxing
                      </h3>
                      <p className="text-black text-justify">
                        High-intensity combat sport for strength and agility.
                      </p>
                    </div>
                  </li>
                </ul>
              </Fade>
            </div>
          </main>
        </section>

        {/* section4 */}

        <section className="w-full h-auto flex items-center bg-zinc-100">
          <main className="w-full lg:h-[900px] md:h-[800px] flex flex-col justify-start items-center gap-20 lg:gap-28 py-12 md:py-0 mt-3">
            <div className="flex flex-col items-center relative before:absolute before:-bottom-6 before:left-30 before:w-20 before:h-1 before:rounded-lg before:bg-gradient-to-r before:from-amber-500 before:to-red-500">
              <span className="text-black lg:text-5xl md:text-4xl text-3xl mt-10">
                Features
              </span>
            </div>
            <div className="w-full lg:w-3/4 grid md:grid-cols-3 lg:gap-8 md:gap-5 gap-8 px-6 md:px-4 lg:px-0 ">
              <Fade>
                <div className="flex flex-col justify-start bg-zinc-950 border-b-4 border-red-500 h-full">
                  <img className="w-full h-h-56" src="dash.png" />
                  <div className="flex flex-col lg:p-6 md:p-4 p-6 gap-2 group">
                    <span className="text-amber-500 text-xl group-hover:underline font-semibold uppercase">
                      Dashboard
                    </span>

                    <p className="text-zinc-400 text-base">
                      In the dashboard section, the system displays
                      comprehensive usage information, providing users with a
                      detailed overview of their exercise routines, including
                      statistics on their workout history, progress, and
                      performance
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-start bg-zinc-950 border-b-4 border-red-500 h-full">
                  <img className="w-full h-h-56" src="admin.png" />
                  <div className="flex flex-col lg:p-6 md:p-4 p-6 gap-2 group">
                    <span className="text-amber-500 text-xl group-hover:underline font-semibold uppercase">
                      Admin
                    </span>

                    <p className="text-zinc-400 text-base">
                      Our website features user management through the admin
                      system, enabling administrators to adjust user activity
                      levels and access user information for making future
                      adjustments
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-start bg-zinc-950 border-b-4 border-red-500 h-full">
                  <img className="w-full h-h-56" src="history.png" />
                  <div className="flex flex-col lg:p-6 md:p-4 p-6 gap-2 group">
                    <span className="text-amber-500 text-xl group-hover:underline font-semibold uppercase">
                      My Activity
                    </span>

                    <p className="text-zinc-400 text-base">
                      Our platform boasts a comprehensive My Activity page,
                      which serves the purpose of keeping users updated on their
                      exercise activities by displaying a detailed record of the
                      types of exercises performed and the precise times at
                      which they were completed.
                    </p>
                  </div>
                </div>
              </Fade>
            </div>
          </main>
        </section>
      </div>
    </>
  );
};
export default LandingPage