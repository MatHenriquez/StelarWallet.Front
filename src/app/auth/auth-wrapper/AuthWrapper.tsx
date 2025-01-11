'use client';
import useAuth from '@/app/hooks/use-auth';
import React, { ReactNode } from 'react';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  useAuth();

  return <>{children}</>;
};

export default AuthWrapper;
