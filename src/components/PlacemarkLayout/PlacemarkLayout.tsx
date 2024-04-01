import { useEffect, useState } from "react";
import css from "./PlacemarkLayout.module.scss";
import { DataType } from "@/types/types";

export type PlacemarkLayoutProps = {
  data: Pick<DataType, "hint">;
  onClick?: () => void;
};

export const PlacemarkLayout: React.FC<PlacemarkLayoutProps> = ({
  data,
  onClick,
}) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <>
      {domLoaded && (
        <div className={css.placemark}>
          <button className={css.label} onClick={onClick}>
            {data.hint}
          </button>
          <div className={css.circle}></div>
        </div>
      )}
    </>
  );
};
