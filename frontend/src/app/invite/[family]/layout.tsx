export function generateStaticParams() {
  return [{ family: "Family" }];
}

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
