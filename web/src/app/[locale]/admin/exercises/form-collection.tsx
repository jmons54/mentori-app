import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/button';
import { Field } from '@/components/field';

interface ActionListProps {
  data?: string[];
  setData: Dispatch<SetStateAction<string[]>>;
  fieldName: string;
}

export function FormCollection({ data, setData, fieldName }: ActionListProps) {
  return data?.map((value, index) => (
    <div key={index} className={'flex items-center'}>
      <Field
        value={value}
        onChange={(e) => {
          const clone = [...data];
          clone[index] = e.target.value;
          setData(clone);
        }}
        name={fieldName}
        className={'mr-2'}
        required={true}
      />

      <Button
        variant={'default'}
        size={'sm'}
        onClick={() => {
          const clone = [...data];
          const [value] = clone.splice(index, 1, clone[index - 1]);
          clone[index - 1] = value;
          setData(clone);
        }}
        disabled={index === 0}
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v13m0-13 4 4m-4-4-4 4"
          />
        </svg>
      </Button>
      <Button
        variant={'default'}
        size={'sm'}
        onClick={() => {
          const clone = [...data];
          const [value] = clone.splice(index, 1, clone[index + 1]);
          clone[index + 1] = value;
          setData(clone);
        }}
        disabled={index + 1 === data.length}
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19V5m0 14-4-4m4 4 4-4"
          />
        </svg>
      </Button>
      <Button
        variant={'red'}
        onClick={() => {
          const clone = [...data];
          clone.splice(index, 1);
          setData(clone);
        }}
        size={'sm'}
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </div>
  ));
}
