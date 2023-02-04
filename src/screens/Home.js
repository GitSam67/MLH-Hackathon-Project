import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Web3Storage } from "web3.storage";
import "../App.css";
import { ConnectButton } from '@rainbow-me/rainbowkit';




const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFBOUI2ZTI3ZjNGZGNGOTRCZjUxREYyODUwRmEzQTI1RjVjN2I1MjYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU0NDU0MDE1MTAsIm5hbWUiOiJGaWxlU3RvcmFnZSJ9.Db1b5OZR57aNp4Ve3ITarjjBhmTB4st77pl96qnqiyE" });

export default function Home() {



    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState("");
    const [fileType, setFileType] = useState("");

    const email = localStorage.getItem("email");
    const account = localStorage.getItem("account");

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

    const uploadFile = async (e) => {
        e.preventDefault()
        console.log("UPLOADINGGG")
        if (file) {
            try {
                const uploadedFile = await client.put(file, {
                    name: fileName,
                    maxRetries: 3,
                    wrapWithDirectory: false
                })
                console.log(uploadedFile)
            } catch (err) {
                console.log(err)
            }
        } else {
            console.log("NO FILE FOUND!")
        }
    }


    const navigate = useNavigate();
    return (
        <div className="bg-black text-white text-center font-bold text-lg py-5">
            <div>
                <h3>Your account: {account} </h3>
                <h3>Your email: {email} </h3>
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
            <div className="bg-black text-white">
                <div className="flex items-center justify-between flex-row px-4 py-2 ">
                    {/* Logo */}
                    {/* <h1 className="text-2xl font-bold">FileStorage</h1> */}
                </div>
                <ConnectButton />
                <div className="flex flex-col items-center h-screen mt-30">
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
                                    className="cursor-pointer bg-white hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded font-bold dark:bg-gray-700 dark:text-gray-100 dark:border-gray-900 transform transition hover:scale-110"
                                >
                                    {fileName ? fileName : "Choose a file"}
                                </label>
                                <button
                                    type="submit"
                                    className="py-2 px-4 rounded font-bold bg-white text-blue-700 border border-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-900 hover:border-transparent hover:bg-blue-500 hover:text-white transform transition hover:scale-110"
                                >
                                    Upload!
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
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
