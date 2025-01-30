import { apiSlice } from './apiSlice';
const BUCKETLIST_URL = '/api/bucketlist';

export const bucketlistApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBucketlist: builder.query({
            query: () => ({
                url: `${BUCKETLIST_URL}`,
                method: 'GET',
            }),
        }),
        updateIsChecked: builder.mutation({
            query: (data) => ({
                url: `${BUCKETLIST_URL}/${data.id}/toggle`,
                method: 'PUT',
                body: data
            }),
        }),
        createBucketlist: builder.mutation({
            query: (data) => ({
                url: `${BUCKETLIST_URL}`,
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const { useGetBucketlistQuery, useUpdateIsCheckedMutation, useCreateBucketlistMutation } = bucketlistApiSlice;