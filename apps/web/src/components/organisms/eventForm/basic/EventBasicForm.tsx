"use client";

import React from "react";
import { Section } from "@/components/molecules/section/Section";
import Button from "@/components/atoms/button/Button";
import { RadioButtons } from "@/components/molecules/radioButtons/RadioButtons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ControlledInput } from "@/components/atoms/input/ControlledInput";
import dayjs from "dayjs";
import { MapPicker } from "@/components/molecules/mapPicker/MapPicker";
import { EventResponse } from "shared/model/event/response/event.response";
import { myFetch } from "@/common/fetch";
import { CreateEventRequest } from "shared/model/event/request/createEvent.request";
import { notBlank, notBlankOrNull } from "shared/util";
import { UpdateEventRequest } from "shared/model/event/request/updateEvent.request";
import { Validations } from "@/common/validations";
import { ControlledMarkdownInput } from "@/components/atoms/markdownInput/ControlledMarkdownInput";
import { TagPicker } from "@/components/molecules/tagPicker/TagPicker";
import toast from "react-hot-toast";

const locationOptions = [
  { id: "location", name: "Na miejscu" },
  { id: "online", name: "On-line" },
];

type BasicForm = {
  title: string;
  subtitle?: string;
  description: string;
  from: string;
  to: string;
  location: "online" | "location";
  address?: {
    city: string;
    place: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  tags: string[];
};

const getDefaultValue = (event?: EventResponse): BasicForm => {
  return event
    ? {
        title: event.title,
        subtitle: event.subtitle,
        description: event.description,
        from: dayjs(event.from).format("YYYY-MM-DDTHH:mm"),
        to: dayjs(event.to).format("YYYY-MM-DDTHH:mm"),
        location: event.address ? "location" : "online",
        address: {
          city: event.address?.city,
          place: event.address?.place,
          coordinates: event.address?.coordinates ?? {
            latitude: 51.08549,
            longitude: 17.0104,
          },
        },
        tags: event.tags,
      }
    : {
        title: "",
        subtitle: "",
        description: "",
        from: dayjs().format("YYYY-MM-DDTHH:mm"),
        to: dayjs().add(1, "h").format("YYYY-MM-DDTHH:mm"),
        location: "location",
        address: {
          city: "",
          place: "",
          coordinates: {
            latitude: 51.08549,
            longitude: 17.0104,
          },
        },
        tags: [],
      };
};

const getCreateRequestData = (form: BasicForm): CreateEventRequest => {
  return {
    title: form.title,
    subtitle: notBlank(form.subtitle),
    description: form.description,
    from: form.from,
    to: form.to,
    address:
      form.location === "location" &&
      form.address &&
      form.address.city &&
      form.address.place
        ? {
            city: notBlank(form.address.city),
            place: notBlank(form.address.place),
            coordinates: {
              latitude: form.address.coordinates.latitude,
              longitude: form.address.coordinates.longitude,
            },
          }
        : null,
    tags: form.tags,
  };
};
const getUpdateRequestData = (form: BasicForm): UpdateEventRequest => {
  return {
    title: form.title,
    subtitle: notBlankOrNull(form.subtitle),
    description: form.description,
    from: form.from,
    to: form.to,
    address:
      form.location === "location" &&
      form.address &&
      form.address.city &&
      form.address.place
        ? {
            city: notBlankOrNull(form.address.city),
            place: notBlankOrNull(form.address.place),
            coordinates: {
              latitude: form.address.coordinates.latitude,
              longitude: form.address.coordinates.longitude,
            },
          }
        : null,
    tags: form.tags,
  };
};

const getRequest = async (
  data: BasicForm,
  event?: EventResponse
): Promise<EventResponse> => {
  if (event) {
    return myFetch(`/rest/v1/events/${event.id}`, {
      method: "PATCH",
      body: JSON.stringify(getUpdateRequestData(data)),
    }).then((res) => res.json());
  } else {
    return myFetch("/rest/v1/events", {
      method: "POST",
      body: JSON.stringify(getCreateRequestData(data)),
    }).then((res) => res.json());
  }
};

interface EventBasicFormProps {
  event?: EventResponse;
  onSubmitted?: (event: EventResponse) => void;
}

export const EventBasicForm: React.FC<EventBasicFormProps> = ({
  event,
  onSubmitted,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BasicForm>({
    defaultValues: getDefaultValue(event),
  });
  const watchOnline = watch(
    "location",
    event?.address !== null ? "location" : "online"
  );

  const onSubmit: SubmitHandler<BasicForm> = (data: BasicForm) => {
    toast.promise(
      getRequest(data, event).then((res: EventResponse) => {
        onSubmitted?.(res);
      }),
      {
        loading: "Zapisywanie...",
        success: <b>Wydarzenie zapisano pomyślnie!</b>,
        error: <b>Wystąpił błąd</b>,
      }
    );
  };

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <Section title={"Co i Kiedy?"}>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <ControlledInput
            name={"from"}
            label={"Rozpoczęcie"}
            control={control}
            type={"datetime-local"}
            rules={{ required: Validations.required }}
          />
          <ControlledInput
            name={"to"}
            label={"Zakończenie"}
            control={control}
            type={"datetime-local"}
            rules={{ required: Validations.required }}
          />
        </div>

        <ControlledInput
          name={"title"}
          label={"Tytuł"}
          required
          control={control}
          rules={{
            required: Validations.required,
            minLength: Validations.minLength(5),
            maxLength: Validations.maxLength(100),
          }}
        />
        <ControlledInput
          name={"subtitle"}
          label={"Podtytuł"}
          control={control}
          rules={{
            minLength: Validations.minLength(5),
            maxLength: Validations.maxLength(100),
          }}
        />

        <ControlledMarkdownInput
          name={"description"}
          label={"Opis"}
          required
          height={200}
          textareaProps={{ maxLength: 10000 }}
          control={control}
          rules={{
            required: Validations.required,
            minLength: Validations.minLength(10),
          }}
        />
      </Section>

      <Section title={"Gdzie?"} contentStyle={{ gap: 8 }}>
        <Controller
          name={"location"}
          control={control}
          render={({ field }) => (
            <RadioButtons
              values={locationOptions}
              selectedValueIndex={locationOptions.findIndex(
                (value) => value.id === field.value
              )}
              onChange={(item) => field.onChange(item.id)}
            />
          )}
        />

        {watchOnline === "location" && (
          <>
            <Controller
              render={({ field, fieldState, formState }) => (
                <MapPicker
                  onChange={(value) => {
                    field.onChange({
                      latitude: value.lat,
                      longitude: value.lng,
                    });
                  }}
                  value={{
                    lat: field.value?.latitude,
                    lng: field.value?.longitude,
                  }}
                />
              )}
              name={"address.coordinates"}
              control={control}
            />

            <div style={{ display: "flex", gap: 12, flexDirection: "row" }}>
              <ControlledInput
                name={"address.city"}
                label={"Miasto"}
                control={control}
                rules={{
                  required: Validations.required,
                  minLength: Validations.minLength(3),
                  maxLength: Validations.maxLength(50),
                }}
              />
              <ControlledInput
                name={"address.place"}
                label={"Adres"}
                control={control}
                style={{ flex: 1 }}
                rules={{
                  required: Validations.required,
                  minLength: Validations.minLength(3),
                  maxLength: Validations.maxLength(100),
                }}
              />
            </div>
          </>
        )}
      </Section>

      <Section title={"Tagi"}>
        <Controller
          name={"tags"}
          control={control}
          render={({ field }) => (
            <TagPicker
              value={field.value}
              setValue={(tags) => field.onChange(tags)}
            />
          )}
        />
      </Section>

      <Button
        primary
        style={{ alignSelf: "flex-end" }}
        onClick={handleSubmit(onSubmit)}
      >
        Zapisz
      </Button>
    </form>
  );
};
