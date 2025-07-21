import React, { useState } from 'react';
import { Modal } from '../ui/modal';

function ConfirmReason({ isOpen, closeModal, title, setComment, comment, submitAction }) {

    const handleSubmit = () => {
        submitAction();
        closeModal();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[80%] p-6 lg:p-10 max-h-[90%] relative overflow-hidden"
        >
            <div className="flex flex-col px-2">
                <div className="flex gap-3">
                    {/* <span className="dark:text-gray-200">{title}</span> */}
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Reason for {title}
                    </label>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
                    />
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded  hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            handleSubmit();
                        }}
                        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </Modal>
    );
}
export default ConfirmReason;