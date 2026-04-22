import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("sweetly-cookies-accepted")) setShow(true);
  }, []);

  if (!show) return null;

  const accept = () => {
    localStorage.setItem("sweetly-cookies-accepted", "1");
    setShow(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:max-w-sm z-40 bg-cocoa text-cream rounded-2xl p-4 shadow-2xl animate-pop-in">
      <div className="flex gap-3 items-start">
        <Cookie className="h-5 w-5 text-mustard flex-shrink-0 mt-0.5" />
        <div className="text-xs flex-1">
          <p>We use cookies to make your shopping sweeter. By browsing, you accept our cookie policy.</p>
          <div className="flex gap-2 mt-3">
            <Button onClick={accept} size="sm" className="rounded-full bg-mustard text-cocoa hover:bg-mustard/80">
              Accept all
            </Button>
            <Button
              onClick={accept}
              size="sm"
              variant="ghost"
              className="rounded-full text-cream hover:bg-cream/10"
            >
              Manage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
