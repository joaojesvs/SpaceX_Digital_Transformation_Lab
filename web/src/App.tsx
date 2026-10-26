import { Chat } from "./modules/assistant/Chat";
import { Widget } from "./modules/assistant/Widget";
import { isWidgetSurface } from "./platform/desktop";
import { SessionProvider, useSession } from "./platform/session";
import { Shell } from "./shell/Shell";

function Surface() {
  const { desktop } = useSession();
  if (isWidgetSurface()) return <Widget />;
  return (
    <>
      <Shell />
      <Chat />
      {desktop ? null : (
        <div className="widget-fallback">
          <Widget />
        </div>
      )}
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
