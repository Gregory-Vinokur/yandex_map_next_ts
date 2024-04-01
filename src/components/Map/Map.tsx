import React, { useCallback, useState, useRef } from "react";
import {
  YMaps,
  Map as YMap,
  Placemark,
  ZoomControl,
  Clusterer,
} from "@pbe/react-yandex-maps";
import { YMapsApi } from "@pbe/react-yandex-maps/typings/util/typing";
import { BalloonContent } from "../BalloonContent/BalloonContent";
import data from '../../data/data.json';
import css from "./Map.module.scss";
import { PlacemarkLayout } from "../PlacemarkLayout/PlacemarkLayout";
import { getCustomLayout } from "@/utils/getCustomLayout/getCustomLayout";

export type YMapType = YMapsApi | null;

export const Map = React.memo(() => {
  const [ymap, setYmap] = useState<YMapType | null>(null);
  const placemarkRefs = useRef<{ [key: number]: ymaps.Map | undefined }>({});

  const handleCloseBalloon = useCallback((id: number) => {
    placemarkRefs.current[id]?.balloon.close();
  }, []);

  const handleOpenBalloon = useCallback((id: number) => {
    placemarkRefs.current[id]?.balloon.open();
  }, []);

  return (
    <section className={css.sectionContainer}>
      <YMaps
        query={{
          apikey: process.env.NEXT_PUBLIC_API_YANDEX_KEY,
          lang: "ru_RU",
        }}
      >
        <YMap
          defaultState={{
            center: [55.75, 37.57],
            zoom: 4,
          }}
          className={css.map}
          onLoad={(ymap: React.SetStateAction<YMapType>) => setYmap(ymap)}
          modules={[
            "geoObject.addon.balloon",
            "geoObject.addon.hint",
            "templateLayoutFactory",
          ]}
          options={{ suppressMapOpenBlock: true }}
        >
          <ZoomControl />
          <Clusterer
            options={{
              preset: "islands#circleIcon",
              clusterIconColor: "#1D484E",
              groupByCoordinates: false,
              clusterDisableClickZoom: true,
              clusterHideIconOnBalloonOpen: false,
              geoObjectHideIconOnBalloonOpen: false,
            }}
          >
            {data.map((item) => (
              <Placemark
                key={item.id}
                instanceRef={(ref) => {
                  placemarkRefs.current[item.id] = ref;
                }}
                geometry={[
                  item.location.latitude,
                  item.location.longitude,
                ]}
                options={{
                  balloonCloseButton: false,
                  pane: "overlaps",
                  openBalloonOnClick: false,
                  iconLayout: getCustomLayout(
                    PlacemarkLayout,
                    "placemark",
                    {
                      data: item,
                      onClick: () => handleOpenBalloon(item.id),
                    },
                    ymap,
                    item.id,
                  ),
                  balloonContentLayout: getCustomLayout(
                    BalloonContent,
                    "balloon",
                    {
                      data: item,
                      onClose: () => handleCloseBalloon(item.id),
                    },
                    ymap,
                    item.id,
                    css.balloonContainer,
                  ),
                }}
              />
            ))}
          </Clusterer>
        </YMap>
      </YMaps>
    </section>
  );
});

Map.displayName = "MapSection";
