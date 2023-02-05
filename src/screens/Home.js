import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Web3Storage } from "web3.storage";
import "../App.css";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContract, useSigner } from "wagmi";

import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract';




const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGJBZkE4MmY0NTUxM0FhRjczMzk1YzNGOTJBYjQ2MDAyMDZEMzRGMEIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU1NDgzNjYzMzAsIm5hbWUiOiJmaWxlc3RvcmFnZSJ9.nD02U685ohgqHfYDipRHpkdjNZNXe_tvUX1zX4Uud7Q" });

export default function Home() {



    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState("");
    const [fileType, setFileType] = useState("");
    const { CONTRACT_ADDRESS } = useAccount();
    const { data: signer } = useSigner();
    const contract = useContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        signerOrProvider: signer,
    });

    console.log("CONTRACT ", contract);


    const email = localStorage.getItem("email");
    const account = localStorage.getItem("account");

    const getFilesUploaded = async () => {
        try {
            const fileCount = await contract.fileCount()
            console.log(fileCount?.toString())
        } catch (err) {
            console.log(err)
        }
    }

    const captureFile = async (e) => {
        try {
            setFile(e.target.files)
            setFileName(e.target.files[0].name);
            setFileSize(e.target.files[0].size);
            setFileType(e.target.files[0].type);
            console.log(e.target.files)
            console.log(e.target.files[0].name);
            console.log(e.target.files[0].size);
            console.log(e.target.files[0].type);




        }
        catch (err) {
            console.log(err);
        }
    };

    
    const uploadFile = async(e) => {
        e.preventDefault()
        console.log("UPLOADINGGG")
        if(file) {
            try {
                const uploadedFile = await client.put(file, {
                    name: fileName,
                    maxRetries: 3,
                    wrapWithDirectory: false
                })
                console.log(uploadedFile)
    
                const uploadTxn = await contract.uploadFile(uploadedFile?.toString(), fileSize?.toString(), fileType?.toString(), fileName?.toString())
                await uploadTxn.wait()
                console.log(uploadTxn)
    
            } catch(err) {
                console.log(err)
            }
        } else {
            console.log("NO FILE FOUND!")
        }
    }
    
    return (
        <>
            <header id="navbar" className="bg-black border-2 border-violet-400 shadow-md w-full top-0 left-0">
                <nav className="container md:flex items-center  py-4 md:px-10 px-2">
                    <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-left mr-5'>
                        <a className="title-font font-bold text-2xl flex flex-row items-center" href="#starter">
                            <img className="mainlogo h-16 w-29 rounded-xl border-2 border-purple-900" alt="logo" />
                        </a>
                    </div>
                    <div>
                        <h2 className="text-violet-500 title-font font-bold text-4xl font-serif">Block Web - <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 title-font text-3xl md:tracking-wider md:text-3xl my-6 md:mb-4 font-black">Decentralizing future of Storage</span></h2>
                    </div>
                    <div className="ml-50">
                    </div>
                </nav>
            </header>
            <div className="block text-white text-center font-bold text-lg py-10">
                <ConnectButton className="relative top-1 left-50" />
                <div>
                    <div className="w-3/5 mx-auto border-2 border-violet-500 bg-violet-300 text-black rounded-lg py-5 my-10">
                        <h3><span className="font-black">Your account id:</span> {account} </h3>
                        <h3><span className="font-black">Your email:</span> {email} </h3>
                    </div>
                    <button className="float-right absolute top-2 right-2"
                        style={button}
                        onClick={() => {
                            localStorage.removeItem("email");
                            localStorage.removeItem("account");
                            window.location.href = '/';

                        }}
                    >
                        {" "}
                        Log out
                    </button>
                </div>
                <br className="hidden"></br>
                <div className="text-white">
                    <div className="flex items-center justify-between flex-row px-4 py-2 ">
                        {/* Logo */}
                        {/* <h1 className="text-2xl font-bold">FileStorage</h1> */}
                    </div>
                    <div className="flex flex-col items-center mt-30">
                        <div className="flex justify-center">
                            <h1 className="text-4xl font-extrabold">Upload files</h1>
                        </div>
                        <div className="mb-8 mt-6">
                            <form
                                onSubmit={(e) => uploadFile(e)}
                                className="px-4"
                            >
                                <div className="mt-4 flex justify-between mx-4" class="flex justify-center">
                                    <input
                                        className="hidden"
                                        type="file"
                                        id="filecap"
                                        onChange={(e) => captureFile(e)}
                                    />
                                    <label
                                        htmlFor="filecap"
                                        className="cursor-pointer bg-white hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded font-bold dark:bg-gray-700 dark:text-gray-100 dark:border-gray-900 transform transition hover:scale-70"
                                    >
                                        {fileName ? fileName : "Choose a file"}
                                    </label>
                                    <button
                                        type="submit"
                                        className="py-2 px-4 rounded font-bold bg-white text-blue-700 border border-blue-500 hover:bg-green-500 dark:bg-green-400 dark:text-black dark:border-gray-900 hover:border-transparent hover:bg-blue-500 hover:text-white transform transition hover:scale-70"
                                        onClick={() => alert("Thank you for uploading..!!")}
                                    >
                                        Upload!
                                    </button>
                                </div>
                            </form>
                            <button
                                className="my-4 py-2 px-4 rounded font-bold bg-white text-blue-700 border border-blue-500 dark:bg-blue-400 dark:text-black dark:border-gray-900 hover:border-transparent hover:bg-blue-500 hover:text-white transform transition hover:scale-110"
                                onClick={getFilesUploaded}
                            >
                                Get Files
                            </button>

                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 my-5 px-2">
                    <div className="text-xl font-lg border-2 border-violet-400 bg-violet-400 text-white py-10 px-2 rounded-lg mx-1">1. Choose any file you want to store from your device..</div>
                    <div className="text-xl font-lg border-2 border-violet-400 bg-violet-400 text-white py-10 px-2 rounded-lg mx-1">2. Now, Click on Upload File button to upload it on our decentralized ipfs system..</div>
                    <div className="text-xl font-lg border-2 border-violet-400 bg-violet-400 text-white py-10 px-2 rounded-lg mx-1">3. Woolah, you are good to go now..!! Now your file is safe & secure with us, stay back and relax..!!</div>
                </div>
            </div>
        </>
    );
}
const button = {
    width: 100,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    cursor: "pointer",
    fontSize: 17,
    color: "white",
    backgroundColor: "#9D27CD",
    border: "none",
};
