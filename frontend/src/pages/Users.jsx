import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useGetAllUsersQuery, useDeleteUserMutation } from '../slices/userApiSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const Users = () => {
  const { data, fetchError, isLoading: isLoadingList, refetch } = useGetAllUsersQuery();
  const [deleteUser, { deleteBucketlistError, isLoading: isDeleting }] = useDeleteUserMutation();
  const [showMore, setShowMore] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deletedUserId, setDeletedUserId] = useState(null);



  if (fetchError) {
    toast.error(fetchError?.data?.message || fetchError.error);
  }
  if (deleteBucketlistError) {
    toast.error(deleteBucketlistError?.data?.message || deleteBucketlistError.error);
  }

  const usersToShow = 5;
  const visibleUsers = showMore ? data : data?.slice(0, usersToShow);

const handleDeleteUserId = (userId) => {
  const selectedItem = data?.find(item => item._id === userId);
  if (selectedItem) {
    setDeletedUserId(userId);
    setDeleteMode(true)
    console.log(userId)
  }
}

  const handleDeleteBucketList = async (e) => {
    try {
       await deleteUser({ id: deletedUserId }).unwrap();
       toast.success('User deleted!');
       setDeleteMode(false);
       refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <>
      <Header />
      <div className='h-screen flex justify-center'>
        <div className='w-full max-w-96 mt-20'>
          {isLoadingList ? (
            <Spinner />
          ) : (
            <>
              {visibleUsers?.length === 0 ? (
                <p className="text-center text-xl text-gray-500">No users available.</p>
              ) : (
                <>
                  <h1 className='text-center text-2xl font-bold'>List of Users</h1>
                  <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 mt-5">
                    {visibleUsers.map((user, index) => (
                      <li
                        key={user._id}
                        className={`group py-3 sm:py-4 ${index === 0 ? "pb-3 sm:pb-4" : ""}`}
                      >
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <div className="shrink-0">
                            <img
                              className="w-8 h-8 rounded-full"
                              src="https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              alt={user.name}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-lg font-bold text-gray-900 truncate">{user.name}</p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</p>
                          </div>
                          <button
                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                            onClick={() => handleDeleteUserId(user._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-center items-center mx-auto mt-8 mb-10">
                    {data?.length > usersToShow && (
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>


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
  );
};

export default Users;
