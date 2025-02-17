"use client";
import React from 'react';

export default function TitleBar() {
    const handleClose = () => {
        if (typeof window !== 'undefined' && window.require) {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.send('close-app'); // Envia comando IPC para fechar a janela
        }
    };

    const handleMinimize = () => {
        if (typeof window !== 'undefined' && window.require) {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.send('minimize-app'); // Envia comando IPC para minimizar
        }
    };

    const handleMaximize = () => {
        if (typeof window !== 'undefined' && window.require) {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.send('maximize-app'); // Envia comando IPC para maximizar
        }
    };

    return (
        <div className="  fixed top-0 w-full h-8 bg-gray-950 bg-opacity-90  shadow-lg select-none -webkit-app-region-drag titleBar ">
            <div className='flex items-center px-4 w-full h-full relative'>
                <div className="flex-1 t font-extrabold w-full text-sm text-center text-white" >
                    DISRUPT
                </div>
                <div className="flex space-x-2 absolute right-4">
                    <button
                        className="text-white font-extrabold hover:bg-blue-500 px-3 py-1 rounded"
                        onClick={handleMinimize}
                    >
                        – {/* Símbolo de minimizar */}
                    </button>
                    <button
                        className="text-white font-extrabold hover:bg-green-500 px-3 py-1 rounded"
                        onClick={handleMaximize}
                    >
                        ☐ {/* Símbolo de maximizar */}
                    </button>
                    <button
                        className="text-white font-extrabold hover:bg-red-500 px-3 py-1 rounded"
                        onClick={handleClose}
                    >
                        ✕ {/* Símbolo de fechar */}
                    </button>
                </div>
            </div>
        </div>
    );
}

