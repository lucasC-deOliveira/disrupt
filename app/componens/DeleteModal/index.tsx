'use client'
import { useTheme } from "@/app/hooks/useTheme";
import React from "react";
import { CiEraser } from "react-icons/ci";
import { FaEraser } from "react-icons/fa";
import { IoIosCloseCircleOutline, IoMdClose, IoMdCloseCircle } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";

interface  ModalProps {
    isOpen:boolean,
    closeModal: () => void,
    message:string
    actionFunction: () => void
}
export  const DeleteModal = ({isOpen,closeModal,message, actionFunction}:ModalProps) => {
 const {theme} = useTheme()
  return (
    <>
      {isOpen ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            style={{color:theme.color}}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-2 bg-black rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none" style={{borderColor:theme.color}}>
                  <button
                    className="absolute top-4 right-4 "
                    onClick={closeModal}
                  >
                    <IoMdClose className="w-8 h-8" style={{fill:theme.color}} />
                  </button>
                <div className="p-5 border-b border-solid rounded-t" style={{borderColor:theme.color}}>
                  <h3 className="text-3xl font-semibold text-center">
                    Remover
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex items-center flex-col">
                <CiEraser  className="w-64 h-64 mx-36" style={{fill:theme.color}}  />
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    {message}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid rounded-b" style={{borderColor:theme.color}}>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => closeModal()}
                  >
                    Não
                  </button>
                  <button
                    className=" text-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => actionFunction()}
                    style={{backgroundColor:theme.color}}
                  >
                    Sim
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}