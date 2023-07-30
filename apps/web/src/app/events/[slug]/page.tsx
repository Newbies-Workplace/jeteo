import { Text } from "@/components/text/Text";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <Text variant={"headL"}>Event {params.slug}</Text>
    </>
  );
}
