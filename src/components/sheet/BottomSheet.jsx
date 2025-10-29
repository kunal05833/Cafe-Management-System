import React from "react";
import { Drawer } from "vaul";

const BottomSheet = ({ open, onOpenChange, title, children, footer }) => {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-background border-t shadow-2xl">
          <div className="mx-auto w-full max-w-md p-4">
            <div className="h-1.5 w-12 rounded-full bg-muted mx-auto mb-3" />
            {title && <h3 className="text-center font-semibold mb-3">{title}</h3>}
            <div className="pb-3">{children}</div>
            {footer && <div className="pt-2">{footer}</div>}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
export default BottomSheet;