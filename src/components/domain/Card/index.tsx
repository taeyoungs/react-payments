import { css, cx } from '@emotion/css';

import { Dash } from 'components/common';
import { Masking } from 'components/domain';

import { MAX_LENGTH } from 'constants/card';
import { theme } from 'constants/colors';

import { CardCompany, CardNumber, ExpiredDate } from 'types/card';

export interface CardProps {
  company?: CardCompany;
  cardOwner: string;
  cardNumber: CardNumber;
  expiredDate: ExpiredDate;
}

function Card({ company = CardCompany.Hana, cardOwner, cardNumber, expiredDate }: CardProps) {
  const { num1, num2, num3, num4 } = cardNumber;
  const { year, month } = expiredDate;

  return (
    <div className="card-box">
      <div
        className={cx(
          'small-card',
          css`
            background-color: ${theme[company]};
          `
        )}
      >
        <div className="card-top">
          <span className="card-text">{company}</span>
        </div>
        <div className="card-middle">
          <div className="small-card__chip"></div>
        </div>
        <div className="card-bottom">
          <div className="card-bottom__number">
            <span className="card-number">{num1}</span>
            {num1.length === MAX_LENGTH.CARD_NUMBER && <Dash width={4} height={1} />}
            <span className="card-number">{num2}</span>
            {num2.length === MAX_LENGTH.CARD_NUMBER && <Dash width={4} height={1} />}
            <Masking count={num3.length} />
            {num3.length === MAX_LENGTH.CARD_NUMBER && <Dash width={4} height={1} />}
            <Masking count={num4.length} />
          </div>
          <div className="card-bottom__info">
            <span
              className={cx(
                'card-text',
                css`
                  max-width: 100px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                `
              )}
            >
              {cardOwner}
            </span>
            <span className="card-text">
              {month} / {year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
