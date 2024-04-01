import { useEffect, useState } from 'react';
import { DataType } from '@/types/types';
import css from './BalloonContent.module.scss';

export type BalloonContentProps = {
  data: DataType;
  onClose: () => void;
};

export const BalloonContent: React.FC<BalloonContentProps> = ({
  data,
  onClose,
}) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded && (
        <div className={css.entityCard}>
          <div className={css.description}>
            <p>{data.description}</p>
            <p className={css.balloonText}>{data.description_text}</p>
            <button className={css.closeBtn} onClick={onClose}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
};
