import React from "react";
import styles from "./page.module.scss";
import { Section } from "@/components/molecules/section/Section";
import { FileItem } from "@/components/molecules/fileItem/FileItem";
import { FileUpload } from "@/components/molecules/fileUpload/FileUpload";
import { Input } from "@/components/atoms/input/Input";
import TextArea from "@/components/organisms/rateLecture/textArea/TextArea";

export default function Page() {
  return (
    <div className={styles.container}>
      <Section title="Zdjęcie profilowe">
        <FileItem url="" />
        {/* <FileUpload onChange={} /> */}
      </Section>
      <Section title="Dane podstawowe">
        {/* <Input value="Poczta" setValue={} /> */}
        {/* <Input value="Poczta" setValue={} /> */}
        <TextArea setText={""} text="Wpisz co chcesz" title="Opis profilu" />
      </Section>
      <Section title="Dane kontaktowe (widoczne publicznie)">
        {/* <Input value="Poczta" setValue={} /> */}
        {/* <Input value="Poczta" setValue={} /> */}
        {/* <Input value="Poczta" setValue={} /> */}
        {/* <Input value="Poczta" setValue={} /> */}
      </Section>
    </div>
  );
}
