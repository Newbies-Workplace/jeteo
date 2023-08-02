import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader";
import { StepNavigation } from "@/components/molecules/stepNavigation/StepNavigation";
import styles from "./layout.module.scss";
import React from "react";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <div className={styles.page}>
      <StudioHeader title={"Edycja wydarzenia"} />
      <StepNavigation
        links={[
          {
            name: "Podstawowe informacje",
            href: `/studio/events/edit/${params.slug}/basic`,
          },
          { name: "Wygląd", href: `/studio/events/edit/${params.slug}/theme` },
          {
            name: "Prelekcje",
            href: `/studio/events/edit/${params.slug}/lectures`,
          },
          {
            name: "Widoczność",
            href: `/studio/events/edit/${params.slug}/visibility`,
          },
        ]}
      />

      <div className={styles.content}>{children}</div>
    </div>
  );
}
