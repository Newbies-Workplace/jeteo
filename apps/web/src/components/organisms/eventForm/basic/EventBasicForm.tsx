"use client";

import React, { useEffect } from "react";
import { Section } from "@/components/molecules/section/Section";
import Button from "@/components/atoms/button/Button";
import { RadioButtons } from "@/components/molecules/radioButtons/RadioButtons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ControlledInput } from "@/components/atoms/input/ControlledInput";
import dayjs from "dayjs";
import { MapPicker } from "@/components/molecules/mapPicker/MapPicker";
import { EventResponse } from "shared/model/event/response/event.response";
import { notBlank } from "shared/util";
import { ControlledMarkdownInput } from "@/components/atoms/markdownInput/ControlledMarkdownInput";
import { TagPicker } from "@/components/molecules/tagPicker/TagPicker";
import toast from "react-hot-toast";
import {
  createEvent,
  EventCreateSchema,
  EventUpdateSchema,
  updateEvent,
} from "@/lib/actions/events";
import { convertIntoFormData } from "@/lib/data/converters";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventCreateSchema } from "@/lib/data/schemas";

const locationOptions = [
  { id: "location", name: "Na miejscu" },
  { id: "online", name: "On-line" },
];

const getDefaultValue = (event?: EventResponse): EventCreateSchema => {
  // @ts-ignore
  return event
    ? {
        title: event.title,
        subtitle: event.subtitle,
        description: event.description,
        from: dayjs(event.from).format("YYYY-MM-DDTHH:mm"),
        to: dayjs(event.to).format("YYYY-MM-DDTHH:mm"),
        location: event.address ? "location" : "online",
        address: event.address
          ? {
              city: event.address.city,
              place: event.address.place,
              coordinates: event.address.coordinates,
            }
          : null,
        tags: event.tags,
      }
    : {
        title: "",
        subtitle: "",
        description: "",
        location: "online",
        from: dayjs().format("YYYY-MM-DDTHH:mm"),
        to: dayjs().add(1, "h").format("YYYY-MM-DDTHH:mm"),
        address: null,
        tags: [],
      };
};

const getRequest = async (
  form: EventCreateSchema,
  event?: EventResponse,
  hasLocation?: boolean
): Promise<EventResponse> => {
  const convertedForm: EventCreateSchema | EventUpdateSchema = {
    title: form.title,
    subtitle: notBlank(form.subtitle),
    description: form.description,
    from: form.from,
    to: form.to,
    location: form.location,
    address:
      hasLocation && form.address && form.address.city && form.address.place
        ? {
            city: notBlank(form.address.city)!,
            place: notBlank(form.address.place)!,
            coordinates: form.address.coordinates && {
              latitude: form.address.coordinates.latitude,
              longitude: form.address.coordinates.longitude,
            },
          }
        : null,
    tags: form.tags ?? [],
  };

  const formData = convertIntoFormData(convertedForm);

  if (event) {
    return await updateEvent(event.id, formData);
  } else {
    return await createEvent(formData);
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
    register,
    unregister,
    formState: { errors },
  } = useForm<EventCreateSchema>({
    defaultValues: getDefaultValue(event),
    resolver: zodResolver(eventCreateSchema),
  });
  const locationWatch = watch(
    "location",
    event?.address !== undefined ? "location" : "online"
  );

  useEffect(() => {
    if (locationWatch === "online") {
      unregister("address");
    } else {
      register("address");
    }
  }, [locationWatch]);

  const onSubmit: SubmitHandler<EventCreateSchema> = (
    data: EventCreateSchema
  ) => {
    toast.promise(
      getRequest(data, event, locationWatch === "location").then(
        (res: EventResponse) => {
          onSubmitted?.(res);
        }
      ),
      {
        loading: "Zapisywanie...",
        success: <b>Wydarzenie zapisano pomyślnie!</b>,
        error: <b>Wystąpił błąd</b>,
      }
    );
  };

  return (
    <form className={"flex flex-col"}>
      <Section title={"Co i Kiedy?"}>
        <div className={"flex flex-row gap-3 justify-around"}>
          <ControlledInput
            name={"from"}
            label={"Rozpoczęcie"}
            control={control}
            type={"datetime-local"}
          />
          <ControlledInput
            name={"to"}
            label={"Zakończenie"}
            control={control}
            type={"datetime-local"}
          />
          {JSON.stringify(errors)}
        </div>

        <ControlledInput
          name={"title"}
          label={"Tytuł"}
          required
          control={control}
        />
        <ControlledInput
          name={"subtitle"}
          label={"Podtytuł"}
          control={control}
        />

        <ControlledMarkdownInput
          name={"description"}
          label={"Opis"}
          required
          height={200}
          textareaProps={{ maxLength: 10000 }}
          control={control}
        />
      </Section>

      <Section title={"Gdzie?"} contentStyle={"gap-2"}>
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

        {locationWatch === "location" && (
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
                  value={
                    field?.value
                      ? {
                          lat: field.value.latitude,
                          lng: field.value.longitude,
                        }
                      : undefined
                  }
                />
              )}
              name={"address.coordinates"}
              control={control}
            />

            <div className={"flex gap-3 flex-row"}>
              <ControlledInput
                name={"address.city"}
                label={"Miasto"}
                control={control}
              />
              <ControlledInput
                name={"address.place"}
                label={"Adres"}
                control={control}
                className={"flex-1"}
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

      <Button primary className={"self-end"} onClick={handleSubmit(onSubmit)}>
        Zapisz
      </Button>
    </form>
  );
};
