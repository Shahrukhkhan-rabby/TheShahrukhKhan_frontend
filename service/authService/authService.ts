'use server';

import axiosInstance from '@/lib/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/users/login', userData);

    if (data.success) {
      cookies().set('accessToken', data?.data?.accessToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get('accessToken')?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      _id: decodedToken.id,
      email: decodedToken.email,
      role: decodedToken.role,
    };
  }

  return decodedToken;
};
