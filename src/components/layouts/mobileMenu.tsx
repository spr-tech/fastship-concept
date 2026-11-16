"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/ui/button/button";
import { ArrowRightIcon, CloseIcon, MenuIcon } from "@/components/ui/icons/icons";
import type { Navigation } from "@/models/navigation";
import { cn } from "@/utilities/helpers/cn";

type MobileMenuProps = {
  navigation: Navigation;
  activeHref?: string;
  className?: string;
};

// Must match --breakpoint-nav in globals.css: past this width the desktop nav takes over.
const DESKTOP_QUERY = "(min-width: 70rem)";

function setPageScrollLocked(isLocked: boolean) {
  const value = isLocked ? "hidden" : "";
  document.documentElement.style.overflow = value;
  document.body.style.overflow = value;
}

export default function MobileMenu({ navigation, activeHref, className }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const menuId = useId();

  const closeMenu = useCallback((shouldRestoreFocus: boolean) => {
    setIsOpen(false);
    if (shouldRestoreFocus) toggleRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    setPageScrollLocked(true);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
    };
    // If the window grows past the breakpoint the menu disappears, so don't leave the page locked behind it.
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const handleBreakpoint = () => {
      if (desktop.matches) closeMenu(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleBreakpoint);

    return () => {
      setPageScrollLocked(false);
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleBreakpoint);
    };
  }, [isOpen, closeMenu]);

  // Keeps Tab inside the button and the open panel, since the page behind is blurred out.
  const handleTabKey = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!isOpen || event.key !== "Tab") return;
    const focusable = [toggleRef.current, ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a") ?? [])].filter(
      (element): element is HTMLElement => element !== null,
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  // Unlock before the browser follows the link, so it can scroll to the section.
  // Focus is left to the browser, which moves it to the section the link points at.
  const handleLinkClick = () => {
    setPageScrollLocked(false);
    closeMenu(false);
  };

  return (
    <div className={cn("flex", className)} onKeyDown={handleTabKey}>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        aria-label={isOpen ? navigation.closeMenuLabel : navigation.openMenuLabel}
        onClick={() => (isOpen ? closeMenu(true) : setIsOpen(true))}
        className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-ink text-text-on-dark"
      >
        {isOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
      </button>

      {isOpen &&
        // In a portal on <body>: the glass bar's backdrop-filter would otherwise trap this
        // fixed layer inside the bar instead of covering the page.
        createPortal(
          <div
            aria-hidden="true"
            onClick={() => closeMenu(true)}
            className="fixed inset-0 z-20 animate-fade-in bg-ink/38 backdrop-blur-sm"
          />,
          document.body,
        )}

      {isOpen && (
        <nav
          id={menuId}
          ref={panelRef}
          aria-label={navigation.label}
          className="absolute inset-x-0 top-[calc(100%+8px)] z-20 flex animate-fade-up flex-col gap-0.5 rounded-3xl bg-ink p-2.5 text-text-on-dark shadow-menu [animation-duration:250ms]"
        >
          {navigation.links.map((link) => {
            const isActive = link.href === activeHref;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={handleLinkClick}
                className={cn(
                  "flex min-h-12 items-center rounded-xl px-3 text-[17px] font-semibold",
                  isActive ? "bg-ink-line text-accent-on-dark" : "hover:bg-ink-raised",
                )}
              >
                {link.label}
              </a>
            );
          })}

          <div className="mt-2 flex gap-2 border-t border-ink-line pt-2.5">
            <Button
              text={navigation.logIn.label}
              href={navigation.logIn.href}
              variant="outlineOnDark"
              size="md"
              className="flex-1"
            />
            <Button
              text={navigation.signUp.label}
              href={navigation.signUp.href}
              variant="accent"
              size="md"
              endIcon={<ArrowRightIcon size={16} />}
              className="flex-1 gap-2"
            />
          </div>
        </nav>
      )}
    </div>
  );
}
