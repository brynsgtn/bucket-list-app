import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import Header from '../components/Header';
import { useGetBucketlistQuery, useUpdateIsCheckedMutation, useCreateBucketlistMutation, useEditBucketlistMutation, useDeleteBucketlistMutation } from '../slices/bucketlistApiSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const BucketList = () => {
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [check, setCheck] = useState(false);
  const [newBucketlist, setNewBucketList] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [editBucketList, setEditBucketList] = useState('');
  const [editBucketListId, setEditBucketListId] = useState(null);
  const [deletedBucketListId, setDeletedBucketListId] = useState(null);

  const itemsToShow = 8;

  const { data, fetchError, isLoading: isLoadingList, refetch } = useGetBucketlistQuery();
  const [updateIsChecked, { updateIsCheckedError }] = useUpdateIsCheckedMutation();
  const [createBucketlist, { createBucketlistError, isLoading: isCreating }] = useCreateBucketlistMutation();
  const [updateBucketlist, { updateBucketlistError, isLoading: isEditing }] = useEditBucketlistMutation();
  const [deleteBucketlist, { deleteBucketlistError, isLoading: isDeleting }] = useDeleteBucketlistMutation();

  const visibleItems = showMore ? data : data?.slice(0, itemsToShow);


  if (fetchError) {
    toast.error(fetchError?.data?.message || fetchError.error);
  }

  if (updateIsCheckedError) {
    toast.error(updateIsCheckedError?.data?.message || updateIsCheckedError.error);
  }

  if (createBucketlistError) {
    toast.error(createBucketlistError?.data?.message || createBucketlistError.error);
  }

  if (updateBucketlistError) {
    toast.error(updateBucketlistError?.data?.message || updateBucketlistError.error);
  }

  if (deleteBucketlistError) {
    toast.error(deleteBucketlistError?.data?.message || deleteBucketlistError.error);
  }

  useEffect(() => {
    // Initialize the check state with each item's current state
    if (data) {
      const initialCheckState = data.reduce((acc, item) => {
        acc[item._id] = item.isChecked; // Assume data has an `isChecked` field
        return acc;
      }, {});
      setCheck(initialCheckState);
    }
  }, [data]);

  const handleEditBucketListValue = (bucketId) => {
    const selectedItem = data?.find(item => item._id === bucketId);
    if (selectedItem) {
      setEditBucketList(selectedItem.text); // Set the placeholder to the selected item's text
      setEditBucketListId(bucketId);
      setEditMode(true); // Enable edit mode
    }
  };

  const handleDeleteItemId = (bucketId) => {
    const selectedItem = data?.find(item => item._id === bucketId);
    if (selectedItem) {
      setDeletedBucketListId(bucketId);
      setDeleteMode(true)
    }
  };


  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  }



  const handleCheck = async (bucketId) => {
    try {
      const updatedCheck = !check[bucketId];

      const res = await updateIsChecked({
        id: bucketId,
        isChecked: updatedCheck,
      }).unwrap();
      // Update the local check state after the successful mutation
      setCheck(prevCheck => ({
        ...prevCheck,
        [bucketId]: updatedCheck
      }));
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "An error occurred");
    }
  };

  const handleAddBucketlist = async (e) => {
    e.preventDefault();
    try {
      const res = await createBucketlist({ text: newBucketlist }).unwrap();
      toast.success('Bucket list item added successfully!');
      setNewBucketList("");
      setIsOpen(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);

    }

  }

  const handleEditBucketlist = async (e) => {
    e.preventDefault();

    try {
      const res = await updateBucketlist({
        id: editBucketListId, // Pass the ID
        data: { text: editBucketList }, // Pass the edited data
      }).unwrap();
      console.log(editBucketListId, editBucketList)
      toast.success('Goal updated');
      setIsOpen(false);
      setEditMode(false);
      setEditBucketList("")
      setEditBucketListId(null);
      refetch(); // Refresh list
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log('Error:', err);
    }
  };

  const handleDeleteBucketList = async (e) => {
    try {
      await deleteBucketlist({ id: deletedBucketListId }).unwrap();
      toast.success('Bucket list item deleted!');
      setDeleteMode(false);
      refetch();
    } catch (err) {
      console.log(deleteBucketlist)
      toast.error(err?.data?.message || err.error);
    }
  }


  return (
    <>
      <Header />

      {visibleItems?.length === 0 ? (
        <div className='h-screen flex flex-col items-center justify-center'>
          <p className="text-center text-xl text-gray-500 mb-4">You have no item in your bucket list.</p>
          <button className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-6 py-2" onClick={handleIsOpen}>
            Add
          </button>
        </div>

      ) : (
        <div className="p-4 max-w-xl bg-white rounded-lg border shadow-md sm:p-8 mx-auto mt-20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900">
              Your Bucket List
            </h3>
            <button className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-6 py-2" onClick={handleIsOpen}>
              Add
            </button>
          </div>
          <div className="">
            <ul role="list" className="divide-y divide-gray-200">
              {isLoadingList ? (
                <Spinner />
              ) : (
                visibleItems?.map((data) => (
                  <li className="p-5 sm:py-4 group flex justify-between items-center hover:bg-sky-100 rounded-xl" key={data._id}>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          {check[data._id] ? (
                            <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" onClick={() => handleCheck(data._id)} className='cursor-pointer'><path d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" fill="currentColor"></path></svg>
                          ) : (
                            <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" onClick={() => handleCheck(data._id)} className='cursor-pointer'><path fillRule="evenodd" clipRule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"></path></svg>
                          )}
                          <p
                            className={`text-sm font-medium text-gray-900 truncate ${check[data._id] ? 'line-through italic' : ''}`}
                          >
                            {data.text}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Edit & Delete Icons - Appear on Hover */}
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity me-5">
                      <button aria-label="Edit" className='me-2' onClick={() => handleEditBucketListValue(data._id)}>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 1024 1024"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"

                        >
                          <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                        </svg>
                      </button>

                      <button aria-label="Delete" className='me-2' onClick={() => handleDeleteItemId(data._id)}>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 1024 1024"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M832 64H704V40c0-4.4-3.6-8-8-8H328c-4.4 0-8 3.6-8 8v24H192c-35.3 0-64 28.7-64 64v64c0 17.7 14.3 32 32 32v672c0 35.3 28.7 64 64 64h576c35.3 0 64-28.7 64-64V224c17.7 0 32-14.3 32-32V128c0-35.3-28.7-64-64-64zM480 832h-64V320h64v512zm128 0h-64V320h64v512zm128 0h-64V320h64v512z"></path>
                        </svg>
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

        </div>

      )}

      <div className="flex justify-center items-center mx-auto mt-8 mb-10">
        {data?.length > itemsToShow && (
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Container */}
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="Close Modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* ADD Modal Content */}
            <h3 className="text-lg font-semibold text-gray-800">
              Add New Goal in your Bucket List
            </h3>

            {/* Form */}
            <form className="mt-4 space-y-3">
              <div>
                <div className="relative flex items-center">
                  <input
                    name="name"
                    type="text"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter your new goal"
                    value={newBucketlist}
                    onChange={(e) => setNewBucketList(e.target.value)}
                  />
                </div>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-2">
              {isCreating ? (
                <Spinner />
              ) : (
                <>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    onClick={handleAddBucketlist}
                  >
                    Add
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {editMode && (
        <div
          className="fixed inset-0 z-10 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Container */}
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setEditMode(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="Close Modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* EDIT Modal Content */}
            <h3 className="text-lg font-semibold text-gray-800">
              Edit your goal
            </h3>

            {/* Form */}
            <form className="mt-4 space-y-3">
              <div>
                <div className="relative flex items-center">
                  <input
                    name="name"
                    type="text"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                    value={editBucketList}
                    onChange={(e) => setEditBucketList(e.target.value)}
                  />
                </div>
              </div>
            </form>
            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-2">
              {isEditing ? (
                <Spinner />
              ) : (
                <>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    onClick={handleEditBucketlist}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {deleteMode && (
        <div
          className="fixed inset-0 z-10 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Container */}
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setDeleteMode(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="Close Modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* DELETE Modal Content */}
            <h3 className="text-lg font-semibold text-gray-800">
              Are you sure you want to delete this goal?
            </h3>
            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-2">
              {isDeleting ? (
                <Spinner />
              ) : (
                <>
                  <button
                    onClick={() => setDeleteMode(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    onClick={handleDeleteBucketList}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BucketList;