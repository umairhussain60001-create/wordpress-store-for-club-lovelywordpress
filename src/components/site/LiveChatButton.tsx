import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function LiveChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-40 w-[300px] bg-cream rounded-2xl border-2 border-cocoa/10 shadow-2xl overflow-hidden animate-pop-in">
          <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
            <div>
              <p className="font-display text-lg">Hey sweet thing! 👋</p>
              <p className="text-xs opacity-90">We usually reply in a few minutes</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4 text-sm">
            <p className="text-muted-foreground">
              Need help with an order, ingredients, or wholesale? Drop us a line and our candy crew will get back to you.
            </p>
            <a
              href="mailto:hello@sweetly.co"
              className="block mt-3 text-center bg-mustard text-cocoa font-bold py-2 rounded-full"
            >
              Email us
            </a>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-40 h-14 w-14 rounded-full candy-gradient text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Live chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}
