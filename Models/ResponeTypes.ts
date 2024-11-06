import { InfiniteData } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export interface IApiPaginatedData<T> {
  count: number;
  pages: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface InfiniteAxiosQueryData<T>
  extends InfiniteData<AxiosResponse<IApiPaginatedData<T>>> {}

export interface DefiniteAxiosQueryData<T> extends AxiosResponse<T> {}

export interface AxiosBackendErrorReturn {
  detail?: string;
  message?: string;
}

export type DecimalString = `${number}`;

export type TQueryHookAPIResponse<T> = AxiosResponse<
  T,
  AxiosBackendErrorReturn
>;
