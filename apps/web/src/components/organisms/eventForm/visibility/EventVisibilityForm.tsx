"use client";

import React, { useMemo } from "react";
import { Section } from "@/components/molecules/section/Section";
import {
  RadioButtons,
  RadioItem,
} from "@/components/molecules/radioButtons/RadioButtons";
import Button from "@/components/atoms/button/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { EventResponse } from "shared/model/event/response/event.response";
import { myFetch } from "@/common/fetch";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/Auth.hook";
import { Text } from "@/components/atoms/text/Text";
import toast from "react-hot-toast";

type VisibilityForm = {
  visibility: "PRIVATE" | "HIDDEN" | "PUBLIC";
};

interface EventVisibilityFormProps {
  event: EventResponse;
  onSubmitted?: (event: EventResponse) => void;
}

export const EventVisibilityForm: React.FC<EventVisibilityFormProps> = ({
  event,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VisibilityForm>({
    defaultValues: {
      visibility: event.visibility,
    },
  });

  const visibilities: RadioItem[] = useMemo(
    () => [
      {
        id: "PRIVATE",
        name: "Prywatna",
        description: "Widoczna tylko dla Ciebie i prelegentów",
      },
      {
        id: "HIDDEN",
        name: "Niepubliczna",
        description: "Widoczna tylko dla osób posiadających link wydarzenia",
      },
      {
        id: "PUBLIC",
        name: "Publiczna",
        description: "Widoczna dla każdego",
        disabled: user?._permissions.isAuthorized === false,
      },
    ],
    [user]
  );

  const onSubmit: SubmitHandler<VisibilityForm> = (data: VisibilityForm) => {
    toast.promise(
      myFetch(`/rest/v1/events/${event.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => {
          router.refresh();
        }),
      {
        loading: "Zapisywanie...",
        success: <b>Wydarzenie zapisano pomyślnie!</b>,
        error: <b>Wystąpił błąd spróbuj ponownie</b>,
      }
    );
  };

  if (!user) {
    return null;
  }

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <Section title={"Widoczność"}>
        <Controller
          name={"visibility"}
          control={control}
          render={({ field }) => (
            <RadioButtons
              values={visibilities}
              selectedValueIndex={visibilities.findIndex(
                (value) => value.id === field.value
              )}
              onChange={(item) => field.onChange(item.id)}
            />
          )}
        />
        {user._permissions.isAuthorized === false && (
          <Text variant={"bodyS"}>
            Publiczne prelekcje dostępne są tylko dla zautoryzowanych
            użytkowników, aby uzyskać autoryzację skontaktuj się z nami{" "}
            <a href={"mailto:newbies@rst.com.pl"}>tutaj</a>
          </Text>
        )}
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
