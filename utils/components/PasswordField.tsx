import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function PasswordField(props: any) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='flex relative flex-col gap-1 h-min'>
      <label htmlFor='password'>Password:</label>
      <div className='relative'>
        <input
          onChange={(e) => props.onChangePasswordField(e)}
          className='h-min rounded-sm border-2 border-black-600'
          type={showPassword ? 'text' : 'password'}
          name='password'
          id='password'
        />
        {showPassword ? (
          <div
            className='absolute w-min right-1 bottom-0 top-0 my-auto cursor-pointer text-base'
            onClick={() => setShowPassword(!showPassword)}
          >
            <Visibility />
          </div>
        ) : (
          <div
            className='absolute w-min right-1 bottom-0 top-0 my-auto cursor-pointer text-base'
            onClick={() => setShowPassword(!showPassword)}
          >
            <VisibilityOff />
          </div>
        )}
      </div>
    </div>
  );
}
