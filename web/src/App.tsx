import { Chat } from "./modules/assistant/Chat";
import { Widget } from "./modules/assistant/Widget";
import { isWidgetSurface } from "./platform/desktop";
import { SessionProvider } from "./platform/session";
import { Shell } from "./shell/Shell";

function Surface() {
  if (isWidgetSurface()) return <Widget />;
  return (
    <>
      <Shell />
      <Chat />
    </>
  );
}

export function App() {
  return (
    <SessionProvider>
      <Surface />
    </SessionProvider>
  );
}
