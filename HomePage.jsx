import { useState } from 'react';
import { MdOutlineDelete } from "react-icons/md";
import axios from 'axios';
export const HomePage = () => {
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState();
    const [currentDocument, setCurrentDocument] = useState('passport');
    const [openModal, setOpenModal] = useState(false);

    const handleRemoveImage = () => {
        setFile();
        setLoading(false);
        setResult();
    }
    function handleChange(e) {
        console.log(e.target.files);
        setFile(e.target.files[0]);
    }

    const handleSubmit = async () => {
        if (!file) {
            alert("please upload file!!");
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', file);
            if (currentDocument === 'passport') {
                await axios.post(`http://127.0.0.1:5000/upload/passport`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
                    .then((res) => {
                        console.log(res);
                        setLoading(false);
                        setResult(res?.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            else {
                await axios.post(`http://127.0.0.1:5000/upload/driving_license`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
                    .then((res) => {
                        setLoading(false);
                        console.log(res);
                        setResult(res?.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
    }


    return (
        <>
            <div className='bg-amber-200 h-screen w-full p-4'>
                <h1 className='text-center font-bold text-3xl'>OCR Text Scanner</h1>
                <div className=' w-full p-5 mt-5' >
                    <div className='flex flex-col w-full '>
                        <div className='flex flex-col w-full'>
                            <div className='flex flex-row justify-between'>
                                <div onClick={() => { setCurrentDocument('driving_license') }} className="flex items-center ps-4 border border-black border-2 mr-5 w-1/2 text-center rounded ">
                                    <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 " required />
                                    <label for="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900">Driving license</label>
                                </div>
                                <div onClick={() => { setCurrentDocument('passport') }} className="flex items-center ps-4 border border-black border-2 w-1/2 text-center rounded ">
                                    <input checked id="bordered-radio-2" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 " required />
                                    <label for="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900">Passport</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full">
                            <div className="flex items-center justify-center w-full">
                                {
                                    file ?
                                        <>
                                            <div className="flex flex-col items-center justify-center">
                                                <div className='flex flex-row items-center justify-between'>
                                                    <div>
                                                        <img src={URL.createObjectURL(file)} className="w-full h-64  text-gray-500 " />
                                                    </div>
                                                    <div className='cursor-pointer' onClick={handleRemoveImage}>
                                                        <MdOutlineDelete className='w-10 h-10 text-red-600 ml-10 font-bold' />
                                                        <p className='text-red-600 text-md ml-4 font-bold'>Remove image</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500">JPEG, PNG, JPG or WEBP</p>
                                            </div>
                                            <input id="dropzone-file" type="file" accept="image/*" onChange={handleChange} className="hidden" required />
                                        </label>
                                }
                            </div>
                        </div>
                        <div className='flex flex-col  w-full'>
                            <div className='flex flex-row w-full items-center justify-center'>
                                <div className='flex items-center mt-5'>
                                    {
                                        result ?
                                            <>
                                                <div className='flex flex-row justify-between'>
                                                    <div>
                                                        <button type="button" onClick={() => { setOpenModal(true) }} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  shadow-lg shadow-cyan-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">View Details</button>
                                                    </div>
                                                    <div>
                                                        <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300  shadow-lg shadow-red-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleRemoveImage}>Parse another Image</button>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <button type="button" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  inline-flex items-center">
                                                {
                                                    loading ?
                                                        <>
                                                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                            </svg>
                                                            Loading...
                                                        </>
                                                        :
                                                        <>
                                                            Submit
                                                        </>
                                                }
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div id="small-modal" tabIndex="-1" className={` ${openModal ? 'flex' : 'hidden'} fixed top-0 left-0 right-0 bottom-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto`}>
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative bg-white rounded-lg shadow  max-w-md w-full border-2 border-black ">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-xl font-medium text-gray-900 ">
                                Parsed data
                            </h3>
                            <button onClick={() => { setOpenModal(false) }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="small-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4 bg-lime-200">
                            {currentDocument === 'passport' ? (
                                <>
                                    <h2 className='text-md font-bold'>Name: {result?.name}</h2>
                                    <br className='mt-5' />
                                    <h2 className='text-md font-bold'>Passport Number: {result?.passport_number}</h2>
                                    <br className='mt-5' />
                                    <h2 className='text-md font-bold'>Expiration date: {result?.date_of_expiry}</h2>
                                </>
                            ) : (
                                <>
                                    <h2 className='text-md font-bold'>Name: {result?.name}</h2>
                                    <br className='mt-5' />
                                    <h2 className='text-md font-bold'>Driving License Number: {result?.driving_license_number}</h2>
                                    <br className='mt-5' />
                                    <h2 className='text-md font-bold'>Expiration date: {result?.expiration_date}</h2>
                                </>
                            )}
                        </div>
                        <div className="flex justify-center items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                            <button type="button" onClick={() => { setOpenModal(false) }} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

