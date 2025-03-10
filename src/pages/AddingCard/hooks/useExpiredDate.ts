import { useState } from 'react';

import { isNumber, isOutOfRangeMonth } from 'utils';
import { INPUT_NAME } from 'constants/card';
import type { ExpiredDate } from 'types/card';

const INITIAL_STATE: ExpiredDate = {
  month: '',
  year: '',
};

const useExpiredDate = () => {
  const [expiredDate, setExpiredDate] = useState(INITIAL_STATE);

  const handleChangeExpiredDate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.currentTarget;

    if (value !== '' && !isNumber(value)) {
      return;
    }

    if (name === INPUT_NAME.MONTH && isOutOfRangeMonth(value)) {
      return;
    }

    setExpiredDate((prevState) => ({ ...prevState, [name]: value }));
  };

  return { expiredDate, handleChangeExpiredDate };
};

export default useExpiredDate;
