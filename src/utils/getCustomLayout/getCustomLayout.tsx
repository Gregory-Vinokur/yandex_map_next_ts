import { FC } from "react";
import { hydrateRoot } from "react-dom/client";
import ReactDOMServer from "react-dom/server";
import { YMapType } from "@/components/Map/Map";
import { PlacemarkLayoutProps } from "@/components/PlacemarkLayout/PlacemarkLayout";
import { BalloonContentProps } from "@/components/BalloonContent/BalloonContent";

type ComponentProps = PlacemarkLayoutProps | BalloonContentProps;

type LayoutName = "placemark" | "balloon";

export const getCustomLayout = <P extends ComponentProps>(
  Component: FC<P>,
  layoutName: LayoutName,
  props: P,
  ymap: YMapType | null,
  id?: number,
  className?: string,
):
  | ymaps.IClassConstructor<
      ymaps.layout.templateBased.Base & { build(this: ymaps.ILayout): void }
    >
  | undefined => {
  if (ymap) {
    const html = ReactDOMServer.renderToString(<Component {...props} />);
    const Layout = ymap.templateLayoutFactory.createClass(
      `<div class=${className} id="${layoutName}-${id}">${html}</div>`,
      {
        build(this: ymaps.ILayout) {
          const constructor = this.constructor as unknown as {
            superclass: ymaps.layout.templateBased.Base;
          };
          constructor.superclass.build.call(this);
          hydrateRoot(
            document.getElementById(`${layoutName}-${id}`)!,
            <Component {...props} />,
          );
        },
      },
    );
    return Layout;
  }
};
