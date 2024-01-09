import PropTypes from 'prop-types';
import { ModalAddressSetDefault } from './modalAddressSetDefault';
import { useState } from 'react';
import { ModalAddressDelete } from './modalAddressDelete';
import { ModalAddressEdit } from './modalAddressEdit';

export const AddressDataMap = ({ item, fetchUserAddressData }) => {
    console.log("From addressDataMap component", item);

    const [modalDefaultOpen, setModalDefaultOpen] = useState(false)
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
    const [modalEditOpen, setModalEditOpen] = useState(false)

    return (
        <>
            <div key={item?.id} className={`${item.isDefault ? "border border-[#209978] bg-[#f8fdfd]" : "border-gray-300 bg-transparent hover:border-[#71e1c3]"} flex flex-col gap-3 rounded-xl border px-[1.1rem] py-[1rem] md:px-6 md:py-4 shadow-sm`}>
                <div className="flex gap-3 items-center justify-between border-b border-gray-300 pb-2.5">
                    <h4 className={`${item.isDefault ? "text-[#00916D]" : "text-gray-600"} text-[18px] font-semibold`}>
                        {item?.title}
                    </h4>
                    {item.isDefault && (<div className="rounded-lg bg-[#e1f5ef] px-4 py-1.5 text-[14px] font-semibold text-[#3A826E]">Default Address</div>
                    )}
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center rounded-lg bg-[#f1f2f4] px-3.5">
                        <svg
                            width="18"
                            height="17"
                            viewBox="0 0 18 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8.81897 8.53448C7.97498 8.53448 7.14996 8.28422 6.44821 7.81532C5.74647 7.34643 5.19953 6.67998 4.87655 5.90024C4.55357 5.12051 4.46906 4.26251 4.63372 3.43475C4.79837 2.60698 5.20479 1.84663 5.80157 1.24985C6.39835 0.653063 7.1587 0.246648 7.98647 0.0819958C8.81423 -0.0826567 9.67223 0.00184894 10.452 0.324826C11.2317 0.647804 11.8982 1.19475 12.367 1.89649C12.8359 2.59824 13.0862 3.42326 13.0862 4.26724C13.0862 5.39899 12.6366 6.48438 11.8364 7.28464C11.0361 8.0849 9.95071 8.53448 8.81897 8.53448ZM8.81897 1.7069C8.31258 1.7069 7.81756 1.85706 7.39651 2.13839C6.97547 2.41973 6.6473 2.8196 6.45352 3.28744C6.25973 3.75528 6.20903 4.27008 6.30782 4.76674C6.40661 5.2634 6.65046 5.71961 7.00853 6.07768C7.3666 6.43575 7.82281 6.6796 8.31947 6.77839C8.81612 6.87718 9.33092 6.82648 9.79877 6.63269C10.2666 6.43891 10.6665 6.11074 10.9478 5.68969C11.2291 5.26865 11.3793 4.77363 11.3793 4.26724C11.3793 3.5882 11.1096 2.93696 10.6294 2.45681C10.1492 1.97665 9.49801 1.7069 8.81897 1.7069ZM16.7845 16.5C16.559 16.4971 16.3437 16.4062 16.1843 16.2468C16.0248 16.0874 15.934 15.872 15.931 15.6466C15.931 13.4276 14.7248 11.9483 8.81897 11.9483C2.9131 11.9483 1.7069 13.4276 1.7069 15.6466C1.7069 15.8729 1.61698 16.09 1.45693 16.25C1.29687 16.4101 1.0798 16.5 0.853448 16.5C0.6271 16.5 0.410022 16.4101 0.249969 16.25C0.0899165 16.09 0 15.8729 0 15.6466C0 10.2414 6.17897 10.2414 8.81897 10.2414C11.459 10.2414 17.6379 10.2414 17.6379 15.6466C17.635 15.872 17.5441 16.0874 17.3847 16.2468C17.2253 16.4062 17.0099 16.4971 16.7845 16.5Z"
                                fill="#586474"
                            />
                        </svg>
                    </div>
                    <div>
                        <h5 className="font-semibold text-[#41907A]">{item?.customerAddressName}</h5>
                        <span className="text-[15px] font-medium text-[#828997]">
                            {item?.phoneNumber}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="max-w-md text-gray-600">
                        {item?.address}
                    </h5>
                </div>
                <div className="mt-1.5 flex flex-col gap-4 md:gap-0 md:flex-row md:items-center justify-between">
                    <div className="flex gap-2 divide-x-2 divide-gray-200 ">
                        <button onClick={() => setModalEditOpen(!modalEditOpen)} className="text-[14px] font-semibold text-[#209978] hover:underline">
                            Edit
                        </button>
                        <button onClick={() => setModalDeleteOpen(!modalDeleteOpen)} className="pl-2 text-[14px] font-semibold text-[#209978] hover:underline">
                            Delete
                        </button>
                    </div>
                    <button onClick={() => setModalDefaultOpen(!modalDefaultOpen)} className={`${item.isDefault ? "hidden" : "block"} rounded-lg bg-gray-200 px-3.5 py-1.5 text-[14px] font-medium text-[#748295] transition delay-75 ease-in-out hover:bg-[#41907A] hover:text-white`}>
                        Set as Default
                    </button>
                </div>
            </div>
            {/* ----- Modal ----- */}
            <ModalAddressSetDefault modalDefaultOpen={modalDefaultOpen} setModalDefaultOpen={setModalDefaultOpen} item={item} fetchUserAddressData={fetchUserAddressData} />
            <ModalAddressDelete modalDeleteOpen={modalDeleteOpen} setModalDeleteOpen={setModalDeleteOpen} item={item} fetchUserAddressData={fetchUserAddressData} />
            <ModalAddressEdit modalEditOpen={modalEditOpen} setModalEditOpen={setModalEditOpen} item={item} fetchUserAddressData={fetchUserAddressData} />
        </>

    )
}

AddressDataMap.propTypes = {
    fetchUserAddressData: PropTypes.func.isRequired,
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        customerAddressName: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        isDefault: PropTypes.bool.isRequired,
        // 
    }).isRequired,
};