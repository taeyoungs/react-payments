import { useState } from 'react';

import { Card } from 'components/domain';
import { Button, Input } from 'components/common';

import { useRouter } from 'hooks';
import { useCardDispatch } from 'contexts/CardContextProvider/hooks';

import { PATHS } from 'constants/router';
import { MAX_LENGTH } from 'constants/card';
import type { ICard } from 'types/card';

const TITLE = {
  ADD: '카드등록이 완료되었습니다.',
  UPDATE: '카드별칭을 수정해주세요.',
};

function ConrimCard() {
  const { navigate, locationState: card } = useRouter<ICard>();
  const [alias, setAlias] = useState(card.alias ?? '');
  const dispatch = useCardDispatch();
  const title = card.alias ? TITLE.UPDATE : TITLE.ADD;

  const handleChangeAlias: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setAlias(e.target.value);
  };

  const handleClickNextButton = () => {
    dispatch({ type: 'ADD_OR_UPDATE_CARD', payload: { ...card, alias } });

    navigate(PATHS.HOME, { replace: true });
  };

  return (
    <div className="app flex-column-center">
      <div className="flex-center">
        <h2 className="page-title mb-10">{title}</h2>
      </div>
      <Card {...card} />
      <div className="input-container flex-center w-100">
        <Input
          className="input-underline w-75"
          type="text"
          placeholder="카드 별칭 (선택)"
          value={alias}
          onChange={handleChangeAlias}
          maxLength={MAX_LENGTH.ALIAS}
        />
      </div>
      <div className="button-box mt-50">
        <Button fontSize={18} onClick={handleClickNextButton}>
          확인
        </Button>
      </div>
    </div>
  );
}

export default ConrimCard;
