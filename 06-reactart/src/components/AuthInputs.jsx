import { useState } from 'react';
import { styled } from 'styled-components';

// const ControlContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   margin-bottom: 1.5rem;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 0.5rem;
//   font-size: 0.75rem;
//   font-weight: 700;
//   letter-spacing: 0.1em;
//   text-transform: uppercase;
//   color: ${({$invalid}) => $invalid ? '#f87171' : '#6b7280'} ;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem 1rem;
//   line-height: 1.5;
//   background-color:${({$invalid}) => $invalid ? '#fed2d2' : '#d1d5db'}; ;
//   color: ${({$invalid}) => $invalid ? '#ef4444' : '#374151'} ;
//   border: 1px solid ${({$invalid}) => $invalid ? '#f73f3f' : 'transparent'};
//   border-radius: 0.25rem;
//   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
// `;

// const Button = styled.button`
//   padding: 1rem 2rem;
//   font-weight: 600;
//   text-transform: uppercase;
//   border-radius: 0.25rem;
//   color: #1f2937;
//   background-color: #f0b322;
//   border-radius: 6px;
//   border: none;

//   &:hover {
//     background-color: #f0920e;
//   }
// `;

function Label({$invalid, children}) {
  let className = 'block mb-2 text-xs font-bold tracking-wide uppercase';
  if ($invalid) {
    className += ' text-red-400';
  } else {
    className += ' text-stone-200';
  }
  return <label className={className}>{children}</label>
}

function Input({$invalid, ...props}) {
  let className = 'w-full px-3 py-2 leading-tight border rounded shadow';
  if ($invalid) {
    className += ' text-red-500 bg-red-100 border-red-300';
  } else {
    className += ' text-gray-700 bg-stone-300';
  }
  return <input {...props} className={className} />
}

function ControlContainer({children}) {
  return <div className="flex flex-col gap-2 mb-6">{children}</div>
}

function Button({children, ...props}) {
  return <button {...props} className="px-4 py-2 mx-auto font-semibold uppercase rounded text-stone-900 bg-amber-400 hover:bg-amber-500 ">{children}
  </button>
}

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs" className="w-full max-w-sm p-8 rounded shadow-md bg-gradient-to-b from-stone-700 to-stone-800">
      <ControlContainer>
        <p>
          <Label $invalid={emailNotValid}>Email</Label>
          <Input
            type="email"
            $invalid={emailNotValid}
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
        </p>
        <p>
          <Label $invalid={passwordNotValid}>Password</Label>
          <Input
            type="password"
            $invalid={passwordNotValid}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
        </p>
      </ControlContainer>
      <div className="flex justify-end gap-4">
        <button type="button" className="text-amber-400 hover:text-amber-500">
          Create a new account
        </button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>

    </div>
  );
}
