import { Text } from "@/components/atoms/text/Text";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <Text variant={'headL'}>Event {params.slug}</Text>
    </>
  );
}
