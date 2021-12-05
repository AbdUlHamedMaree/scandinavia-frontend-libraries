# @scandinavia/react-query

`@scandinavia/react-query` is a library that wrap [react-query](https://www.npmjs.com/package/react-query), by adding more flexible and functionality.

## Usage

implement it in your libs folder:

```ts
// libs/react-query

import axios from 'axios';
import { createReactQueryHelpers } from './index';
import { QueryClient } from 'react-query';

export const { createMutation, createQuery } = createReactQueryHelpers({
  // your axios instance with your global config.
  axiosInstance: axios.create(),

  // global function to handle error being thrown.
  handleError: err => {
    //
    throw err;
  },

  // global function to handle toast error.
  toast: err => alert(err.message),

  // global function to handle log error.
  log: err => console.error(err),
});

export const queryClient = new QueryClient();
```

now you can use it in your services:

```ts
// services/books

import { createQuery, createMutation, queryClient } from '../libs';
import { BookModel, CreateBookDto, UpdateBookDto } from '../models';
import { ResponseWithPagination } from '../types';

const URL = 'books';
const invalidateData = async () => {
  await queryClient.cancelQueries([URL, 'get']);
  await queryClient.invalidateQueries([URL, 'get']);
};

export const useGetBooks = (pagination: unknown) =>
  createQuery<ResponseWithPagination<BookModel>>(
    [URL, 'get', pagination],
    {
      method: 'get',
      url: URL,
      params: { pagination },
    },
    { keepPreviousData: true }
  );

export const useGetBook = (id?: unknown) =>
  createQuery<BookModel>(
    [URL, 'get', id],
    {
      method: 'get',
      url: `${URL}/${id}`,
    },
    { enabled: typeof id !== 'undefined' }
  );

export const useCreateBook = createMutation<BookModel, CreateBookDto>(
  [URL, 'post'],
  {
    method: 'post',
    url: URL,
  },
  {
    onMutate: invalidateData,
  }
);

export const useUpdateBook = (id?: unknown) =>
  createMutation<BookModel, UpdateBookDto>(
    [URL, 'put', id],
    {
      method: 'put',
      url: typeof id !== 'undefined' ? `${URL}/${id}` : URL,
    },
    {
      onMutate: invalidateData,
    }
  );

export const useDeleteBook = (id?: unknown) =>
  createMutation<BookModel>(
    [URL, 'delete', id],
    {
      method: 'delete',
      url: typeof id !== 'undefined' ? `${URL}/${id}` : URL,
    },
    {
      onMutate: invalidateData,
    }
  );
```

then you can use it in your component.
