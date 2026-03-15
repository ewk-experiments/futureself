import ConversationChat from "./ConversationClient";

export function generateStaticParams() {
  // Include some placeholder IDs for static generation
  // Dynamic conversations will work via client-side routing
  return [{ id: "placeholder" }];
}

export default function Page() {
  return <ConversationChat />;
}
