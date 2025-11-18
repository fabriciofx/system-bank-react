import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import type { PageResult } from '../core/PageResult';

export type PagesHook<T> = (
  num: number,
  size: number
) => UseQueryResult<PageResult<T>, Error>;

export type CreateHook<T> = (options: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) => UseMutationResult<T, Error, T, unknown>;

export type DeleteHook<T> = (options: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) => UseMutationResult<void, Error, T, unknown>;

export type UpdateHook<T> = (options: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) => UseMutationResult<T, Error, T, unknown>;

export type OperationHook<T> = (options: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) => UseMutationResult<void, Error, T, unknown>;
